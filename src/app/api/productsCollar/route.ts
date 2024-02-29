import {
  convertXMLtoJSON,
  errorResponse,
  getAllExistingProducts,
  isValidApiKey,
  successResponse,
  unauthorizedResponse,
} from "@/libs/utils";
import { NextRequest } from "next/server";
import { prisma } from "../auth/[...nextauth]/auth";
import { COLLAR_API_URL, CRON_SECRET } from "@/config/api";

/*
  This function handles the process of fetching and parsing data from Collar's API.
  It is responsible for creating new products while bypassing existing ones based on the 'barcode' field.
  The 'barcode' field serves as a unique identifier to avoid creating duplicate products in the system.
*/

// Handles GET requests to fetch and parse data from Collar's API
export async function GET(req: NextRequest) {
  try {
    // Get the bearer token from the header
    const authToken = (req.headers.get("authorization") || "")
      .split("Bearer ")
      .at(1);

    // If not found OR the bearer token does NOT equal the CRON_SECRET
    if (!authToken || authToken != CRON_SECRET) {
      return unauthorizedResponse();
    }

    // Fetch data from Collar's API
    const collarData = await fetchCollarData();

    // Retrieve existing products from the database
    const existingProducts = await getAllExistingProducts();

    // Process data and create products
    const result = await processCollarData(collarData, existingProducts);

    return successResponse(result);
  } catch (err: any) {
    console.error(err);
    return errorResponse(err.message || "Internal Server Error");
  }
}

// Function to find existing product
function findExistingProduct(existingProducts: any[], collarProduct: any) {
  return existingProducts.find(
    (product) =>
      product.barcode === collarProduct.ean13._text ||
      product.artycul === collarProduct.vendorCode._text,
  );
}

// Function to fetch data from Collar's API
async function fetchCollarData() {
  const res = await fetch(COLLAR_API_URL);
  if (!res.ok) {
    throw new Error("Incorrect resource");
  }
  return convertXMLtoJSON(res, "collar");
}

// Function to get product image

// Function to get product images
function getProductImages(collarProduct: any) {
  const images = Array.isArray(collarProduct.picture)
    ? collarProduct.picture.map((img: any) => img._text)
    : [collarProduct.picture._text];
  return images;
}

// Function to get product info
function getProductInfo(collarProduct: any) {
  return collarProduct.param.map((info: any) => ({
    "g:attribute_name": { _text: info._attributes.name },
    "g:attribute_value": { _text: info._cdata },
  }));
}

// Function to process collar data and create products
async function processCollarData(collarData: any, existingProducts: any[]) {
  const promises = collarData.map(async (collarProduct: any) => {
    try {
      const existingProduct = findExistingProduct(
        existingProducts,
        collarProduct,
      );
      if (existingProduct) {
        return "update product"; // Product already exists, skip creation
      }
      return createProduct(collarProduct);
    } catch (error) {
      console.error(error);
      return 0;
    }
  });
  return await Promise.all(promises);
}

// Function to create product
async function createProduct(collarProduct: any) {
  if (
    !collarProduct.name ||
    !collarProduct.price ||
    !collarProduct.description ||
    !collarProduct.vendorCode ||
    !collarProduct.ean13 ||
    !collarProduct.categoryId ||
    !collarProduct.quantityInStock ||
    !Array.isArray(collarProduct.param)
  ) {
    return "Some fields are missing";
  }

  return prisma.product.create({
    data: {
      title: collarProduct.name._cdata.replaceAll("&quot;", "'"),
      price: parseInt(collarProduct.price._text.split(".")[0]) || 0,
      description: collarProduct.description._cdata,
      artycul: collarProduct.vendorCode._text,
      barcode: collarProduct.ean13._text,
      categoryId: collarProduct.categoryId._text,
      quantity:
        parseInt(collarProduct.quantityInStock._text.split(".")[0]) || 1,
      img: getProductImages(collarProduct)[0],
      images: getProductImages(collarProduct),
      info: getProductInfo(collarProduct),
      keywords: "",
      availability: "in stock",
      discount: 0,
      unique_id_1c: "miss",
      unique_id: "miss",
    },
  });
}
