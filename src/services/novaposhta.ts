import { NOVAPOSHTA_API_KEY, NOVAPOSHTA_API_URL } from "@/config/api";

export async function fetchWarehouses(city: string, shippingType: string) {
  try {
    const res = await fetch(NOVAPOSHTA_API_URL, {
      method: "POST",
      body: JSON.stringify({
        apiKey: NOVAPOSHTA_API_KEY,
        modelName: "Address",
        calledMethod: "getWarehouses",
        methodProperties: {
          CityName: city,
          Limit: "600",
          Page: "1",
        },
      }),
    });
    const data = await res.json();

    let filteredData = [];
    if (shippingType === "Нова пошта Відділення") {
      filteredData = data.data.filter(
        (warehouse: any) =>
          warehouse["CategoryOfWarehouse"] === "Branch" &&
          warehouse["WarehouseStatus"] === "Working",
      );
    } else if (shippingType === "Нова пошта Поштомат") {
      filteredData = data.data.filter(
        (warehouse: any) =>
          warehouse["CategoryOfWarehouse"] === "Postomat" &&
          warehouse["WarehouseStatus"] === "Working",
      );
    }

    return filteredData.length > 0 ? filteredData : data.data;
  } catch (err) {
    console.error(err);
  }
}

export async function fetchCities() {
  try {
    const res = await fetch(NOVAPOSHTA_API_URL, {
      method: "POST",
      body: JSON.stringify({
        apiKey: NOVAPOSHTA_API_KEY,
        modelName: "Address",
        calledMethod: "getCities",
        methodProperties: {},
      }),
    });
    const data = await res.json();

    const filteredData = data.data.filter(
      (city: any) => city["SettlementTypeDescription"] === "місто",
    );

    return filteredData;
  } catch (err) {
    console.error(err);
  }
}
