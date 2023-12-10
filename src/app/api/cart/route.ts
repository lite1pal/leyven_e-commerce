import { auth, prisma } from "@/app/api/auth/[...nextauth]/auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    // gets searchparams
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email") as string;

    // gets a user
    const user = await prisma.user.findFirst({ where: { email } });

    // gets a cart based on user id
    const cart = await prisma.cart.findFirst({
      where: { userId: user?.id },
      include: { cartProducts: { include: { product: true } } },
    });

    // in case if a cart doesn't exist, it creates a new one
    if (!cart) {
      const new_cart = await prisma.cart.create({
        data: {
          userId: user?.id!,
        },
        include: { cartProducts: { include: { product: true } } },
      });
      return new NextResponse(JSON.stringify(new_cart), { status: 200 });
    }
    return new NextResponse(JSON.stringify(cart), {
      status: 200,
    });
  } catch (err) {
    return new NextResponse(JSON.stringify(err), { status: 500 });
  }
}
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const user: any = await prisma.user.findUnique({
      where: { email: body.session.user.email },
    });
    const cart = await prisma.cart.findFirst({
      where: { userId: user?.id },
      include: { cartProducts: { include: { product: true } } },
    });

    const existingCartProduct: any = cart?.cartProducts.filter(
      (cartProduct) => cartProduct.productId === body.data.id
    );

    if (existingCartProduct[0]) {
      return new NextResponse(JSON.stringify(cart), {
        status: 200,
      });
    }

    await prisma.cartProduct.create({
      data: {
        cartId: cart?.id!,
        productId: body.data.id,
      },
    });

    const updatedCart = await prisma.cart.findUnique({
      where: { id: cart?.id },
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
