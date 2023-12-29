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
