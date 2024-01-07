import { API_URL } from "@/config/api";
import Card from "../cards/card";
import SectionHeader from "../base/SectionHeader";

export default async function DiscountProducts({ header }: { header: string }) {
  // gets products for the catalog
  const res = await fetch(`${API_URL}/discountProducts`, {
    cache: "no-store",
  });

  const data = await res.json();

  return (
    <div className="flex flex-col gap-7 px-7 py-5">
      <SectionHeader>{header}</SectionHeader>
      <div className="flex gap-2 overflow-x-scroll">
        {data.slice(0, 10).map((discountProduct: any) => {
          return (
            <Card
              key={discountProduct.id}
              type="discount products"
              data={discountProduct}
            />
          );
        })}
      </div>
    </div>
  );
}
