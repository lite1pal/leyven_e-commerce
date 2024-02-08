import { COLLAR_API_URL } from "@/config/api";
import { getCategoriesFromCollar } from "@/libs/utils";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../auth/[...nextauth]/auth";

export async function GET(req: NextRequest) {
  try {
    const categories = await prisma.category.findMany();
    return new NextResponse(JSON.stringify(categories), { status: 200 });
  } catch (err) {
    console.error(err);
    return new NextResponse(JSON.stringify(err), { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const res = await fetch(COLLAR_API_URL);
    if (!res.ok) {
      return new NextResponse(JSON.stringify({ message: "Невірний ресурс" }), {
        status: 200,
      });
    }
    const existingCategories = await prisma.category.findMany();

    const fetchedCategories = await getCategoriesFromCollar(res);

    const promises = fetchedCategories.map((category: any) => {
      try {
        const categoryId = category["_attributes"]["id"];
        const title = category["_cdata"];
        const parentId = category["_attributes"]["parentId"];

        const existingCategory = existingCategories.find(
          (c) => c.categoryId === categoryId || c.title === title,
        );

        if (existingCategory) {
          return 0;
        }

        return prisma.category.create({
          data: { categoryId, title, parentId },
        });
      } catch (err) {
        console.error(err);
        return "error";
      }
    });

    const result = await Promise.all(promises);

    return new NextResponse(JSON.stringify(result), { status: 200 });
  } catch (err) {
    console.error(err);
    return new NextResponse(JSON.stringify(err), { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const categories = await prisma.category.deleteMany();
    return new NextResponse(JSON.stringify(categories), { status: 200 });
  } catch (err) {
    console.error(err);
    return new NextResponse(JSON.stringify(err), { status: 500 });
  }
}
