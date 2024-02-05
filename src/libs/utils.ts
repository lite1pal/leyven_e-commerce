import slugify from "slugify";
import convert from "xml-js";
import * as XLSX from "xlsx";

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

export function getFiltersPathName(newFilters: string[], pathName: string) {
  return pathName.includes("filters")
    ? pathName.split("/filters/")[0] + "/filters/" + newFilters.join(";")
    : `${pathName}/filters/${newFilters.join(";")}`;
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
