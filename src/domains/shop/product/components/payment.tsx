import { ReactNode } from "react";
import PaymentIcon from "@mui/icons-material/Payment";

export default function Payment() {
  return (
    <div className="flex flex-col pb-5">
      <div className="flex items-center gap-2 py-5 text-xl">
        <div className="text-blue-600">
          <PaymentIcon fontSize="small" />
        </div>
        Оплата
      </div>
      <div className="flex flex-wrap items-center gap-3">
        {paymentImages.map(({ src, alt }) => {
          return (
            <PaymentImg key={src}>
              <img src={src} alt={alt} />
            </PaymentImg>
          );
        })}
      </div>
    </div>
  );
}

const paymentImages = [
  {
    alt: "Google pay image",
    src: "https://i.citrus.world/uploads/promo/PaymentMethods/google-pay-logo.svg",
  },

  {
    alt: "Apple pay image",
    src: "https://i.citrus.world/uploads/promo/PaymentMethods/apple-pay-logo.svg",
  },
  {
    alt: "Privat24 image",
    src: "https://i.citrus.world/uploads/promo/PaymentMethods/privat-pay-logo.svg",
  },
  {
    alt: "Visa image",
    src: "https://i.citrus.world/uploads/promo/PaymentMethods/visa-card-logo.svg",
  },
  {
    alt: "MasterCard image",
    src: "https://i.citrus.world/uploads/promo/PaymentMethods/master-card-logo.svg",
  },
  {
    alt: "Monobank image",
    src: "https://i.citrus.world/uploads/promo/PaymentMethods/mono-bank-logo.svg",
  },
];

function PaymentImg({ children }: { children: ReactNode }) {
  return <div className="w-fit px-2">{children}</div>;
}
