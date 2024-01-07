import FooterComponent from "@/components/sections/footer/footer";
import RelatedProducts from "@/components/sections/relatedProducts";
import { Info } from "@mui/icons-material";
import { Card } from "flowbite-react";
import { Suspense } from "react";

export default function About() {
  return (
    <Suspense>
      <Card className="m-4  mx-auto flex min-h-screen w-full flex-col gap-5 sm:w-1/2">
        <div className="flex flex-col gap-7">
          <div className="mx-auto text-xl font-bold">ЛейВен</div>
          <p>
            Ласкаво просимо до магазину {'"'}ЛейВен{'"'} – вашого надійного
            партнера у світі догляду за тваринами та ветеринарії! Ми розуміємо,
            наскільки важливі ваші сімейні улюбленці, і саме тому ми створили
            цей магазин, щоб забезпечити їхні потреби та ваш спокій.
          </p>
          <p>
            <span className="font-bold">Наш асортимент:</span> У магазині
            {'"'}ЛейВен{'"'} ви знайдете широкий вибір товарів для догляду за
            вашими тваринами. Ми спеціалізуємося на кормах від провідних
            брендів, ветеринарних засобах та аксесуарах, щоб ваші улюбленці
            почували себе щасливими та здоровими.
          </p>
          <p>
            <span className="font-bold">Програма лояльності:</span> Ми цінуємо
            наших постійних клієнтів, тому у нас діє програма лояльності, яка
            дарує вам можливість зекономити і отримати ексклюзивні пропозиції.
          </p>
          <p>
            <span className="font-bold">Доставка:</span> Зручна онлайн-доставка
            допоможе вам отримати товари, не виходячи з дому, і зекономити ваш
            час.
          </p>
          <p>
            Магазин {'"'}ЛейВен{'"'} – це місце, де ваші тварини отримають
            найкращий догляд, а ви – найкращий сервіс. Давайте разом робити
            життя ваших улюбленців яскравим і здоровим!
          </p>
        </div>
        <InfoItem
          header="Інформація про компанію"
          items={[
            ["Назва", "Лейвен"],
            [
              "Тип компанії",
              "Торгова компанія, Компанія, що надає послуги, Дистриб'ютор / Реселер, Представництво, Продаж б/у товарів, сток",
            ],
          ]}
        />
        <InfoItem
          header="Організаційно-правова форма та капітал"
          items={[
            ["Рік заснування", "2023"],
            [
              "Організаційно-правова форма",
              "Суб'єкт підприємницької діяльності",
            ],
          ]}
        />
        <InfoItem
          header="Ринкова діяльність"
          items={[
            ["Обсяги продажів за рік", "До 50 тис. USD"],
            ["Обсяги покупок за рік", "До 50 тис. USD"],
          ]}
        />
        <InfoItem
          header="Інформація про виробництво"
          items={[
            [
              "Сертифікати відповідності",
              "ISO 9000/9001/9004/19011: 2000, ISO 14000/14001, ISO/TS 16949, ISO 17799, ISO 22000, HACCP, TL9000, SA8000, QS-9000, OHSAS 18001, Інші",
            ],
          ]}
        />
      </Card>
      <Suspense>
        {/* <RelatedProducts header={"Ви переглядали"} /> */}
        <FooterComponent />
      </Suspense>
    </Suspense>
  );
}

function InfoItem({ header, items }: { header: string; items: any }) {
  return (
    <div className="mt-5 flex flex-col gap-3">
      <div className="text-lg font-medium">{header}</div>
      {items.map((item: any, i: number) => {
        return (
          <div key={i} className="flex flex-col gap-1.5">
            <div className="flex gap-10">
              <div className="w-1/3 font-bold">{item[0]}:</div>
              <div className="w-2/3">{item[1]}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
