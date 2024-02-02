import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../auth/[...nextauth]/auth";
import convert from "xml-js";

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
          (product) => product.unique_id_1c === badProduct["Ид"]._text,
        );

        // return;

        if (existingProduct) {
          return;
          // return prisma.product.update({
          //   where: { id: existingProduct.id },
          //   data: {
          //     quantity:
          //       badProduct["Количество"]._text === "0"
          //         ? 1
          //         : parseInt(badProduct["Количество"]._text),
          //     barcode: badProduct["ШтрихКод"]._text,
          //     artycul: badProduct["Артикул"]._text,
          //   },
          // });
        }
        return prisma.product.create({
          data: {
            unique_id_1c: badProduct["Ид"]._text,
            title: badProduct["Наименование"]._text,
            price: parseInt(badProduct["Цены"]["Цена"]["ЦенаЗаЕдиницу"]._text),
            availability: "in stock",
            quantity:
              badProduct["Количество"]._text === "0"
                ? 1
                : parseInt(badProduct["Количество"]._text),
            barcode: badProduct["ШтрихКод"]._text
              ? badProduct["ШтрихКод"]._text
              : "miss",
            artycul: badProduct["Артикул"]._text
              ? badProduct["Артикул"]._text
              : "miss",
            info: [],
          },
        });
      } catch (err) {
        console.error(err);
      }
    });

    const result = await Promise.all(promises);

    return new NextResponse(JSON.stringify(result), { status: 200 });
  } catch (err) {
    console.error("Invalid file format");
    return new NextResponse(JSON.stringify(err), { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    // const body = await req.json();
    // const { jsonData } = body;

    const products = await prisma.product.findMany({
      where: { unique_id: { equals: "miss" } },
    });

    const promises = products.map(async (product: any) => {
      try {
        // if (product.rating) {
        //   return;
        // }

        return prisma.product.update({
          where: { id: product.id },
          data: {
            img: "miss",
            description: "miss",
            breadcrumbs: "miss",
            country: "miss",
            brand: "miss",
          },
        });
      } catch (err) {
        console.error(err, "ERROR");
      }
    });

    const result = await Promise.all(promises);

    return new NextResponse(JSON.stringify(result), { status: 200 });
  } catch (err) {
    return new NextResponse(JSON.stringify(err), { status: 500 });
  }
}
