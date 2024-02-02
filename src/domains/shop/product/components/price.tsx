import { valueOfPercent } from "@/libs/utils";
import { type Product } from "@/types";

export default function ProductPrice({ data }: { data: Product }) {
  return (
    <div
      className={`flex flex-col gap-0 font-sans text-2xl font-semibold text-slate-900 dark:text-white max-sm:text-base sm:flex-row sm:gap-5 lg:text-2xl`}
    >
      {data.discount !== 0 && (
        <span className="font-medium text-red-600">
          {data.price -
            valueOfPercent(data.discount ? data.discount : 0, data.price)}{" "}
          UAH
        </span>
      )}
      {data.discount !== 0 ? (
        <del className="">{data.price}.00 UAH </del>
      ) : (
        data.price + ".00 UAH"
      )}
    </div>
  );
}
