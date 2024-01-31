import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../auth/[...nextauth]/auth";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { xmlTextFile } = body;

    // const xmlString = convert.xml2json(xmlTextFile, {
    //   compact: true,
    //   spaces: 4,
    // });

    // const parsedXML = await JSON.parse(xmlString);
    // console.log(
    //   parsedXML["КоммерческаяИнформация"]["ПакетПредложений"]["Предложения"],
    // );
    return new NextResponse(JSON.stringify("message"), { status: 200 });
  } catch (err) {
    return new NextResponse(JSON.stringify(err), { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { jsonData } = body;

    const promises = jsonData.slice(1).map(async (badProduct: any) => {
      try {
        const product = await prisma.product.findFirst({
          where: {
            unique_id: { equals: badProduct[24].toString() },
          },
        });

        if (!product) {
          return;
        }

        return prisma.product.update({
          where: { id: product.id },
          data: { unique_id_1c: badProduct[25] },
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
