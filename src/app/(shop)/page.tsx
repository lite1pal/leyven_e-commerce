import Catalog from "../../components/catalog";
import CarouselComponent from "@/components/carousel";
import { auth } from "../api/auth/[...nextauth]/auth";
import { API_URL } from "@/config/api";
import BasicBreadcrumbs from "@/components/breadCrumbs";
import CategoryHeader from "@/components/categoryHeader";
import { revalidatePath } from "next/cache";
import { Suspense } from "react";
import { products } from "@/data";
import RelatedProducts from "@/components/relatedProducts";
import { Toaster } from "react-hot-toast";
import HomeView from "@/domains/shop/home/home";
import MySpinner from "@/components/base/Spinner";
import SkeletonHorizontalProducts from "@/components/base/Skeleton";

export async function generateMetadata({ params }: any) {
  return {
    title: `Інтернет зоомагазин Лейвен - Купити Товари для Тварин Онлайн: ✅ Ціни, ✅ Продаж, ✅ Відгуки`,
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
    <Suspense fallback={<SkeletonHorizontalProducts />}>
      <HomeView />
    </Suspense>
  );
}
