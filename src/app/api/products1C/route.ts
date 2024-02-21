import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../auth/[...nextauth]/auth";
import convert from "xml-js";
import { isValidApiKey } from "@/libs/utils";

/*
  Parses uploaded XML file into JSON.
  Creates new products bypassing existing ones by 'unique_id_1c' field in order to avoid duplicates.
*/

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { xmlText } = body;

    const xmlString = convert.xml2json(xmlText, {
      compact: true,
      spaces: 4,
    });

    const parsedXML = await JSON.parse(xmlString);

    // 1C data converted from XML to JSON
    const badFormatData =
      parsedXML["КоммерческаяИнформация"]["ПакетПредложений"]["Предложения"][
        "Предложение"
      ];

    if (badFormatData.length === 0) {
      return new NextResponse(
        JSON.stringify({ message: "Імпорт наразі неможливий" }),
        {
          status: 200,
        },
      );
    }

    const existingProducts = await prisma.product.findMany();

    const promises = badFormatData.map(async (badProduct: any) => {
      try {
        const existingProduct = existingProducts.find(
          (product) =>
            product.unique_id_1c === badProduct["Ид"]._text ||
            product.barcode === badProduct["ШтрихКод"]._text ||
            product.artycul === badProduct["Артикул"]._text,
        );

        // returns nothing if product already exists to avoid duplicates
        if (existingProduct) {
          if (
            existingProduct.quantity !==
              parseInt(badProduct["Количество"]._text) &&
            existingProduct.quantity !== 1 &&
            existingProduct.img !== "miss"
          ) {
            return prisma.product.update({
              where: { id: existingProduct.id },
              data: { quantity: parseInt(badProduct["Количество"]._text) },
            });
          }

          return "product exists";
        }

        return prisma.product.create({
          data: {
            unique_id_1c: badProduct["Ид"]._text,
            title: badProduct["Наименование"]._text,
            price: parseInt(badProduct["Цены"]["Цена"]["ЦенаЗаЕдиницу"]._text),
            availability: "in stock",
            quantity: parseInt(badProduct["Количество"]._text),
            barcode: badProduct["ШтрихКод"] || "miss",
            artycul: badProduct["Артикул"] || "miss",
            info: [],
            keywords: "",
          },
        });
      } catch (err) {
        console.error(err);
      }
    });

    const result = await Promise.all(promises);

    return new NextResponse(JSON.stringify(result), { status: 200 });
  } catch (err) {
    console.error(err, "Invalid file format");
    return new NextResponse(JSON.stringify(err), { status: 500 });
  }
}
