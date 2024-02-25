import { API_URL } from "@/config/api";
import PageHeader from "../components/pageHeader";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import DataGridOrders from "./components/datagridOrders";
import { auth } from "@/app/api/auth/[...nextauth]/auth";
import Tabs from "./components/tabs";

export default async function OrdersView() {
  const session = await auth();

  if (
    !process.env["NEXT_PUBLIC_ALLOWED_EMAILS"]
      ?.split(", ")
      .includes(session?.user?.email!)
  ) {
    return <div>ДОСТУП ДО ДАНОГО АДРЕСУ ОБМЕЖЕНИЙ</div>;
  }

  const res = await fetch(`${API_URL}/order`, {
    cache: "no-store",
  });
  const data = await res.json();

  return (
    <div className="flex w-full flex-col gap-5">
      <PageHeader Icon={ShoppingCartIcon}>Замовлення</PageHeader>
      <div className="px-4">
        <Tabs />
        <DataGridOrders {...{ data }} />
      </div>
    </div>
  );
}
