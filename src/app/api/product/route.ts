import { prisma } from "@/app/api/auth/[...nextauth]/auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const id = url.searchParams.get("id");
    if (!id) {
      return new NextResponse(
        JSON.stringify("id is not provided in search params"),
        {
          status: 404,
        },
      );
    }
    const product = await prisma.product.findUnique({
      where: { id },
      include: {
        reviews: { include: { user: true }, orderBy: { createdAt: "desc" } },
      },
    });
    return new NextResponse(JSON.stringify(product), {
      status: 200,
    });
  } catch (err) {
    return new NextResponse(JSON.stringify(err), {
      status: 500,
    });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, title, price, availability, discount, img } = body;
    console.log(body);
    const updatedProduct = await prisma.product.update({
      where: { id },
      data: {
        title,
        price: parseInt(price),
        availability,
        discount: parseInt(discount),
        img,
      },
    });
    return new NextResponse(JSON.stringify(updatedProduct), { status: 200 });
  } catch (err) {
    return new NextResponse(JSON.stringify(err), {
      status: 500,
    });
  }
}
