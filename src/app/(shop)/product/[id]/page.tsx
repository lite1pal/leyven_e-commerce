import ProductView from "@/domains/shop/product/product";
import { Suspense } from "react";
import { API_URL } from "@/config/api";
import { Spinner } from "flowbite-react";
import MySpinner from "@/components/base/Spinner";
import FooterComponent from "@/components/sections/footer/footer";
import Card from "@/components/cards/card";
import RelatedProducts from "@/components/sections/relatedProducts";
import { redirect } from "next/navigation";
import { slugifyString } from "@/libs/utils";
import { Metadata } from "next";
import { type Product } from "@/types";

export async function generateMetadata({
  params,
}: any): Promise<Metadata | undefined> {
  const res = await fetch(`${API_URL}/product?id=${params.id}`, {
    cache: "no-store",
  });
  const data: Product = await res.json();

  return {
    title:
      "Купити " +
      data.title +
      " в інтернет-магазині ЛейВен, - " +
      " за низькою ціною в Україні",
    description: `Купити ${data.title} в Інтернет-зоомагазині Лейвен | Найкраща ціна в Україні, Швидка доставка ⚡️`,
    keywords: data.keywords,

    openGraph: {
      title: data.title,
      description: `Купити ${data.title} в Інтернет-зоомагазині Лейвен ✅ Доступна ціна ⚡ Доставка по всій Україні`,
      images: [{ url: data.img }],
      siteName: "Leyven.com.ua",
    },
    robots: {
      index: data.title ? true : false,
      follow: data.title ? true : false,
    },
  };
}

export default function ProductScreen({ params }: any) {
  const id = params.id.split("-")[0];
  const slugishTitle = params.id.split("-").slice(1).join("-");

  return (
    <Suspense fallback={<MySpinner />}>
      <ProductView id={id} slugishTitle={slugishTitle} />
    </Suspense>
  );
}
