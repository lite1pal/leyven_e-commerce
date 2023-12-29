import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../auth/[...nextauth]/auth";

export async function GET(req: NextRequest) {
  try {
    const orders = await prisma.order.findMany({
      include: {
        orderProducts: { include: { product: true } },
      },
      orderBy: { createdAt: "desc" },
    });

    return new NextResponse(JSON.stringify(orders), { status: 200 });
  } catch (err) {
    console.log(err);
    return new NextResponse(JSON.stringify(err), { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      email,
      phone,
      firstName,
      lastName,
      city,
      warehouse,
      orderProducts,
    } = body;

    const products = orderProducts.map((product: any) => {
      return {
        productId: product.id,
        quantity: product.quantity,
        itemTotal: product.itemTotal,
      };
    });

    const order = await prisma.order.create({
      data: {
        email,
        phone,
        firstName,
        lastName,
        city,
        warehouse,
        orderProducts: { createMany: { data: products } },
      },
    });
    // products.forEach(async (product: any) => {
    //   await prisma.orderProduct.createMany({ data: product });
    // });
    return new NextResponse(JSON.stringify(order), { status: 200 });
  } catch (err) {
    return new NextResponse(JSON.stringify(err), { status: 500 });
  }
}
