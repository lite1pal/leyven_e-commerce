import FooterComponent from "@/components/sections/footer/footer";
import Payment, {
  PaymentImg,
  paymentImages,
} from "@/domains/shop/product/components/payment";
import { Card } from "flowbite-react";
import { Suspense } from "react";

export default function PaymentAndShipping() {
  return (
    <>
      <Card className="m-6 mx-auto flex min-h-screen w-full flex-col gap-5 sm:w-1/2">
        <div className="flex flex-col gap-7">
          <p className="text-center text-lg">
            <strong>Оплата і доставка</strong>
          </p>
          <p>
            🚚 <strong>Швидка та надійна доставка:</strong>
            <br />
            <br />
            Ми гарантуємо оперативну доставку вашого замовлення до вказаної
            адреси в найкоротший термін. Час доставки може змінюватися в
            залежності від вашого регіону проживання.
          </p>
          <p>
            💳 <strong>Зручні способи оплати:</strong>
            <br />
            <br />
            Ми пропонуємо широкий вибір способів оплати, включаючи:
            <br />
            <br />
            - Оплата готівкою при отриманні (післяплата)
            <br />
            - Оплата банківською картою онлайн
            <br />
            <div className="mt-5 flex flex-wrap items-center gap-3">
              {paymentImages.map(({ src, alt }) => {
                return (
                  <PaymentImg key={src}>
                    <img src={src} alt={alt} />
                  </PaymentImg>
                );
              })}
            </div>
            {/* - Електронні гроші (наприклад, PayPal)
          <br />- Безготівковий розрахунок для корпоративних клієнтів */}
          </p>
          <p>
            📦 <strong>Умови доставки:</strong>
            <br />
            <br />
            Ми надаємо безкоштовну доставку для замовлень понад суму{" "}
            <span className="font-medium text-blue-600">500 грн</span>.
            <br />
            Для замовлень нижче цієї суми, діють стандартні тарифи доставки.
          </p>
          <p>
            📞 <strong>Служба підтримки клієнтів:</strong>
            <br />
            <br />
            Наша служба підтримки клієнтів доступна для вас 24/7. Якщо у вас є
            питання щодо оплати, доставки або будь-яких інших питань, будь
            ласка, звертайтеся до нас за наступними контактними даними:
            <br />
            <br />
            Телефон:{" "}
            <span className="font-medium text-blue-600">
              +380 (50) 598-74-77
            </span>
            <br />
            Електронна пошта:{" "}
            <span className="font-medium text-blue-600">
              leyvenzoo@gmail.com
            </span>
          </p>
          <p>
            Ми робимо все можливе, щоб ваші покупки в &quot;Лейвен&quot; були
            максимально зручними та приємними. Дякуємо, що обрали нас!
          </p>
        </div>
      </Card>
      <Suspense>
        <FooterComponent />
      </Suspense>
    </>
  );
}
