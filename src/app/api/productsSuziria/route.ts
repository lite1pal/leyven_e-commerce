import { SUZIRIA_API_URL } from "@/config/api";
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
import { type Product } from "@/types";

export async function GET(req: NextRequest) {
  try {
    // Return status code 401 if API KEY is not valid or missing
    if (!isValidApiKey(req)) {
      return unauthorizedResponse();
    }

    // Fetch products from Suziria API in XML format and convert to JSON
    const suziriaProducts = await fetchSuziriaData();

    // Get all products from Leyven's MongoDB
    const existingProducts = await getAllExistingProducts();

    const result = await processSuziriaProducts(
      suziriaProducts,
      existingProducts,
    );

    return successResponse(suziriaProducts.slice(0, 10));
  } catch (err: any) {
    console.error(err.message);
    return errorResponse(err.message);
  }
}

async function fetchSuziriaData() {
  const res = await fetch("https://c.suziria.ua/prom.xml");

  if (!res.ok) {
    throw new Error(
      "Error occured while fetching data in XML format from Suziria API",
    );
  }

  return convertXMLtoJSON(res, "suziria");
}

async function processSuziriaProducts(
  suziriaProducts: string[],
  existingProducts: any,
) {
  const promises = suziriaProducts.map((suziriaProduct) => {
    try {
    } catch (err: any) {
      return err.message;
    }
  });
}
