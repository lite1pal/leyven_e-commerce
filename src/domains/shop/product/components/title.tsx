import { type Product } from "@/types";

export default function ProductTitle({ data }: { data: Product }) {
  return (
    <div className="mx-auto text-3xl text-slate-900 max-sm:text-lg">
      {data.title}
    </div>
  );
}
