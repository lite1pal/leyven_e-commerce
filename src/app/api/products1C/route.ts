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
    const { data, updateQuantity, updatePrice, createNew } = body;

    const existingProducts = await prisma.product.findMany({
      select: {
        id: true,
        price: true,
        unique_id_1c: true,
        barcode: true,
        artycul: true,
        quantity: true,
        img: true,
        availability: true,
      },
    });
    const productsToCreate: any = [];
    const productsToUpdate: any = [];

    const queries = data.map(async (product1C: any) => {
      // Find existing product
      const existingProduct = existingProducts.find(
        (p) =>
          p.unique_id_1c === product1C.id ||
          (p.barcode === product1C.barcode && !p.barcode?.startsWith("2")) ||
          p.artycul === product1C.artycul,
      );

      // If product doen't exist yet, create a new one
      if (!existingProduct) {
        // Create a new product only if a barcode doesn't start with "2"
        if (createNew && !product1C.barcode.startsWith("2")) {
          productsToCreate.push({});
          return await prisma.product.create({
            data: {
              unique_id_1c: product1C.id,
              title: product1C.title,
              price: product1C.price,
              quantity: product1C.quantity,
              barcode: product1C.barcode,
              artycul: product1C.artycul,
              availability: "in stock",
            },
          });
        }

        return null;
      }

      // If product exists already, update fields based on parameters
      else if (existingProduct.img !== "miss") {
        let data: any = {};

        // Update quantity
        if (updateQuantity && existingProduct.quantity !== product1C.quantity) {
          data.quantity = product1C.quantity;

          // Change product's availability status
          if (
            product1C.quantity === 0 &&
            existingProduct.availability === "in stock"
          ) {
            data.availability = "out of stock";
          } else if (
            product1C.quantity > 0 &&
            existingProduct.availability === "out of stock"
          ) {
            data.availability = "in stock";
          }
        }

        // Update price
        if (updatePrice && existingProduct.price !== product1C.price)
          data.price = product1C.price;

        // Add barcode and artycul
        if (!existingProduct.barcode || !existingProduct.artycul) {
          data.artycul = product1C.artycul;
          data.barcode = product1C.barcode;
        }

        // Update a product if parameters are specified
        if (Object.keys(data).length !== 0) {
          productsToUpdate.push({
            where: { id: existingProduct.id },
            data,
          });
          return await prisma.product.update({
            where: { id: existingProduct.id },
            data,
          });
        }
      }

      return null;
    });

    await Promise.all(queries);

    return successResponse({
      create: productsToCreate.length,
      update: productsToUpdate.length,
    });
  } catch (err: any) {
    console.error(err);
    return errorResponse("Помилка імпорту даних");
  }
}
