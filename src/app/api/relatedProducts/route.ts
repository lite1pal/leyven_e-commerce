import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../auth/[...nextauth]/auth";

export async function GET(req: NextRequest) {
  try {
    // creates an object URL to obtain search params
    const url = new URL(req.url);

    const id = url.searchParams.get("id");
    let products = [];

    if (!id) {
      products = await prisma.product.findMany({
        where: { img: { not: "miss" }, availability: "in stock" },
        take: 10,
        orderBy: { updatedAt: "desc" },
        select: {
          id: true,
          img: true,
          images: true,
          title: true,
          price: true,
          discount: true,
          availability: true,
          quantity: true,
        },
      });

      return new NextResponse(JSON.stringify(products), {
        status: 200,
      });
    }

    const product = await prisma.product.findUnique({
      where: { id },
      select: { id: true, categoryId: true },
    });

    products = await prisma.product.findMany({
      where: {
        categoryId: product?.categoryId,
        img: { not: "miss" },
        availability: "in stock",
        id: { not: id },
      },
      select: {
        id: true,
        img: true,
        images: true,
        title: true,
        price: true,
        discount: true,
        availability: true,
        quantity: true,
      },
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
