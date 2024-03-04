import { API_URL } from "@/config/api";
import PageHeader from "../../page-header";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import DataGridOrders from "./components/datagridOrders";
import { auth } from "@/app/api/auth/[...nextauth]/auth";
import Tabs from "./components/tabs";
import { CardTitle } from "@/components/ui/card";
import { columns } from "./columns";
import { DataTable } from "./data-table";

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
    // <div className="flex w-full flex-col gap-5">
    //   <PageHeader Icon={ShoppingCartIcon}>Замовлення</PageHeader>
    //   <div className="px-4">
    //     <Tabs />
    //     <DataGridOrders {...{ data }} />
    //   </div>
    // </div>
    <div className="mx-auto py-10">
      <CardTitle className="py-3 text-3xl">Замовлення</CardTitle>
      <DataTable columns={columns} data={data} />
    </div>
  );
}
