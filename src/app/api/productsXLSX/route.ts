import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../auth/[...nextauth]/auth";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { jsonData } = body;

    // const existingProducts = await prisma.product.findMany();

    // const promises = badFormatData.map(async (badProduct: any) => {
    //   try {
    //     const existingProduct = existingProducts.find(
    //       (product) =>
    //         product.unique_id_1c === badProduct["Ид"]._text ||
    //         product.barcode === badProduct["ШтрихКод"]._text,
    //     );

    //     // returns nothing if product already exists to avoid duplicates
    //     if (existingProduct) {
    //       return;
    //     }

    //     return;
    //   } catch (err) {
    //     console.error(err);
    //   }
    // });

    // const result = await Promise.all(promises);

    return new NextResponse(JSON.stringify(jsonData), { status: 200 });
  } catch (err) {
    console.error("Invalid file format");
    return new NextResponse(JSON.stringify(err), { status: 500 });
  }
}
