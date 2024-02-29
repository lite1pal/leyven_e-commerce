import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../auth/[...nextauth]/auth";
import { isValidApiKey, unauthorizedResponse } from "@/libs/utils";

export async function POST(req: NextRequest) {
  try {
    if (!isValidApiKey(req)) {
      return unauthorizedResponse();
    }

    const body = await req.json();
    const { jsonData } = body;

    const existingProducts = await prisma.product.findMany({
      where: { unique_id: { not: "miss" } },
    });

    const promises = jsonData.slice(1).map(async (product: any) => {
      try {
        const existingProduct = existingProducts.find(
          (p) => p.unique_id === product[24].toString(),
        );

        if (existingProduct) {
          return prisma.product.update({
            where: { id: existingProduct.id },
            data: {
              description: existingProduct.description.includes("<p>")
                ? existingProduct.description
                : product[6],
              keywords: product[4],
            },
          });
        }
        return 0;
      } catch (err) {
        console.error(err);
      }
    });

    const result = await Promise.all(promises);

    return new NextResponse(JSON.stringify(result), { status: 200 });
  } catch (err) {
    console.error("Invalid file format");
    return new NextResponse(JSON.stringify(err), { status: 500 });
  }
}
