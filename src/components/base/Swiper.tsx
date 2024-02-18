"use client";

// import Swiper core and required modules
import { Navigation, Scrollbar, A11y } from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { ReactNode } from "react";
import { type Product } from "@/types";
import Card from "../cards/card";

type Props = {
  data: Product[];
  type: "catalog" | any;
  children?: ReactNode;
};

export default function SwiperComponent({ data, type, children }: Props) {
  return (
    <Swiper
      // install Swiper modules
      modules={[Navigation, Scrollbar, A11y]}
      slidesPerView={"auto"}
      spaceBetween={15}
      navigation
      scrollbar={{ draggable: true }}
    >
      {data.slice(0, 10).map((product: any) => {
        return (
          <SwiperSlide key={product.id} style={{ width: "auto" }}>
            <Card type={type} data={product} />
          </SwiperSlide>
        );
      })}
      {children}
      ...
    </Swiper>
  );
}
