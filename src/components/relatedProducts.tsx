import { API_URL } from "@/config/api";
import Card from "./card";

export default async function RelatedProducts({ header }: { header: string }) {
  // gets products for the catalog
  const res = await fetch(`${API_URL}/products`, {
    cache: "no-store",
  });

  const data = await res.json();

  return (
    <div className="px-7 flex flex-col gap-7 py-5">
      <div className="text-2xl font-medium">{header}</div>
      <div className="flex gap-2 overflow-x-scroll">
        {data.slice(0, 10).map((relatedProduct: any) => {
          return (
            <Card
              key={relatedProduct.id}
              type="related products"
              data={relatedProduct}
            />
          );
        })}
      </div>
    </div>
  );
}
