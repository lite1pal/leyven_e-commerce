import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../auth/[...nextauth]/auth";
import { TRUE } from "sass";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const user = await prisma.user.findUnique({
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
        quantity: 1,
        totalPrice: body.data.price,
      },
    });

    // const cartTotalPrice =
    //   parseFloat(body.data.price.split(" ")[0]).toString() + " UAH";

    const updatedCart = await prisma.cart.update({
      data: { totalPrice: cart?.totalPrice + body.data.price },
      where: { id: cart?.id! },
      include: { cartProducts: { include: { product: true } } },
    });

    // const updatedCart = await prisma.cart.findUnique({
    //   where: { id: cart?.id },
    //   include: { cartProducts: { include: { product: true } } },
    // });
    return new NextResponse(JSON.stringify(updatedCart), {
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
    const { searchParams } = new URL(req.url);
    const cartProductId = searchParams.get("cartProductId") as string;
    const type = searchParams.get("type");
    const cartProduct = await prisma.cartProduct.findUnique({
      where: { id: cartProductId },
      include: { product: true },
    });
    const cart = await prisma.cart.findUnique({
      where: { id: cartProduct?.cartId },
    });

    let cartProductTotalPrice = 0;

    if (type === "increase") {
      cartProductTotalPrice =
        cartProduct?.product?.price! * (cartProduct?.quantity! + 1);

      await prisma.cartProduct.update({
        where: { id: cartProductId },
        data: {
          quantity: cartProduct?.quantity! + 1,
          totalPrice: cartProductTotalPrice,
        },
      });
      await prisma.cart.update({
        where: { id: cartProduct?.cartId! },
        data: { totalPrice: cart?.totalPrice! + cartProduct?.product.price! },
      });
    } else if (type === "decrease") {
      cartProductTotalPrice =
        cartProduct?.product?.price! * (cartProduct?.quantity! - 1);

      await prisma.cartProduct.update({
        where: { id: cartProductId },
        data: {
          quantity: cartProduct?.quantity! - 1,
          totalPrice: cartProductTotalPrice,
        },
      });
      await prisma.cart.update({
        where: { id: cartProduct?.cartId! },
        data: { totalPrice: cart?.totalPrice! - cartProduct?.product.price! },
      });
    }
    return new NextResponse(JSON.stringify({}));
  } catch (err) {
    return new NextResponse(JSON.stringify(err), { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const cartProductId = searchParams.get("cartProductId") as string;

    const deletedCartProduct = await prisma.cartProduct.delete({
      where: { id: cartProductId },
    });

    const cart = await prisma.cart.findUnique({
      where: { id: deletedCartProduct.cartId },
    });

    await prisma.cart.update({
      where: { id: deletedCartProduct.cartId! },
      data: { totalPrice: cart?.totalPrice! - deletedCartProduct.totalPrice },
    });

    return new NextResponse(JSON.stringify(cartProductId));
  } catch (err) {
    return new NextResponse(JSON.stringify(err), { status: 500 });
  }
}
