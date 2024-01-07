import ProductView from "@/domains/shop/product/product";
import { Suspense } from "react";
import { API_URL } from "@/config/api";
import { Spinner } from "flowbite-react";
import MySpinner from "@/components/base/Spinner";
import FooterComponent from "@/components/footer";
import Card from "@/components/card";
import RelatedProducts from "@/components/relatedProducts";

export async function generateMetadata({ params }: any) {
  const res = await fetch(`${API_URL}/product?id=${params.id}`, {
    cache: "no-store",
  });
  const data = await res.json();

  return {
    title:
      "Купити " +
      data.title +
      " в інтернет-магазині ЛейВен, - " +
      data.title +
      " за низькою ціною в Києві, Харкові, Дніпрі, Одесі, Запоріжжі, Львові, Звягелі, Україні - " +
      "фото, продаж, характеристики",
    description: `Замовте найкращий ${data.title} в інтернет-зоомагазині Лейвен. Висока якість і збалансований склад. Низька ціна, швидка доставка та задоволені відгуки клієнтів. Зробіть вашого кота щасливим і здоровим сьогодні!`,
    openGraph: {
      title: data.title,
      description: `Купити ${data.title} в Інтернет-зоомагазині ЛейВен ✅ Доступна ціна ✅ Відгуки покупців ⚡ Доставка по всій Україні`,
      images: [{ url: data.img, width: 800, height: 600 }],
    },
  };
}

export default function ProductScreen({ params }: any) {
  const id = params.id;
  return (
    <Suspense fallback={<MySpinner />}>
      <ProductView id={id} />
      <Suspense>
        <RelatedProducts id={id} header={"Рекомендовані"} />
        <FooterComponent />
      </Suspense>
    </Suspense>
  );
}
