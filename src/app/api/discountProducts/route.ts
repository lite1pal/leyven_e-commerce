import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../auth/[...nextauth]/auth";

export async function GET(req: NextRequest) {
  try {
    const products = await prisma.product.findMany({
      where: { discount: { not: 0 } },
      take: 10,
    });

    return new NextResponse(JSON.stringify(products), {
      status: 200,
    });
  } catch (err) {
    return new NextResponse(JSON.stringify(err), {
      status: 500,
    });
  }
}
