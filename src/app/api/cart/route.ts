import { prisma } from "@/app/api/auth/[...nextauth]/auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const userId = req.nextUrl.searchParams.get("userId") as string;
  const cart = await prisma.cart.findFirst({ where: { userId } });
  return new NextResponse(JSON.stringify(cart), {
    status: 200,
  });
}
export async function POST(req: NextRequest) {
  try {
    // const cart = await prisma.cart.create({data: {
    //   userId:
    // }});
    const body = await req.json();
    const user: any = await prisma.user.findUnique({
      where: { email: body.session.user.email },
    });
    const cart = await prisma.cart.findFirst({ where: { userId: user?.id } });

    if (!cart) {
      const new_cart = await prisma.cart.create({
        data: {
          userId: user.id,
          cartProducts: { create: { productId: body.data.id } },
        },
        include: { cartProducts: true },
      });
      return new NextResponse(JSON.stringify(new_cart), {
        status: 200,
      });
    }

    await prisma.cartProduct.create({
      data: {
        cartId: cart.id,
        productId: body.data.id,
      },
    });
    const updatedCart = await prisma.cart.findUnique({
      where: { id: cart.id },
      include: { cartProducts: { include: { product: true } } },
    });
    return new NextResponse(JSON.stringify(updatedCart), {
      status: 200,
    });
  } catch (err) {
    return new NextResponse(JSON.stringify(err), {
      status: 500,
    });
  }
}
