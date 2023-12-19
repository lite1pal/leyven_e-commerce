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
  return (
    <Grid container spacing={2} sx={{ flexGrow: 1 }}>
      <Grid xs={8} marginInline="auto" md={4}>
        <div style={{ height: "30rem" }} className="mx-auto cursor-pointer">
          <Carousel theme={customCarouselTheme}>
            <img
              className="p-4 rounded-t-lg mx-auto w-full h-full object-contain"
              src={data.img}
              alt="product image"
            />
            <img
              className="p-4 rounded-t-lg mx-auto w-full h-full object-contain"
              src={data.img}
              alt="product image"
            />
            <img
              className="p-4 rounded-t-lg mx-auto w-full h-full object-contain"
              src={data.img}
              alt="product image"
            />
          </Carousel>
        </div>
      </Grid>
      <Grid sx={{ width: "100%" }} xs={8} md={7}>
        <div className="max-sm:text-lg text-2xl font-medium">{data.title}</div>
        <div className="flex justify-between py-2 items-center">
          <Rating
            style={{
              paddingBlock: "0.5rem",
            }}
          >
            <Rating.Star />
            <p className="ml-1 text-sm font-bold text-gray-900 dark:text-white">
              {data.rating}
            </p>
            <span className="mx-1.5 h-1 w-1 rounded-full bg-gray-500 dark:bg-gray-400" />
            <a className="text-sm cursor-pointer font-medium text-gray-900 underline hover:no-underline dark:text-white">
              0 відгуків
            </a>
          </Rating>
          <div className="max-sm:text-sm font-light text-slate-400 pr-10">
            Код: {data.id.slice(0, 12)}
          </div>
        </div>
        <Divider />
        <div className="flex items-center pt-4 gap-5">
          <div>
            <div className="text-2xl font-semibold">{data.price}.00 UAH</div>
            <div className="flex gap-1 items-center">
              <UnarchiveIcon color="success" />
              <div className="text-green-500">В наявності</div>
            </div>
          </div>
          <span className="mx-1.5 h-1 w-1 rounded-full bg-gray-500 dark:bg-gray-400" />

          <Link onClick={() => !inCart(data.id) && addItem(data)} href="/order">
            <Button
              title="Купити"
              // onClick={() => {
              //   !inCart(data.id) && addItem(data);
              //   router.push("/order");
              // }}
            />
          </Link>
        </div>
        <BannerPromo />
        <ProductInfoTable {...{ data }} />
      </Grid>
    </Grid>
  );
}
