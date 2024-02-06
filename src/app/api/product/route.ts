import { prisma } from "@/app/api/auth/[...nextauth]/auth";
import { NextRequest, NextResponse } from "next/server";

/* 
  Returns a product based on id provided in params.

  If 'dashboard=true' is provided in params, then it'll return status 404.
*/

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const id = url.searchParams.get("id");
    const isDashboard = url.searchParams.get("dashboard");

    if (!id) {
      return new NextResponse(
        JSON.stringify("id is not provided in search params"),
        {
          status: 404,
        },
      );
    }

    let where: any = { id: id.split("-")[0], img: { not: "miss" } };

    if (isDashboard) {
      where = { id };
    }

    const product = await prisma.product.findUnique({
      where,
      include: {
        reviews: { include: { user: true }, orderBy: { createdAt: "desc" } },
      },
    });

    if (!product) {
      return new NextResponse(JSON.stringify("product not found"), {
        status: 404,
      });
    }
    return new NextResponse(JSON.stringify(product), {
      status: 200,
    });
  } catch (err) {
    return new NextResponse(JSON.stringify(err), {
      status: 500,
    });
  }
}

/*
  Updates a product based on id provided in body.
  Returns the updated product.
*/

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      id,
      title,
      description,
      price,
      availability,
      quantity,
      discount,
      img,
    } = body;

    const updatedProduct = await prisma.product.update({
      where: { id },
      data: {
        title,
        description,
        price: parseInt(price),
        availability,
        quantity,
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
