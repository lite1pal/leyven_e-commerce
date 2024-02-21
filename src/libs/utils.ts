import slugify from "slugify"; // "slugify": "^1.6.6",
import convert from "xml-js";
import * as XLSX from "xlsx";
import { NextRequest, NextResponse } from "next/server";
import { API_KEY } from "@/config/api";
import { prisma } from "@/app/api/auth/[...nextauth]/auth";

export const convertXMLtoJSON = async (xmlRes: Response, resource = "prom") => {
  const xmlText = await xmlRes.text();

  const xmlString = convert.xml2json(xmlText, {
    compact: true,
    spaces: 4,
  });

  const parsedXML = await JSON.parse(xmlString);

  if (resource === "prom") {
    return parsedXML.rss.channel.item;
  }

  if (resource === "collar") {
    return parsedXML["yml_catalog"]["shop"]["offers"]["offer"];
  }

  return parsedXML;
};

export const getCategoriesFromCollar = async (xmlRes: Response) => {
  const xmlText = await xmlRes.text();

  const xmlString = convert.xml2json(xmlText, {
    compact: true,
    spaces: 4,
  });

  const parsedXML = await JSON.parse(xmlString);

  return parsedXML["yml_catalog"]["shop"]["categories"]["category"];
};

export const convertXLSXtoJSON = async (file: any) => {
  return new Promise((resolve, reject) => {
    var reader = new FileReader();
    let jsonData: any = [];

    reader.onload = function (e: any) {
      try {
        var data = e.target.result;
        let readedData = XLSX.read(data, { type: "binary" });
        const wsname = readedData.SheetNames[0];
        const ws = readedData.Sheets[wsname];

        /* Convert array to json*/
        const dataParse = XLSX.utils.sheet_to_json(ws, { header: 1 });
        jsonData = dataParse;
        resolve(jsonData);
      } catch (error) {
        reject(error);
      }
    };

    reader.readAsBinaryString(file);
  });
};

export function wait(milliseconds: number) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

export function valueOfPercent(percent: number, totalValue: number) {
  return (percent / 100) * totalValue;
}

export function decodeURIParams(stringParams: string) {
  const decodedFilters = decodeURIComponent(stringParams.toString());
  return decodedFilters.split(";");
}

export function changeArrayValue(
  array: string[],
  key: string,
  value: string,
): string[] {
  let count = 0;
  const newArray = array.map((item) => {
    if (item.includes(`${key}=`)) {
      count++;
      return `${key}=${value}`;
    }
    return item;
  });
  if (count === 0) newArray.push(`${key}=${value}`);

  return newArray;
}

export function getArrayValueByKey(array: string[], key: string) {
  if (!array || !key) return "";
  const filteredArray = array.filter((item) => item.includes(key));
  if (filteredArray.length === 0) return "";

  return filteredArray[0].split("=")[1];
  // return array.filter((item) => item.includes(key))[0].split("=")[1];
}

export function getFiltersPathName(
  newFilters: string[],
  pathName: string,
  search?: string | null,
) {
  const filtersPathName = pathName.includes("filters")
    ? pathName.split("/filters/")[0] + "/filters/" + newFilters.join(";")
    : `${pathName}/filters/${newFilters.join(";")}`;

  if (search) {
    return filtersPathName + `?search=${search}`;
  }

  return filtersPathName;
}

export function getDecodedFilters(filters: string) {
  return filters ? decodeURIParams(filters.toString()) : [];
}

export const slugifyString = (text: string) =>
  slugify(text, { lower: true })
    .toString()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-");

export function isValidApiKey(req: NextRequest) {
  const providedApiKey = req.headers.get("api-key");
  return providedApiKey === API_KEY;
}

export function errorResponse(err: string) {
  return new NextResponse(JSON.stringify(err), { status: 500 });
}

export function successResponse(data: any) {
  return new NextResponse(JSON.stringify(data), { status: 200 });
}

export function unauthorizedResponse() {
  return new NextResponse(JSON.stringify("Unauthorized. Provide an API key"), {
    status: 401,
  });
}

export function getAllExistingProducts() {
  return prisma.product.findMany();
}
