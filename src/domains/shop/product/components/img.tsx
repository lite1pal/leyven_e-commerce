"use client";

import { type Product } from "@/types";
import { PhotoProvider, PhotoView } from "react-photo-view";
import { useState } from "react";

export default function ProductImg({ data }: { data: Product }) {
  const [currentImg, setCurrentImg] = useState(0);

  const getCurrentImg = () => {
    if (data.images.length > 0 && data.barcode) {
      return data.images[currentImg];
    }
    return data.img;
  };

  const backImg = () => {
    if (currentImg !== 0) {
      setCurrentImg((prev) => prev - 1);
      return;
    }
    setCurrentImg(data.images.length - 1);
  };

  const nextImg = () => {
    if (data.images.length - 1 !== currentImg) {
      setCurrentImg((prev) => prev + 1);
      return;
    }
    setCurrentImg(0);
  };

  return (
    <div className="flex h-full flex-col gap-10">
      <PhotoProvider>
        <div className="relative mx-auto aspect-square h-full w-full max-w-lg cursor-pointer">
          <PhotoView src={getCurrentImg()}>
            <img
              style={{ maxHeight: "40rem" }}
              className="mx-auto h-full w-full rounded-t-lg object-contain"
              src={getCurrentImg()}
              alt={data.title + "- фото продукту Лейвен"}
            />
          </PhotoView>
          {data.images.length > 0 && data.barcode && (
            <div className="absolute left-0 top-1/2 flex w-full -translate-y-1/2 transform items-center justify-between">
              <button
                onClick={backImg}
                type="button"
                className={`btn btn-circle btn-ghost bg-blue-600 text-white`}
              >
                ❮
              </button>

              <button
                onClick={nextImg}
                type="button"
                className={`btn btn-circle btn-ghost bg-blue-600 text-white`}
              >
                ❯
              </button>
            </div>
          )}
        </div>
      </PhotoProvider>
      {data.images.length > 0 && data.barcode && (
        <div className="flex gap-3">
          {data.images.map((img, i) => {
            return (
              <div
                key={i}
                onClick={() => setCurrentImg(i)}
                className={`${
                  currentImg === i && "rounded-lg border border-blue-600"
                } w-20`}
              >
                <img
                  className="h-full w-full rounded-lg object-contain"
                  src={img}
                  alt={img + " - картинка"}
                />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
