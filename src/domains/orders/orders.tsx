import CardOrder from "@/components/cardOrder";
import { API_URL } from "@/config/api";

export default async function OrdersView() {
  //   const res = await fetch(`${API_URL}/order`, {
  //     cache: "no-store",
  //   });
  //   const data = await res.json();

  return (
    <div className="flex w-full flex-col gap-5 px-2">
      <div className="text-xl font-medium ">Замовлення</div>
      <div className="text-sm">Кількість - {data.length}</div>
      {/* {data.length === 0 && <div>Немає замовлень</div>}
      {data?.map((order: any, i: number) => {
        return <CardOrder key={i} data={order} />;
      })} */}
    </div>
  );
}
