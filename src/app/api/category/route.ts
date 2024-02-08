import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../auth/[...nextauth]/auth";

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const categoryId = url.searchParams.get("id")!;

    const category = await prisma.category.findFirst({
      where: { categoryId },
    });

    let parentCategory: any = null;

    if (category && category.parentId) {
      parentCategory = await prisma.category.findFirst({
        where: { categoryId: { equals: category.parentId } },
      });
    }

    return new NextResponse(JSON.stringify({ category, parentCategory }), {
      status: 200,
    });
  } catch (err) {
    console.error(err);
    return new NextResponse(JSON.stringify(err), { status: 500 });
  }
}
