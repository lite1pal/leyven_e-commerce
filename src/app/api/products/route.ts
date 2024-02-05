import { prisma } from "@/app/api/auth/[...nextauth]/auth";
import { categories } from "@/data/categories";
import { convertXMLtoJSON, getArrayValueByKey } from "@/libs/utils";
import { NextRequest, NextResponse } from "next/server";
import { logger } from "../../../../logger";

export async function GET(req: NextRequest, { params }: any) {
  logger.info(`GET /api/products ${req}`);
  try {
    // creates an object URL to obtain search params
    const url = new URL(req.url);

    // grabs each search param from search params object
    const category = url.searchParams.get("category");
    const subCategory = url.searchParams.get("subCategory");

    const search = url.searchParams.get("search");
    const getAll = url.searchParams.get("getAll");
    const isDashboard = url.searchParams.get("dashboard");

    let filters: any = url.searchParams.get("filters") as string;
    filters = filters?.includes(";") ? filters?.split(";") : [filters];

    let page = 1;
    let sorting = "";
    let instock = "";
    let country = "";
    let brand = "";
    let price_from = 0;
    let price_to = 0;

    if (filters[0]) {
      page = parseInt(getArrayValueByKey(filters, "page")) || 1;
      sorting = getArrayValueByKey(filters, "sort");
      instock = getArrayValueByKey(filters, "instock");
      country = getArrayValueByKey(filters, "country");
      brand = getArrayValueByKey(filters, "brand");
      price_from = parseInt(getArrayValueByKey(filters, "price_from"));
      price_to = parseInt(getArrayValueByKey(filters, "price_to"));
    }

    // defines a products variable
    let products: any = [];

    if (getAll) {
      let where: any = {};
      if (!isDashboard) {
        where = { img: { not: "miss" } };
      }
      products = await prisma.product.findMany({
        orderBy: { updatedAt: "desc" },
        where,
      });

      return new NextResponse(JSON.stringify(products), {
        status: 200,
      });
    }

    // returns a filtering options object for prisma query based on search params
    const filteringObject: any = (category: string | null) => {
      let orderBy: any = { updatedAt: "desc" };
      let where: any = { img: { not: "miss" } };
      let skip = page ? (page - 1) * 24 : 0;
      let take = 24;

      // sorting
      if (sorting === "price_desc") {
        orderBy = { price: "desc" };
      } else if (sorting === "price_asc") {
        orderBy = { price: "asc" };
      }

      // FILTERS
      // instock filter
      if (instock === "Так") {
        where.availability = "in stock";
      } else if (instock === "Ні") {
        where.availability = "out of stock";
      }

      // country filter
      if (country && country !== "Всі") {
        where.country = country;
      }

      // brand filter
      if (brand && brand !== "Всі") {
        where.brand = brand;
      }

      // price filter
      if (price_from && price_to) {
        where.AND = [
          { price: { gt: price_from } },
          { price: { lt: price_to } },
        ];
      }

      if (search) {
        where.title = { contains: search, mode: "insensitive" };
        return {
          where,
          skip,
          take,
        };
      }

      // if search params don't contain category then return products of all categories
      if (!category) {
        return {
          where,
          orderBy,
          skip,
          take,
        };
      }

      if (subCategory) {
        where.breadcrumbs = {
          contains: categories[category].subCategories[subCategory].name,
          mode: "insensitive",
        };

        return {
          where,
          orderBy,
          skip,
          take,
        };
      }

      where.breadcrumbs = {
        contains: categories[category].name,
        mode: "insensitive",
      };

      return {
        where,
        orderBy,
        skip,
        take,
      };
    };

    if (!category) {
      products = await prisma.product.findMany(filteringObject());
    } else {
      products = await prisma.product.findMany(filteringObject(category));
    }

    return new NextResponse(JSON.stringify(products), {
      status: 200,
    });
  } catch (err) {
    return new NextResponse(JSON.stringify(err), {
      status: 500,
    });
  }
}

