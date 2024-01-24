import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../auth/[...nextauth]/auth";

export async function GET(req: NextRequest) {
  try {
    // creates an object URL to obtain search params
    const url = new URL(req.url);

    const id = url.searchParams.get("id")!;
    let products = [];

    if (!id) {
      products = await prisma.product.findMany({
        take: 10,
        orderBy: { updatedAt: "desc" },
      });

      return new NextResponse(JSON.stringify(products), {
        status: 200,
      });
    }

    const product = await prisma.product.findUnique({ where: { id } });

    products = await prisma.product.findMany({
      where: { breadcrumbs: product?.breadcrumbs },
      take: 10,
    });

    return new NextResponse(
      JSON.stringify(products.filter((p) => p.id !== product?.id)),
      {
        status: 200,
      },
    );
  } catch (err) {
    return new NextResponse(JSON.stringify(err), {
      status: 500,
    });
  }
}
