import { type Product } from "@/types";

export default function ProductArtycul({ data }: { data: Product }) {
  return (
    <div className="text-sm font-light text-slate-600">
      Артикул: {data.artycul ? data.artycul.split(" ")[0] : "null"}
    </div>
  );
}
