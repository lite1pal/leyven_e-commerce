"use client";

import { Separator } from "@/components/ui/separator";
import { useMemo } from "react";
import { useCart } from "react-use-cart";

export default function OrderPrice({
  watchShippingType,
}: {
  watchShippingType: any;
}) {
  const { cartTotal } = useCart();

  const shippingPrice = useMemo(() => {
    if (!watchShippingType || cartTotal >= 500) {
      return 0;
    }
    return watchShippingType === "warehouse" ? 60 : 55;
  }, [watchShippingType]);

  return (
    <div className="flex flex-col gap-5 rounded-lg bg-white p-5 text-lg">
      <div className="flex justify-between">
        <div>Вартість замовлення</div>
        <div>{cartTotal}.00 UAH</div>
      </div>
      <div className="flex justify-between">
        <div>Доставка нової пошти</div>
        <div>{shippingPrice + ".00 UAH"}</div>
      </div>
      <Separator />
      <div className="flex justify-between">
        <div>Разом</div>
        <div className="">{cartTotal + shippingPrice}.00 UAH</div>
      </div>
      {cartTotal < 200 && (
        <>
          <Separator />
          <div className="text-red-600">Мінімальна сума замовлення 200грн</div>
        </>
      )}
    </div>
  );
}
