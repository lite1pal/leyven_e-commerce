import AllProductsView from "@/app/(shop)/allProducts/allProducts-view";
import { Suspense } from "react";
import MySpinner from "@/components/base/Spinner";

export async function generateMetadata() {
  return {
    title: `Каталог Інтернет-зоомагазину Лейвен - Купити Товари для Тварин Онлайн: Ціни, Продаж, Відгуки`,
    description: `Дізнайтеся про широкий вибір якісних товарів для тварин в інтернет-зоомагазині Лейвен. Купуйте онлайн зручно та швидко. Низькі ціни, акції, та висока якість обслуговування. Перегляньте відгуки клієнтів та зробіть свій вибір для здоров'я та комфорту вашого улюбленця.`,
  };
}

export default async function AllProductsScreen() {
  return (
    <Suspense fallback={<MySpinner />}>
      <AllProductsView />
    </Suspense>
  );
}