// syncs with prom.ua website's database
export async function POST(req: NextRequest) {
  try {
    const res = await fetch(
      "https://leyven.prom.ua/google_merchant_center.xml?hash_tag=7cc3f8ae16866ff2c378c11cbcaa52ca&product_ids=&label_ids=&export_lang=uk&group_ids=",
    );

    if (!res.ok) {
      return new NextResponse(JSON.stringify({ message: "Невірний ресурс" }), {
        status: 200,
      });
    }

    const badFormatData = await convertXMLtoJSON(res);

    if (badFormatData.length === 0) {
      return new NextResponse(
        JSON.stringify({ message: "Імпорт наразі неможливий" }),
        {
          status: 200,
        },
      );
    }

    const existingProducts = await prisma.product.findMany();

    const promises = badFormatData.map(async (badProduct: any) => {
      try {
        const existingProduct = existingProducts.find(
          (product) => product.unique_id === badProduct["g:id"]._text,
        );

        const productPrice = parseInt(
          badProduct["g:price"]._text.split(" ")[0],
        );

        if (existingProduct) {
          return prisma.product.update({
            where: { id: existingProduct.id },
            data: {
              title: badProduct["g:title"]._text,
              img: badProduct["g:image_link"]._text,
              price: productPrice,
              availability: badProduct["g:availability"]._text,
              description: badProduct["g:description"]._text,
              breadcrumbs: badProduct["g:product_type"]._text,
            },
          });
        }

        return;

        const getProductCountry = () => {
          if (Array.isArray(badProduct["g:product_detail"])) {
            return badProduct["g:product_detail"][0]["g:attribute_name"]
              ._text === "Країна виробник"
              ? badProduct["g:product_detail"][0]["g:attribute_value"]._text
              : "Немає";
          }
          if (
            badProduct["g:product_detail"]["g:attribute_name"]._text ===
            "Країна виробник"
          ) {
            return badProduct["g:product_detail"]["g:attribute_value"]._text;
          }

          return "Немає";
        };

        // return prisma.product.create({
        //   data: {
        //     title: badProduct["g:title"]._text,
        //     unique_id: badProduct["g:id"]._text,
        //     img: badProduct["g:image_link"]._text,
        //     price: productPrice,
        //     availability: badProduct["g:availability"]._text,
        //     description: badProduct["g:description"]._text,
        //     breadcrumbs: badProduct["g:product_type"]._text,
        //     country: getProductCountry(),
        //     brand: badProduct["g:brand"]._text,
        //     rating: "4",
        //     info: Array.isArray(badProduct["g:product_detail"])
        //       ? badProduct["g:product_detail"]
        //       : [badProduct["g:product_detail"]],
        //   },
        // });
      } catch (err) {
        console.error(err, "ERROR");
      }
    });

    const result = await Promise.all(promises);

    return new NextResponse(JSON.stringify(result), {
      status: 200,
    });
  } catch (err) {
    // console.log(err);
    return new NextResponse(JSON.stringify(err), { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const res = await fetch(
      "https://leyven.prom.ua/google_merchant_center.xml?hash_tag=7cc3f8ae16866ff2c378c11cbcaa52ca&product_ids=&label_ids=&export_lang=uk&group_ids=",
    );

    const badFormatData = await convertXMLtoJSON(res);

    const promises = badFormatData.map(async (badProduct: any) => {
      try {
        const product = await prisma.product.findFirst({
          where: {
            unique_id: { equals: badProduct["g:id"]._text },
          },
        });

        if (!product || product.unique_id) {
          return;
        }

        return prisma.product.update({
          where: { id: product.id },
          data: { unique_id_1c: badProduct["g:id"]._text },
        });
      } catch (err) {
        console.error(err, "ERROR");
      }
    });

    const result = await Promise.all(promises);

    return new NextResponse(JSON.stringify(result), {
      status: 200,
    });
  } catch (err) {
    // console.log(err);
    return new NextResponse(JSON.stringify(err), { status: 500 });
  }
}
