import { Card, CardContent } from "@mui/joy";
import { useCart } from "react-use-cart";
import ProductAvailability from "../../product/[id]/components/availability";

export default function OrderProducts() {
  const { items } = useCart();

  return (
    <div
      style={{ maxHeight: "16rem" }}
      className="flex h-fit w-full flex-col gap-3 overflow-y-scroll rounded-lg bg-white p-5"
    >
      {items.map((cartProduct: any) => {
        return (
          <Card
            key={cartProduct.id}
            orientation="horizontal"
            variant="outlined"
            sx={{
              width: "100%",
              backgroundColor: "white",
              border: "none",
            }}
          >
            <div className="h-16 w-16 overflow-hidden">
              <img
                className={`h-full w-full object-contain`}
                src={cartProduct.img}
                loading="lazy"
                alt={cartProduct.title + "картинка"}
              />
            </div>

            <CardContent>
              <div className="cursor-pointer font-medium">
                {cartProduct.title}
              </div>

              <div className="flex items-center gap-10">
                <span className="text-lg font-medium text-slate-700 dark:text-white max-sm:text-sm">
                  {cartProduct.itemTotal}.00 UAH
                </span>
                <div className="hidden gap-2 text-xs text-slate-400 sm:flex">
                  Артикул: {cartProduct.artycul}
                </div>
              </div>
              <ProductAvailability data={cartProduct} />
              <div className="text-xs">{cartProduct.quantity} шт.</div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
