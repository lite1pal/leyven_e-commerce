import convert from "xml-js";

export const convertXMLtoJSON = async (xmlRes: Response) => {
  const xmlText = await xmlRes.text();

  const xmlString = convert.xml2json(xmlText, {
    compact: true,
    spaces: 4,
  });

  const parsedXML = await JSON.parse(xmlString);

  return parsedXML.rss.channel.item;
};

export function wait(milliseconds: number) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}
