import { products } from "@/data/data";
import { Divider, Grid } from "@mui/joy";
import { Rating } from "flowbite-react";

import { useParams, useRouter } from "next/navigation";

export default function AllAbout({ data }: any) {
  const params = useParams();

  const router = useRouter();

  // const data: any = products.filter((prod) => prod.id.toString() === "2");

  return (
    <Grid container spacing={2} sx={{ flexGrow: 1 }}>
      <Grid xs={8} marginInline="auto" md={4}>
        <div style={{ height: "30rem" }} className="mx-auto cursor-pointer">
          <img
            className="p-4 rounded-t-lg mx-auto w-full h-full object-contain"
            src={data.img}
            alt="product image"
          />
        </div>
      </Grid>
      <Grid xs={8}>
        <div className="text-2xl font-medium">{data.title}</div>
        <div className="flex justify-between py-2">
          <Rating style={{ paddingBlock: "0.5rem" }}>
            <Rating.Star />
            <p className="ml-2 text-sm font-bold text-gray-900 dark:text-white">
              {data.rating}
            </p>
            <span className="mx-1.5 h-1 w-1 rounded-full bg-gray-500 dark:bg-gray-400" />
            <a className="text-sm cursor-pointer font-medium text-gray-900 underline hover:no-underline dark:text-white">
              {/* {data.reviews} reviews */}
            </a>
          </Rating>
          <div className="font-light text-slate-400 pr-10">Код: 357398823</div>
        </div>
        <Divider />
        <div className="flex items-center pt-4 gap-5">
          <div>
            <div className="text-2xl font-semibold">{data.price} ₴</div>
            <div className="text-green-500">В наявності</div>
          </div>
          <span className="mx-1.5 h-1 w-1 rounded-full bg-gray-500 dark:bg-gray-400" />
          <button
            onClick={() => router.push("/order")}
            className="px-5 py-2 text-lg rounded text-white bg-blue-600 border-2 border-blue-600 transition hover:bg-white hover:text-blue-600"
          >
            Купити
          </button>
        </div>
      </Grid>
    </Grid>
  );
}
