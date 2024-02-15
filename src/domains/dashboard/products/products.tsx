import PageHeader from "../components/pageHeader";
import SellIcon from "@mui/icons-material/Sell";
import FullFeaturedCrudGrid from "./components/datagridProducts";
import { API_URL } from "@/config/api";
import { type Product } from "@/types";
import { auth } from "@/app/api/auth/[...nextauth]/auth";

export default async function ProductsView() {
  const session = await auth();

  if (
    !process.env["NEXT_PUBLIC_ALLOWED_EMAILS"]
      ?.split(", ")
      .includes(session?.user?.email!)
  ) {
    return <div>ДОСТУП ДО ДАНОГО АДРЕСУ ОБМЕЖЕНИЙ</div>;
  }

  // const res = await fetch(
  //   `${API_URL}/productsDatagrid?filters=${params.filters}`,
  //   {
  //     cache: "no-store",
  //   },
  // );
  // const data: Product[] = await res.json();

  return (
    <div className="flex flex-col gap-4">
      <PageHeader Icon={SellIcon}>Управління товарами</PageHeader>
      <div className="px-4 ">
        <FullFeaturedCrudGrid data={[]} />
      </div>
    </div>
  );
}
