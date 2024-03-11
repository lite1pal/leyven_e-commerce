import FormOrder from "./order-form";

export default function OrderView() {
  return (
    <div className="flex flex-col gap-3 px-2">
      <div className="py-5 pb-3 text-2xl font-medium">
        Оформлення замовлення
      </div>
      <FormOrder />
    </div>
  );
}
