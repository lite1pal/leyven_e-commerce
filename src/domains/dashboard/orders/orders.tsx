import CardOrder from "@/components/cards/cardOrder";
import { API_URL } from "@/config/api";
import PageHeader from "../components/pageHeader";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import DataGridOrders from "./components/datagridOrders";

export default async function OrdersView() {
  const res = await fetch(`${API_URL}/order`, {
    cache: "no-store",
  });
  const data = await res.json();

  return (
    <div className="flex w-full flex-col gap-5">
      <PageHeader Icon={ShoppingCartIcon}>Замовлення</PageHeader>
      <div className="px-4">
        <DataGridOrders {...{ data }} />
      </div>
      {/* <FullFeaturedCrudGrid /> */}
      {/* <div className="text-sm">Кількість - {data.length}</div>
      {data.length === 0 && <div>Немає замовлень</div>}
      {data?.map((order: any, i: number) => {
        return <CardOrder key={i} data={order} />;
      })} */}
    </div>
  );
}
