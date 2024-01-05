import { prisma } from "@/app/api/auth/[...nextauth]/auth";
import { categories } from "@/data/categories";
import { convertXMLtoJSON } from "@/libs/utils";
import { NextRequest, NextResponse } from "next/server";

// type Category =
//   | "Ветеринарія"
//   | "товари для догляду за домашніми тваринами"
//   | "Товари для прогулянок і подорожей з тваринами"
//   | "Годування домашніх тварин і птахів";

export async function GET(req: NextRequest) {
  try {
    // creates an object URL to obtain search params
    const url = new URL(req.url);

    // grabs each search param from search params object
    const category = url.searchParams.get("category");
    const subCategory = url.searchParams.get("subCategory");
    const sorting = url.searchParams.get("sorting");
    const page = parseInt(url.searchParams.get("page") as string);
    const search = url.searchParams.get("search");
    const instock = url.searchParams.get("instock");
    const getAll = url.searchParams.get("getAll");

    // console.log("page\n\n\n\n", search);

    // defines a products variable
    let products: any = [];

    if (getAll) {
      products = await prisma.product.findMany();
      return new NextResponse(JSON.stringify(products), {
        status: 200,
      });
    }
    // returns a filtering options object for prisma query based on search params
    const filteringObject: any = (category: string | null) => {
      let orderBy = {};
      if (sorting === "price_desc") {
        orderBy = { price: "desc" };
      } else if (sorting === "price_asc") {
        orderBy = { price: "asc" };
      }

      if (instock === "так") {
        return {
          orderBy,
          where: { availability: "in stock" },
          skip: page ? (page - 1) * 24 : 0,
          take: 24,
        };
      } else if (instock === "ні") {
        return {
          orderBy,
          where: { availability: "out of stock" },
          skip: page ? (page - 1) * 24 : 0,
          take: 24,
        };
      }

      if (search) {
        return {
          orderBy,
          where: { title: { contains: search, mode: "insensitive" } },
          skip: page ? (page - 1) * 24 : 0,
          take: 24,
        };
      }

      // if search params don't contain category then return products of all categories
      if (!category) {
        return {
          orderBy,
          skip: page ? (page - 1) * 24 : 0,
          take: 24,
        };
      }

      // console.log(
      //   categories[category].name.toLowerCase(),
      //   "fasdfsEFAS\n\n\n\n\n",
      // );

      if (subCategory) {
        return {
          where: {
            breadcrumbs: {
              contains: categories[category].subCategories[subCategory].name,
              mode: "insensitive",
            },
          },
          orderBy,
          skip: page ? (page - 1) * 24 : 0,
          take: 24,
        };
      }

      return {
        where: {
          breadcrumbs: {
            contains: categories[category].name,
            mode: "insensitive",
          },
        },
        orderBy,
        skip: page ? (page - 1) * 24 : 0,
        take: 24,
      };
    };

    // determines of which category to return products
    // if (!category) {
    //   products = await prisma.product.findMany(filteringObject());
    // } else if (category === "veterynarny") {
    //   products = await prisma.product.findMany(filteringObject("Ветеринарія"));
    // } else if (category === "animalcare") {
    //   products = await prisma.product.findMany(
    //     filteringObject("товари для догляду за домашніми тваринами"),
    //   );
    // } else if (category === "outdoors") {
    //   products = await prisma.product.findMany(
    //     filteringObject("Товари для прогулянок і подорожей з тваринами"),
    //   );
    // } else if (category === "food") {
    //   products = await prisma.product.findMany(
    //     filteringObject("Годування домашніх тварин і птахів"),
    //   );
    // } else if (category === "comfort") {
    //   products = await prisma.product.findMany(
    //     filteringObject("Товари для комфорту домашніх тварин"),
    //   );
    // }
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

export async function POST(req: NextRequest) {
  try {
    const res = await fetch(
      "https://leyven.com.ua/google_merchant_center.xml?hash_tag=7cc3f8ae16866ff2c378c11cbcaa52ca&product_ids=&label_ids=&export_lang=uk&group_ids=",
    );

    const badFormatData = await convertXMLtoJSON(res);

    // badFormatData.forEach((badProduct: any) => {
    //   console.log("something", badProduct.slice(0, 20));
    // });

    // badFormatData.slice(0, 10).forEach(async (badProduct: any) => {
    //   const productPrice = parseInt(badProduct["g:price"]._text.split(" ")[0]);
    //   console.log(badProduct["g:product_detail"]);
    // });

    // return new NextResponse(JSON.stringify(badFormatData), {
    //   status: 200,
    // });

    // const goodFormatData = badFormatData.map((badProduct: any) => {
    //   const productPrice = parseInt(badProduct["g:price"]._text.split(" ")[0]);
    //   return {
    //     title: badProduct["g:title"]._text,
    //     img: badProduct["g:image_link"]._text,
    //     price: productPrice,
    //     availability: badProduct["g:availability"]._text,
    //     description: badProduct["g:description"]._text,
    //     breadcrumbs: badProduct["g:product_type"]._text,
    //     brand: badProduct["g:brand"]._text,
    //     rating: "4",
    //     info: badProduct["g:product_detail"],
    //   };
    // });

    // const result = await prisma.product.createMany({
    //   data: goodFormatData,
    // });

    const promises = badFormatData.forEach(async (badProduct: any) => {
      try {
        const productPrice = parseInt(
          badProduct["g:price"]._text.split(" ")[0],
        );
        await prisma.product.create({
          data: {
            title: badProduct["g:title"]._text,
            img: badProduct["g:image_link"]._text,
            price: productPrice,
            availability: badProduct["g:availability"]._text,
            description: badProduct["g:description"]._text,
            breadcrumbs: badProduct["g:product_type"]._text,
            brand: badProduct["g:brand"]._text,
            rating: "4",
            info: badProduct["g:product_detail"],
          },
        });
      } catch (err) {
        console.error(err, "ERROR");
      }
    });

    await Promise.all(promises);

    return new NextResponse(JSON.stringify(badFormatData), {
      status: 200,
    });
  } catch (err) {
    return new NextResponse(JSON.stringify(err), { status: 500 });
  }
}
