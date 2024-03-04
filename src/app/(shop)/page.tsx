import { Suspense } from "react";
import HomeView from "@/app/(shop)/home-view";
import SkeletonHorizontalProducts from "@/components/base/Skeleton";
import Hero from "@/components/sections/hero";

export async function generateMetadata() {
  return {
    title: `Інтернет-зоомагазин Лейвен - Купити Товари для Тварин Онлайн: ✅ Ціни, ✅ Продаж, ✅ Відгуки`,
    description: `Дізнайтеся про широкий вибір якісних товарів для тварин в інтернет-зоомагазині Лейвен. Купуйте онлайн зручно та швидко. Низькі ціни, акції, та висока якість обслуговування. Перегляньте відгуки клієнтів та зробіть свій вибір для здоров'я та комфорту вашого улюбленця.`,
    openGraph: {
      title: "Інтернет-зоомагазин Лейвен ✅",
      description: `Дізнайтеся про широкий вибір якісних товарів для тварин в інтернет-зоомагазині Лейвен. Купуйте онлайн зручно та швидко. Низькі ціни, акції, та висока якість обслуговування.`,
      images: [
        { url: "https://images.prom.ua/4809555867_w200_h50_lejven.jpg" },
      ],
    },
  };
}

export default async function HomeScreen() {
  return (
    <>
      <Hero />

      <Suspense fallback={<SkeletonHorizontalProducts />}>
        <HomeView />
      </Suspense>
    </>
  );
}
