import { prisma } from "@/app/api/auth/[...nextauth]/auth";
import { convertXMLtoJSON } from "@/utils";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const products = await prisma.product.findMany();

    return new NextResponse(JSON.stringify(products.slice(0, 30)), {
      status: 200,
    });
  } catch (err) {
    return new NextResponse(JSON.stringify(err), {
      status: 500,
    });
  }
}

export async function POST(req: NextRequest) {
  try {
    const res = await fetch(
      "https://leyven.com.ua/google_merchant_center.xml?hash_tag=7cc3f8ae16866ff2c378c11cbcaa52ca&product_ids=&label_ids=&export_lang=uk&group_ids="
    );

    const badFormatData = await convertXMLtoJSON(res);

    badFormatData.forEach(async (badProduct: any) => {
      const productPrice = parseInt(badProduct["g:price"]._text.split(" ")[0]);
      await prisma.product.createMany({
        data: {
          title: badProduct["g:title"]._text,
          img: badProduct["g:image_link"]._text,
          price: productPrice,
          availability: badProduct["g:availability"]._text,
          description: badProduct["g:description"]._text,
          breadcrumbs: badProduct["g:product_type"]._text,
          rating: "4",
        },
      });
    });

    return new NextResponse(JSON.stringify(badFormatData), {
      status: 200,
    });
  } catch (err) {
    return new NextResponse(JSON.stringify(err), { status: 500 });
  }
}
