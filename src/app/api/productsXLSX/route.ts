import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../auth/[...nextauth]/auth";
import {
  errorResponse,
  isValidApiKey,
  successResponse,
  unauthorizedResponse,
} from "@/libs/utils";
import { fetchPromData } from "../products/route";

export const maxDuration = 50;

export async function POST(req: NextRequest) {
  try {
    if (!isValidApiKey(req)) {
      return unauthorizedResponse();
    }

    const body = await req.json();
    const { dataExcel } = body;

    const dataPromXml = await fetchPromData();

    const combinedData = dataExcel
      .map((p: any) => {
        const productPromXml = dataPromXml.find(
          (pXml: any) => pXml.unique_id_prom === p.unique_id_prom,
        );
        if (productPromXml && productPromXml.info[0]) {
          p.info = productPromXml.info;
          p.img = productPromXml.img;
          return p;
        }
        return null;
      })
      .filter((p: any) => p !== null);

    const existingProducts = await prisma.product.findMany({
      where: { unique_id: { not: "miss" } },
      select: {
        unique_id: true,
        unique_id_1c: true,
      },
    });

    let createdProductsLength = 0;

    const queries = combinedData.map(async (productProm: any) => {
      const existingProduct = existingProducts.find(
        (p) =>
          p.unique_id_1c === productProm.unique_id_1c ||
          p.unique_id === productProm.unique_id_prom,
      );

      if (!existingProduct) {
        const {
          unique_id_prom,
          unique_id_1c,
          info,
          img,
          title,
          price,
          description,
          keywords,
          availability,
        } = productProm;

        createdProductsLength++;
        return await prisma.product.create({
          data: {
            unique_id: unique_id_prom,
            unique_id_1c,
            info,
            img,
            title,
            price,
            description,
            keywords,
            availability,
          },
        });
      }

      return null;
    });

    await Promise.all(queries);

    return successResponse({
      excel: dataExcel.length,
      xml: dataPromXml.length,
      combined: combinedData.length,
      created: createdProductsLength,
    });
  } catch (err: any) {
    console.error("POST 500 /productsXLSX\n", err.message);
    return errorResponse(err.message);
  }
}
