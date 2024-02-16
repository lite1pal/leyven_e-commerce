import { type Product } from "@/types";

export default function CardSearch({ data }: { data: Product }) {
  return (
    <div className="flex h-28 w-[30rem] gap-2 rounded-lg border">
      <div className="h-full w-28 overflow-hidden">
        <img
          className="h-full w-full object-contain"
          src={data.img}
          alt={data.title + "картинка"}
        />
      </div>
      <div className="w-3/4">{data.title}</div>
    </div>
  );
}
