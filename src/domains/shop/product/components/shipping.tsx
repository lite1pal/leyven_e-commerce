import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import DomainIcon from "@mui/icons-material/Domain";
import Link from "next/link";

export default function Shipping() {
  return (
    <div className="flex flex-col">
      <div className="mb-6 flex items-center gap-2 pt-5 text-xl">
        <div className="text-blue-600">
          <LocalShippingIcon fontSize="small" />
        </div>
        Доставка{" "}
        <span className="text-sm text-slate-600">(безкоштовна від 500грн)</span>
      </div>
      <div className="flex flex-col gap-5 text-sm">
        <div className="flex gap-2">
          <div>
            <DomainIcon />
          </div>
          <div>
            <div>Самовивіз з нашого складу у Звягелі</div>
            <Link
              target="_blank"
              href="https://www.google.com/maps?ll=50.594764,27.598927&z=15&t=m&hl=uk&gl=US&mapclient=embed&q=50%C2%B035%2741.2%22N+27%C2%B035%2756.1%22E+50.594778,+27.598917@50.5947778,27.5989167"
              className="text-xs text-blue-600"
            >
              Дивитися на мапі
            </Link>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="w-6">
            <img
              className="rounded-full"
              src="data:image/png;base64,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"
              alt="Nova poshta image"
            />
          </div>
          <div>
            <div>Вiддiлення Нова пошта</div>
            {/* <Link href="/" className="text-xs text-blue-600">
              Дивитися на мапі
            </Link> */}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="w-6">
            <img
              className="rounded-full"
              src="data:image/png;base64,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"
              alt="Nova poshta image"
            />
          </div>
          <div>
            <div>Поштомат Нова пошта</div>
            {/* <Link href="/" className="text-xs text-blue-600">
              Дивитися на мапі
            </Link> */}
          </div>
        </div>

        {/* <div className="flex items-center gap-2">
          <div className="w-6">
            <img
              className="rounded-full"
              src="https://www.ukrposhta.ua/uploads/files/shares/pin_2.png"
              alt="Ukr poshta image"
            />
          </div>
          <div>
            <div>Відділення Укрпошта</div>
          </div>
        </div> */}
      </div>
    </div>
  );
}
