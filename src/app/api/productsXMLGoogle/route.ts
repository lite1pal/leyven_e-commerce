import { type NextRequest, NextResponse } from "next/server";
import { prisma } from "../auth/[...nextauth]/auth";
import fs from "fs/promises";
import { slugifyString } from "@/libs/utils";

export async function GET(req: NextRequest) {
  try {
    const products = await prisma.product.findMany({
      where: { img: { not: "miss" } },
    });

    let textXML =
      '<?xml version="1.0"?><rss xmlns:g="http://base.google.com/ns/1.0" version="2.0"><channel><title>Лейвен</title><link>https://www.leyven.com.ua/</link><g:description>RSS 2.0 product data feed</g:description>';

    products.forEach((product) => {
      const link =
        "https://www.leyven.com.ua/product/" +
        product.id +
        "-" +
        slugifyString(product.title) +
        "?source=merchant_center";

      textXML =
        textXML +
        `<item><g:id>${product.id}</g:id><g:title>${
          product.title
        }</g:title><g:mpn>${product.barcode}</g:mpn><g:description>${
          product.description
        }</g:description><g:price>${
          product.price.toString() + " UAH"
        }</g:price><g:link>${link}</g:link><g:image_link>${
          product.img
        }</g:image_link><g:availability>${
          product.availability
        }</g:availability><g:brand>${
          product.brand
        }</g:brand><g:identifier_exists>no</g:identifier_exists><g:condition>new</g:condition><g:ads_redirect>${link}</g:ads_redirect><g:product_type>${
          product.breadcrumbs
        }</g:product_type></item>`;
    });

    const safeXML = textXML.replaceAll("&", "-");

    // Specify the file path where you want to save the text file
    const filePath = "public/googleMerchant.txt";

    // Write the content to the file, overwriting if it already exists
    await fs.writeFile(filePath, safeXML + "</channel></rss>", "utf-8");

    // Write the content to the file, overwriting if it already exists
    // await fs.writeFile(filePath, textXML, "utf-8");
    return new Response(safeXML + "</channel></rss>", {
      status: 200,
      headers: {
        "Content-Type": "text/xml",
      },
    });
  } catch (err) {
    return new NextResponse(JSON.stringify(err), { status: 500 });
  }
}
