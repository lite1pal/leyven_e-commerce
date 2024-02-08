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

export async function PUT(req: NextRequest) {
  try {
    // const categories = await prisma.category.findMany();
    const promProducts = await prisma.product.findMany({
      where: { unique_id: { not: "miss" } },
    });

    const promises = promProducts.map((product) => {
      try {
        let data: any = {};
        if (
          product.breadcrumbs.includes(
            "корми та ласощі для домашніх тварин і птахів",
          )
        ) {
          data.categoryId = "92";
        } else if (
          product.breadcrumbs.includes("повідки, нашийники, намордники, шлейки")
        ) {
          data.categoryId = "98";
        } else if (
          product.breadcrumbs.includes(
            "сумки і контейнери для перенесення домашніх тварин",
          )
        ) {
          data.categoryId = "97";
        } else if (
          product.breadcrumbs.includes("іграшки для домашніх тварин")
        ) {
          data.categoryId = "100";
        } else if (product.breadcrumbs.includes("засоби для гігієни тварин")) {
          data.categoryId = "102";
        } else if (
          product.breadcrumbs.includes("обладнання та інструменти для грумінгу")
        ) {
          data.categoryId = "103";
        } else if (
          product.breadcrumbs.includes("туалетні лотки для тварин і аксесуари")
        ) {
          data.categoryId = "104";
        } else if (
          product.breadcrumbs.includes("антипаразитарні засоби для тварин")
        ) {
          data.categoryId = "106";
        } else if (product.breadcrumbs.includes("Вітаміни для тварин")) {
          data.categoryId = "107";
        } else if (
          product.breadcrumbs.includes(
            "ветеринарні антибіотики та антимікробні препарати",
          )
        ) {
          data.categoryId = "108";
        } else if (
          product.breadcrumbs.includes("антисептичні ветеринарні препарати")
        ) {
          data.categoryId = "109";
        }

        return prisma.product.update({
          where: { id: product.id },
          data,
        });
      } catch (err) {
        console.error(err);
        return "error";
      }
    });
    const result = await Promise.all(promises);
    return new NextResponse(JSON.stringify(result), {
      status: 200,
    });
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
