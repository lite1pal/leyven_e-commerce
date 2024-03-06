import { prisma } from "@/app/api/auth/[...nextauth]/auth";
import {
  convertXMLtoJSON,
  errorResponse,
  getAllExistingProducts,
  getArrayValueByKey,
  isValidApiKey,
  successResponse,
  unauthorizedResponse,
} from "@/libs/utils";
import { NextRequest, NextResponse } from "next/server";
import { PROM_UA_API_URL } from "@/config/api";
import { getDataPromXml } from "@/data-mappers";

/*
  This function returns a maximum of 24 products based on provided filters, categories, and subcategories.
  If the 'getAll=true' parameter is included in the request, it will return all products that have images.
  For products without images to be returned, the 'dashboard=true' parameter must also be included.
*/

// Handles GET requests to /api/products
export async function GET(req: NextRequest) {
  try {
    // Parse request parameters
    const { categoryId, search, getAll, dashboard, filters } =
      parseRequestParams(req);

    // Parse filters
    const { page, sorting, instock, country, brand, price_from, price_to } =
      parseFilters(filters);

    let products: any = [];

    // Get all products if 'getAll=true' param is provided
    if (getAll) {
      products = await getAllProducts(dashboard);
      return successResponse(products);
    }

    // Generate filtering options for Prisma query
    const filteringOptions = await generateFilteringOptions(
      categoryId,
      search,
      page,
      sorting,
      instock,
      country,
      brand,
      price_from,
      price_to,
    );

    // Fetch products based on filtering options
    products = await prisma.product.findMany(filteringOptions);

    return successResponse(products);
  } catch (err: any) {
    console.error(err);
    return errorResponse(err.message);
  }
}

/*
  Fetches and parses data from Prom's api.
  Syncs fetched data with MongoDB's data that have 'unique_id' value.
*/

export async function PUT(req: NextRequest) {
  try {
    if (!isValidApiKey(req)) {
      return unauthorizedResponse();
    }

    const promData = await fetchPromData();

    // if (badFormatData.length === 0) {
    //   return new NextResponse(
    //     JSON.stringify({ message: "Імпорт наразі неможливий" }),
    //     {
    //       status: 200,
    //     },
    //   );
    // }

    // Retrieve existing products from the database
    const existingProducts = await getAllExistingProducts();

    const promises = promData.map(async (promProduct: any) => {
      try {
        const existingProduct = existingProducts.find(
          (product) => product.unique_id === promProduct["g:id"]._text,
        );

        const productPrice = parseInt(
          promProduct["g:price"]._text.split(" ")[0],
        );

        if (existingProduct && !existingProduct.description) {
          return prisma.product.update({
            where: { id: existingProduct.id },
            data: {
              title: promProduct["g:title"]._text,
              img: promProduct["g:image_link"]._text,
              price: productPrice,
              availability: promProduct["g:availability"]._text,
              breadcrumbs: promProduct["g:product_type"]._text,
            },
          });
        }
        return 0;
      } catch (err) {
        console.error(err, "ERROR");
        return "error";
      }
    });

    const result = await Promise.all(promises);

    return successResponse(result);
  } catch (err: any) {
    console.error(err.message);
    return errorResponse(err.message);
  }
}

// Parse request params
function parseRequestParams(req: NextRequest) {
  const url = new URL(req.url);
  return {
    categoryId: url.searchParams.get("categoryId"),
    subCategory: url.searchParams.get("subCategory"),
    search: url.searchParams.get("search"),
    getAll: url.searchParams.get("getAll"),
    dashboard: url.searchParams.get("dashboard"),
    filters: url.searchParams.get("filters") as string,
  };
}

