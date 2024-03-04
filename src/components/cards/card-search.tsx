import ProductAvailability from "@/app/(shop)/product/[id]/components/availability";
import ProductPrice from "@/app/(shop)/product/[id]/components/price";
import { slugifyString } from "@/libs/utils";
import { type Product } from "@/types";
import Link from "next/link";

export default function CardSearch({ data }: { data: Product }) {
  return (
    <Link
      href={`/product/${data.id}-${slugifyString(data.title)}`}
      className="flex h-36 w-full gap-2 overflow-hidden rounded-lg"
    >
      <div style={{ minWidth: "10rem" }} className="h-full w-28 p-5">
        <img
          className="object-cover"
          src={data.img}
          alt={data.title + "картинка"}
        />
      </div>
      <div className="flex flex-col gap-1">
        {/* <div className="w-3/4">{data.title.slice(0, 40)}</div> */}
        <div
          title={data.title}
          // style={{ animation: "move-words 20s linear infinite;" }}
          className="overflow-x-hidden whitespace-nowrap text-lg font-medium tracking-tight dark:text-white max-sm:text-base xl:text-base"
        >
          {data.title}
        </div>
        <div className="font-medium">{data.price} ₴</div>
        <ProductAvailability {...{ data }} />
      </div>
    </Link>
  );
}
