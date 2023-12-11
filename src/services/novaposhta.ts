export async function getWarehouses() {
  try {
    const res = await fetch("https://api.novaposhta.ua/v2.0/json", {
      method: "GET",
      body: JSON.stringify({
        apiKey: "e6cdb1e9e29b8014778e8ad687ac414d",
        modelName: "Address",
        calledMethod: "getWarehouses",
        methodProperties: { CityName: "київ", Limit: "50", Page: "2" },
      }),
    });
    const data = await res.json();
    return data;
  } catch (err) {
    console.error(err);
  }
}
