import { NOVAPOSHTA_API_KEY, NOVAPOSHTA_API_URL } from "@/config/api";

export async function fetchWarehouses(city: string) {
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
    const filteredData = data.data.filter(
      (warehouse: any) => warehouse["CategoryOfWarehouse"] === "Branch"
    );
    return filteredData;
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
      (city: any) => city["SettlementTypeDescription"] === "місто"
    );

    return filteredData;
  } catch (err) {
    console.error(err);
  }
}
