"use client";

import { type Product } from "@/types";
import { PhotoProvider, PhotoView } from "react-photo-view";
import { useState } from "react";
import Image from "next/image";

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
              // width={600}
              // height={600}
              // sizes="(max-width: 768px) 40vw, (max-width: 1200px) 50vw, 75vw"
              style={{ maxHeight: "40rem" }}
              className="mx-auto h-full w-full rounded-t-lg object-contain"
              src={getCurrentImg()}
              alt={data.title + "- фото продукту Лейвен"}
            />
          </PhotoView>
          {data.images.length > 0 && data.barcode && (
            <div className="absolute left-0 top-1/2 flex w-full -translate-y-1/2 transform items-center justify-between">
              <div
                onClick={backImg}
                className={`flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-white`}
              >
                ❮
              </div>

              <div
                onClick={nextImg}
                className={`flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-white`}
              >
                ❯
              </div>
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
