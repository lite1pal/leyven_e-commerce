import { type Product } from "@/types";
import { PhotoProvider, PhotoView } from "react-photo-view";

export default function ProductImg({ data }: { data: Product }) {
  return (
    <PhotoProvider>
      <div
        // style={{ height: "40rem" }}
        className="mx-auto my-auto aspect-square h-96 max-w-lg cursor-pointer"
      >
        <PhotoView src={data.img}>
          <img
            className="mx-auto h-full w-full rounded-t-lg object-contain p-4"
            src={data.img}
            alt="product image"
          />
        </PhotoView>
      </div>
    </PhotoProvider>
  );
}
