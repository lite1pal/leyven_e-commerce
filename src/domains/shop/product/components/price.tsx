import { valueOfPercent } from "@/libs/utils";
import { type Product } from "@/types";

function UAHSymbol() {
  return <span className="text-xl"> ₴</span>;
}

function DiscountPrice({ data }: { data: Product }) {
  return (
    <span className="font-medium text-red-600">
      {data.price -
        valueOfPercent(data.discount ? data.discount : 0, data.price)}{" "}
      <UAHSymbol />
    </span>
  );
}

function OriginalPrice({ data }: { data: Product }) {
  if (data.discount !== 0) {
    return (
      <del className="text-xl">
        {data.price} <UAHSymbol />{" "}
      </del>
    );
  }
  return (
    <div>
      {data.price}
      <UAHSymbol />
    </div>
  );
}

export default function ProductPrice({ data }: { data: Product }) {
  return (
    <h2
      className={`flex flex-col gap-0 font-sans text-3xl font-medium text-slate-900 dark:text-white max-sm:text-base sm:flex-row sm:gap-3 lg:text-2xl`}
    >
      {data.discount !== 0 && <DiscountPrice {...{ data }} />}
      <OriginalPrice {...{ data }} />
      {/* {data.discount !== 0 ? (
        <del className="">{data.price}.00 UAH </del>
      ) : (
        data.price + ".00 UAH"
      )} */}
    </h2>
  );
}
