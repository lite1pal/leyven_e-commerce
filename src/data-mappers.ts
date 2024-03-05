export const getData1C = (data1C: any) => {
  // Filter data from 1C database to avoid empty fields
  const filteredData = data1C.filter((p: any) => {
    if (
      !p["Артикул"] ||
      !p["ШтрихКод"] ||
      !p["Ид"] ||
      !p["Наименование"] ||
      !p["Количество"] ||
      !p["Цены"] ||
      !p["Цены"]["Цена"] ||
      !p["Цены"]["Цена"]["ЦенаЗаЕдиницу"]
    ) {
      return false;
    }
    return true;
  });

  return filteredData.map((p: any) => ({
    id: p["Ид"]._text,
    title: p["Наименование"]._text,
    barcode: p["ШтрихКод"]._text,
    artycul: p["Артикул"]._text,
    quantity: parseInt(p["Количество"]._text),
    price: parseInt(p["Цены"]["Цена"]["ЦенаЗаЕдиницу"]._text),
  }));
};
