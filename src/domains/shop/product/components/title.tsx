import { type Product } from "@/types";

export default function ProductTitle({ data }: { data: Product }) {
  return (
    <div className="mx-auto text-2xl font-medium max-sm:text-lg">
      {data.title}
    </div>
  );
}
