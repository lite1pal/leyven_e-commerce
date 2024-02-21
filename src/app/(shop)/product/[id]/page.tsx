import ProductView from "@/domains/shop/product/product";
import { Suspense } from "react";
import { API_URL } from "@/config/api";
import MySpinner from "@/components/base/Spinner";
import { Metadata } from "next";
import { type Product } from "@/types";
import { slugifyString } from "@/libs/utils";

export async function generateMetadata({
  params,
}: any): Promise<Metadata | undefined> {
  const res = await fetch(`${API_URL}/product?id=${params.id}`, {
    cache: "no-store",
  });
  const data: Product = await res.json();

  let allowIndex = true;
  let alternates = {};

  if (!data.title) {
    allowIndex = false;
  }

  if (data.title) {
    alternates = {
      canonical: `/product/${data.id}-${slugifyString(data.title)}`,
    };
  }

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
    alternates,
    robots: {
      index: allowIndex,
      follow: allowIndex,
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
