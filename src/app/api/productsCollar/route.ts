import { convertXMLtoJSON } from "@/libs/utils";
import { NextRequest, NextResponse } from "next/server";
import convert from "xml-js";
import { prisma } from "../auth/[...nextauth]/auth";
import { COLLAR_API_URL } from "@/config/api";

/*
  Fetches and parses data from Collar's api.
  Creates new products bypassing existing ones by 'barcode' field in order to avoid duplicates.
*/

export async function POST(req: NextRequest) {
  try {
    const res = await fetch(COLLAR_API_URL);

    if (!res.ok) {
      return new NextResponse(JSON.stringify({ message: "Невірний ресурс" }), {
        status: 200,
      });
    }

    const badFormatData = await convertXMLtoJSON(res, "collar");

    const existingProducts = await prisma.product.findMany({
      where: { unique_id: { equals: "miss" } },
    });

    let count = 0;
    const promises = badFormatData.map(async (badProduct: any) => {
      try {
        const existingProduct = existingProducts.find(
          (product) => product.barcode == badProduct["ean13"]._text,
        );

        const getProductInfo = () => {
          return badProduct["param"].map((info: any) => {
            return {
              "g:attribute_name": { _text: info["_attributes"].name },
              "g:attribute_value": { _text: info["_cdata"] },
            };
          });
        };

        const getProductQuantity = () => {
          if (badProduct["quantityInStock"]._text) {
            return parseInt(badProduct["quantityInStock"]._text.split(".")[0]);
          }
          return 1;
        };

        const getProductPrice = () => {
          if (badProduct["price"]._text) {
            return parseInt(badProduct["price"]._text.split(".")[0]);
          }
          return 0;
        };

        const getProductImg = () => {
          return Array.isArray(badProduct["picture"])
            ? badProduct["picture"][0]._text
            : badProduct["picture"]._text;
        };

        if (existingProduct) {
          count++;
          return 0;
          // return prisma.product.update({
          //   where: { id: existingProduct.id },
          //   data: {
          //     img: getProductImg(),
          //     description: badProduct["description"]["_cdata"],
          //     info: getProductInfo(),
          //   },
          // });
        }
        // return 1;
        return prisma.product.create({
          data: {
            title: badProduct["name"]["_cdata"].replaceAll("&quot;", "'"),
            price: getProductPrice(),
            description: badProduct["description"]["_cdata"],
            artycul: badProduct["vendorCode"]._text,
            barcode: badProduct["ean13"]._text,
            quantity: getProductQuantity(),
            img: getProductImg(),
            info: getProductInfo(),
            availability: "in stock",
            discount: 0,
            unique_id_1c: "miss",
            unique_id: "miss",
          },
        });
      } catch (err: any) {
        console.error(err);
        return err.message;
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
