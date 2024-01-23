import { type NextRequest, NextResponse } from "next/server";
import { prisma } from "../auth/[...nextauth]/auth";
import slugify from "slugify";

export async function GET(req: NextRequest) {
  try {
    const products = await prisma.product.findMany();

    let textXML =
      '<rss version="2.0"><channel><title>Лейвен</title><link>https://www.leyven.com.ua/</link><g:description>RSS 2.0 product data feed</g:description>';

    products.forEach((product) => {
      const link =
        "https://www.leyven.com.ua/product/" +
        product.id +
        "-" +
        slugify(product.title, {
          strict: true,
          lower: true,
        }).slice(0, 14) +
        "?source=merchant_center";

      textXML =
        textXML +
        `<item><g:id>${product.id}</g:id><g:title>${
          product.title
        }</g:title><g:description>${
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
      //   return {
      //     "g:id": product.id,
      //     "g:title": product.title,
      //     "g:description": product.description,
      //     "g:price": product.price.toString() + " UAH",
      //     "g:link": link,
      //     "g:image_link": product.img,
      //     "g:availability": product.availability,
      //     "g:brand": product.brand,
      //     "g:identifier_exists": "no",
      //     "g:condition": "new",
      //     "g:ads_redirect": link,
      //     "g:product_type": product.breadcrumbs,
      //   };
    });

    // const xml = js2xml(products, {
    //   compact: true,
    //   spaces: 2,
    // });

    return new Response(textXML + "</channel></rss>", {
      status: 200,
    });
  } catch (err) {
    return new NextResponse(JSON.stringify(err), { status: 500 });
  }
}
