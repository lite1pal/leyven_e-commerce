import { type Product } from "@/types";
import { PhotoProvider, PhotoView } from "react-photo-view";

export default function ProductImg({ data }: { data: Product }) {
  return (
    <PhotoProvider>
      <div
        // style={{ maxHeight: "30rem" }}
        className="mx-auto aspect-square h-full w-full max-w-lg cursor-pointer lg:w-1/2"
      >
        <PhotoView src={data.img}>
          <img
            style={{ maxHeight: "40rem" }}
            className="mx-auto h-full w-full rounded-t-lg object-contain"
            src={data.img}
            alt="product image"
          />
        </PhotoView>
      </div>
    </PhotoProvider>
  );
}
