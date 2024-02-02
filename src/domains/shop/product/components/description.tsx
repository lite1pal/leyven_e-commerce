import SectionHeader from "@/components/base/SectionHeader";
import Warning from "./warning";
import { type Product } from "@/types";

export default function Description({ data }: { data: Product }) {
  return (
    <div className="flex flex-col gap-5 px-7 py-10">
      <SectionHeader>Опис</SectionHeader>
      <Warning />

      <p className="text-slate-700 xl:w-1/2">{data.description}</p>
    </div>
  );
}
