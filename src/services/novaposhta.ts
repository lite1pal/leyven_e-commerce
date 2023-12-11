import { NOVAPOSHTA_API_KEY, NOVAPOSHTA_API_URL } from "@/config/api";

export async function fetchWarehouses() {
  try {
    const res = await fetch(NOVAPOSHTA_API_URL, {
      method: "POST",
      body: JSON.stringify({
        apiKey: NOVAPOSHTA_API_KEY,
        modelName: "Address",
        calledMethod: "getWarehouses",
        methodProperties: {
          CityName: "малин",
          Limit: "500",
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