// Parse filters
function parseFilters(filters: string | null) {
  if (!filters) {
    return {
      page: 1,
      sorting: "",
      instock: "",
      country: "",
      brand: "",
      price_from: 0,
      price_to: 0,
    };
  }
  const filterArray = filters?.includes(";") ? filters?.split(";") : [filters];
  return {
    page: parseInt(getArrayValueByKey(filterArray, "page")) || 1,
    sorting: getArrayValueByKey(filterArray, "sort"),
    instock: getArrayValueByKey(filterArray, "instock"),
    country: getArrayValueByKey(filterArray, "country"),
    brand: getArrayValueByKey(filterArray, "brand"),
    price_from: parseInt(getArrayValueByKey(filterArray, "price_from")) || 0,
    price_to: parseInt(getArrayValueByKey(filterArray, "price_to")) || 0,
  };
}

// Get all products that don't have images
async function getAllProducts(dashboard: string | null) {
  const where = !dashboard ? { img: { not: "miss" } } : {};
  return await prisma.product.findMany({
    orderBy: { updatedAt: "desc" },
    where,
  });
}

// Generate filtering options for Prisma query
async function generateFilteringOptions(
  categoryId: string | null,
  search: string | null,
  page: number,
  sorting: string | null,
  instock: string | null,
  country: string | null,
  brand: string | null,
  price_from: number,
  price_to: number,
) {
  const arrayOfChildCategories = categoryId
    ? await getChildCategories(categoryId)
    : [];

  // Prisma filtering objects
  const where: any = { img: { not: "miss" } };
  let orderBy: any = { updatedAt: "desc" };
  let skip = page ? (page - 1) * 24 : 0;
  let take = 24;

  // Sorting
  if (sorting === "price_desc") {
    orderBy = { price: "desc" };
  } else if (sorting === "price_asc") {
    orderBy = { price: "asc" };
  }

  // Instock filter
  if (instock === "Так") {
    where.availability = "in stock";
  } else if (instock === "Ні") {
    where.availability = "out of stock";
  }

  // Country filter
  if (country && country !== "Всі") {
    where.country = country;
  }

  // Brand filter
  if (brand && brand !== "Всі") {
    where.brand = brand;
  }

  // Price filter
  if (price_from && price_to) {
    where.AND = [{ price: { gt: price_from } }, { price: { lt: price_to } }];
  }

  // Search filter
  if (search) {
    where.title = { contains: search, mode: "insensitive" };
  }

  // Category filter
  if (!categoryId) {
    return { where, orderBy, skip, take };
  }

  return {
    where: {
      OR: [
        { categoryId: { in: arrayOfChildCategories } },
        { categoryId: { equals: categoryId } },
      ],
    },
    orderBy,
    skip,
    take,
  };
}

// Get child categories of a parent category
async function getChildCategories(
  categoryId: string | null,
): Promise<string[]> {
  const arrayOfChildCategories: string[] = [];
  if (categoryId) {
    const childCategories = await prisma.category.findMany({
      where: { parentId: { equals: categoryId } },
    });

    if (childCategories.length > 0) {
      arrayOfChildCategories.push(
        ...childCategories.map((childCategory) => childCategory.categoryId),
      );
    }
  }
  return arrayOfChildCategories;
}

// Function to fetch data from Prom's API
export async function fetchPromData() {
  const res = await fetch(PROM_UA_API_URL);

  if (!res.ok) {
    throw new Error("Incorrect resource");
  }
  const dataJson = await convertXMLtoJSON(res);

  const formattedData = getDataPromXml(dataJson);

  return formattedData;
}

// Function to process prom data and create products
async function processPromData(promData: any, existingProducts: any[]) {
  const promises = promData.map(async (promProduct: any) => {
    try {
      const existingProduct = findExistingProduct(
        existingProducts,
        promProduct,
      );
      if (existingProduct) {
        return 0; // Product already exists, skip creation
      }
      // return createProduct(collarProduct);
    } catch (error) {
      console.error(error);
      return 0;
    }
  });
  return await Promise.all(promises);
}

// Function to find existing product
function findExistingProduct(existingProducts: any[], promProduct: any) {
  return existingProducts.find(
    (product) => product.unique_id === promProduct["g:id"]._text,
  );
}
