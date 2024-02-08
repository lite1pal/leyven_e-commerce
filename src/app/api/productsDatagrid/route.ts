import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../auth/[...nextauth]/auth";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { pageSize, page, sortModel, filterModel } = body;

    let where = {};
    let orderBy = {};
    let search = "";

    if (sortModel[0]) {
      const sortField = sortModel[0].field;
      const sortOrder = sortModel[0].sort;
      orderBy = { [sortField]: sortOrder };
    }

    if (Array.isArray(filterModel.quickFilterValues)) {
      search = filterModel.quickFilterValues.join(" ");

      where = {
        OR: [
          {
            title: {
              contains: search,
              mode: "insensitive",
            },
          },
          {
            availability: { contains: search, mode: "insensitive" },
          },
          {
            barcode: { contains: search, mode: "insensitive" },
          },
          { unique_id: { contains: search, mode: "insensitive" } },
          { unique_id_1c: { contains: search, mode: "insensitive" } },
          { artycul: { contains: search, mode: "insensitive" } },
        ],
      };
    }

    const products = await prisma.product.findMany({
      where,
      orderBy,
      take: pageSize,
      skip: page * pageSize,
    });

    const productsCount = await prisma.product.count();

    return new NextResponse(JSON.stringify({ products, productsCount }), {
      status: 200,
    });
  } catch (err) {
    console.error(err);
    return new NextResponse(JSON.stringify(err), { status: 500 });
  }
}