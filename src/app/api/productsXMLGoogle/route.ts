import { type NextRequest, NextResponse } from "next/server";
import { XMLBuilder, XMLParser } from "fast-xml-parser";

export async function GET(req: NextRequest) {
  try {
    const res = await fetch(
      "https://leyven.prom.ua/google_merchant_center.xml?hash_tag=7cc3f8ae16866ff2c378c11cbcaa52ca&product_ids=&label_ids=&export_lang=uk&group_ids=",
    );

    const parser = new XMLParser();
    const xmlText = await res.text();

    let jObj = parser.parse(xmlText);

    const builder = new XMLBuilder();
    const xmlContent = builder.build(jObj); // Parse the text using fast-xml-parser

    console.log(typeof xmlContent);

    const replacedXmlContent = xmlContent.replace(
      "https://leyven.prom.ua/",
      "https://www.leyven.com.ua/",
    );

    return new Response(replacedXmlContent, {
      status: 200,
    });
  } catch (err) {
    return new NextResponse(JSON.stringify(err), { status: 500 });
  }
}
