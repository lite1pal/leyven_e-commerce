import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../auth/[...nextauth]/auth";
import convert from "xml-js";
import {
  errorResponse,
  isValidApiKey,
  successResponse,
  unauthorizedResponse,
} from "@/libs/utils";

export const maxDuration = 50;

/*
  Parses uploaded XML file into JSON.
  Creates new products bypassing existing ones by 'unique_id_1c' field in order to avoid duplicates.
*/

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { data } = body;

    const existingProducts = await prisma.product.findMany({
      select: {
        id: true,
        unique_id_1c: true,
        barcode: true,
        artycul: true,
        quantity: true,
        img: true,
      },
    });
    const productsToCreate: any = [];
    const productsToUpdate: any = [];

    const queries = data.map(async (product1C: any) => {
      const existingProduct = existingProducts.find(
        (p) =>
          p.unique_id_1c === product1C.id ||
          p.barcode === product1C.barcode ||
          p.artycul === product1C.artycul,
      );

      if (!existingProduct) {
        productsToCreate.push({});
        return null;
      } else {
        if (
          existingProduct.quantity !== product1C.quantity &&
          existingProduct.quantity !== 1 &&
          existingProduct.img !== "miss"
        ) {
          productsToUpdate.push({
            where: { id: existingProduct.id },
            data: { quantity: product1C.quantity },
          });
          return await prisma.product.update({
            where: { id: existingProduct.id },
            data: { quantity: product1C.quantity },
          });
        }
      }

      return null;
    });

    const result = await Promise.all(queries);

    // const [updatedProducts] = await prisma.$transaction(
    //   queries.filter((q: any) => q !== null),
    // );

    return successResponse(result.filter((r) => r !== null).length);
  } catch (err: any) {
    console.error(err);
    return errorResponse("Помилка імпорту даних");
  }
}
