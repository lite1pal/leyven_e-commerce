import MySpinner from "@/components/base/Spinner";
import FooterComponent from "@/components/footer";
import RelatedProducts from "@/components/relatedProducts";
import { Card } from "flowbite-react";
import { Suspense } from "react";

export default function Contacts() {
  return (
    <Suspense>
      <Card className="m-4 mx-auto mb-52 flex w-full flex-col gap-5 sm:w-1/2">
        <div className="mx-auto text-xl font-bold">Контакти</div>

        <p>Адреса: вул. Чернявського, 46, Звягель, Україна</p>

        <p>Телефон: +380 (50) 598-74-77</p>

        <p>
          Менеджер магазину:{" "}
          <a href="mailto:leyvenzoo@gmail.com">leyvenzoo@gmail.com</a>
        </p>

        <p>
          Веб-сайт: <a href="http://leyven.com.ua/ua">leyven.com.ua/ua</a>
        </p>
      </Card>
      <Suspense fallback={<MySpinner />}>
        {/* <RelatedProducts header="Рекомендовані" /> */}
        <FooterComponent />
      </Suspense>
    </Suspense>
  );
}
