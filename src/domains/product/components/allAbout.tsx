import { Box, Divider, Grid } from "@mui/joy";
import { Carousel, Rating } from "flowbite-react";
import Link from "next/link";
import type { CustomFlowbiteTheme } from "flowbite-react";

import { useParams, useRouter } from "next/navigation";
import BannerPromo from "@/components/bannerPromo";
import ProductInfoTable from "@/components/productInfoTable";
import UnarchiveIcon from "@mui/icons-material/Unarchive";
import { useCart } from "react-use-cart";
import Button from "@/components/base/Button";

const customCarouselTheme: CustomFlowbiteTheme["carousel"] = {
  root: {
    base: "relative h-full w-full",
    leftControl:
      "absolute top-0 left-0 flex h-full items-center justify-center px-4 focus:outline-none",
    rightControl:
      "absolute top-0 right-0 flex h-full items-center justify-center px-4 focus:outline-none",
  },
  item: {
    base: "absolute top-1/2 left-1/2 block w-full -translate-x-1/2 -translate-y-1/2",
    wrapper: {
      off: "w-full flex-shrink-0 transform cursor-default snap-center",
      on: "w-full flex-shrink-0 transform cursor-grab snap-center",
    },
  },
  indicators: {
    active: {
      off: "bg-white/50 hover:bg-white dark:bg-gray-800/50 dark:hover:bg-gray-800",
      on: "bg-white dark:bg-gray-800",
    },
    base: "h-3 w-3 rounded-full",
    wrapper:
      "absolute rounded-full bg-blue-600 p-1.5 bottom-3 left-1/2 flex -translate-x-1/2 space-x-3",
  },
  control: {
    base: "inline-flex h-8 w-8 border-2 items-center justify-center rounded-full bg-white/30 group-hover:bg-white/50 group-focus:ring-4 group-focus:ring-white dark:bg-gray-800/30 dark:group-hover:bg-gray-800/60 dark:group-focus:ring-gray-800/70 sm:h-10 sm:w-10",
    icon: "h-5 w-5 dark:text-gray-800 sm:h-6 sm:w-6",
  },
};

export default function AllAbout({ data }: any) {
  const { addItem, inCart } = useCart();
  const router = useRouter();

  const calculateAverageRating = (): string => {
    let totalRating = 0;
    data.reviews.forEach((review: any) => {
      totalRating = totalRating + parseInt(review.rating);
    });
    return (totalRating / data.reviews.length).toFixed(1);
  };
  return (
    <Grid container spacing={2} sx={{ flexGrow: 1 }}>
      <Grid xs={8} marginInline="auto" md={4}>
        <div style={{ height: "30rem" }} className="mx-auto cursor-pointer">
          <Carousel theme={customCarouselTheme}>
            <img
              className="mx-auto h-full w-full rounded-t-lg object-contain p-4"
              src={data.img}
              alt="product image"
            />
            <img
              className="mx-auto h-full w-full rounded-t-lg object-contain p-4"
              src={data.img}
              alt="product image"
            />
            <img
              className="mx-auto h-full w-full rounded-t-lg object-contain p-4"
              src={data.img}
              alt="product image"
            />
          </Carousel>
        </div>
      </Grid>
      <Grid sx={{ width: "100%" }} xs={8} md={7}>
        <div className="text-2xl font-medium max-sm:text-lg">{data.title}</div>
        <div className="flex items-center justify-between py-2">
          <Rating
            style={{
              paddingBlock: "0.5rem",
            }}
          >
            <Rating.Star />
            <p className="ml-1 text-sm font-bold text-gray-900 dark:text-white">
              {data?.reviews.length > 0 && calculateAverageRating()}
            </p>
            <span className="mx-1.5 h-1 w-1 rounded-full bg-gray-500 dark:bg-gray-400" />
            <a className="cursor-pointer text-sm font-medium text-gray-900 underline hover:no-underline dark:text-white">
              {data.reviews ? data?.reviews.length : "0"} відгуків
            </a>
          </Rating>
          <div className="pr-10 font-light text-slate-400 max-sm:text-sm">
            Код: {data.id.slice(0, 12)}
          </div>
        </div>
        <Divider />
        <div className="flex items-center gap-5 pt-4">
          <div>
            <div className="text-2xl font-semibold">{data.price}.00 UAH</div>
            <div className="flex items-center gap-1">
              {data.availability === "in stock" ? (
                <>
                  <UnarchiveIcon color="success" />
                  <div className="text-green-500">В наявності</div>
                </>
              ) : (
                <div className="text-slate-500">Немає на складі</div>
              )}
            </div>
          </div>
          <span
            className={`${
              data.availability === "out of stock" && "hidden"
            } mx-1.5 h-1 w-1 rounded-full bg-gray-500 dark:bg-gray-400`}
          />

          {data.availability === "in stock" && (
            <Link
              onClick={() => !inCart(data.id) && addItem(data)}
              href="/order"
            >
              <Button title="Купити" />
            </Link>
          )}
        </div>
        {/* <BannerPromo /> */}
        <ProductInfoTable {...{ data }} />
      </Grid>
    </Grid>
  );
}
