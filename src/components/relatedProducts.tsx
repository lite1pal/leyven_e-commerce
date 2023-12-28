import { API_URL } from "@/config/api";
import Card from "./card";

export default async function RelatedProducts({
  id,
  header,
}: {
  id?: string;
  header: string;
}) {
  const endpoint = id
    ? `${API_URL}/relatedProducts?id=${id}`
    : `${API_URL}/relatedProducts`;
  // gets products for the catalog
  const res = await fetch(endpoint, {
    cache: "no-store",
  });

  const data = await res.json();

  return (
    <div className="flex flex-col gap-7 px-7 py-5">
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
