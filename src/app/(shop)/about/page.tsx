import FooterComponent from "@/components/sections/footer/footer";
import { Card } from "flowbite-react";
import { Suspense } from "react";

export default function About() {
  return (
    <Suspense>
      <Card className="m-6 mx-auto flex min-h-screen w-full flex-col gap-5 sm:w-1/2">
        <div className="flex flex-col gap-7">
          <p className="text-center text-lg">
            Ласкаво просимо в онлайн зоомагазин &quot;Лейвен&quot; – ваш
            путівник у захопливий світ турботи та задоволення для ваших домашніх
            улюбленців!
          </p>
          <p>
            🌟 <strong>Найкращий вибір продукції для вашого улюбленця:</strong>
            <br />
            <br />У &quot;Лейвен&quot; ви знайдете широкий асортимент якісних
            кормів, ветеринарних препаратів, іграшок та аксесуарів для всіх
            видів домашніх тварин. Ми пильно обираємо та представляємо тільки
            найкращі бренди, гарантуючи здоров&#39;я та радість вашому
            улюбленцю.
          </p>
          <p>
            🚚 <strong>Швидка та надійна доставка:</strong>
            <br />
            <br />З &quot;Лейвен&quot; ви можете розраховувати на оперативну
            доставку у будь-який куточок країни.
          </p>
          <p>
            🤝 <strong>Довіра та безпека:</strong>
            <br />
            <br />
            Ми розуміємо, що ваші домашні улюбленці - це члени вашої сім&#39;ї,
            і саме тому ми ставимо на перше місце їхнє благополуччя. Усі
            продукти в нашому асортименті сертифіковані та відповідають високим
            стандартам якості.
          </p>
          <p>
            🛍️ <strong>Зручний та інтуїтивно зрозумілий інтерфейс:</strong>
            <br />
            <br />
            Наш веб-сайт розроблений з урахуванням вашого комфорту. Легкий
            пошук, чіткі фотографії та докладні описи товарів роблять ваші
            покупки легкими та приємними.
          </p>
          <p>
            👩‍⚕️ <strong>Експертна консультація:</strong>
            <br />
            <br />
            Наша команда професіоналів завжди готова допомогти вам з вибором
            найкращих товарів для вашого улюбленця. Ми розуміємо, що
            індивідуальний підхід - ключ до щасливого і здорового підопічного.
          </p>
          <p>
            Обирайте &quot;Лейвен&quot; - тут кожна покупка - це не лише товар,
            але й турбота, яка вартує вашої довіри. Даруйте вашим улюбленцям
            найкраще, обираючи нас!
          </p>
        </div>
      </Card>
      <Suspense>
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
