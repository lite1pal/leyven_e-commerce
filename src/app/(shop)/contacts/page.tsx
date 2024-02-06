import MySpinner from "@/components/base/Spinner";
import FooterComponent from "@/components/sections/footer/footer";
import RelatedProducts from "@/components/sections/relatedProducts";
import { Card } from "flowbite-react";
import { Suspense } from "react";

export default function Contacts() {
  return (
    <Suspense>
      <Card className="m-4 mx-auto mb-24 flex w-full flex-col gap-5 sm:w-1/2">
        <div className="mx-auto text-xl font-bold">Контакти</div>

        <p>
          Адреса:{" "}
          <span className="font-medium text-blue-600">
            вул. Чернявського, 46, Звягель, Україна
          </span>
        </p>

        <p>
          Телефон:{" "}
          <span className="font-medium text-blue-600">+380 (50) 598-74-77</span>
        </p>

        <p>
          Менеджер магазину:{" "}
          <a
            href="mailto:leyvenzoo@gmail.com"
            className="font-medium text-blue-600"
          >
            leyvenzoo@gmail.com
          </a>
        </p>

        <p>
          Веб-сайт:{" "}
          <a
            href="http://www.leyven.com.ua"
            className="font-medium text-blue-600"
          >
            www.leyven.com.ua
          </a>
        </p>
      </Card>
      <Suspense fallback={<MySpinner />}>
        {/* <RelatedProducts header="Рекомендовані" /> */}
        <FooterComponent />
      </Suspense>
    </Suspense>
  );
}
