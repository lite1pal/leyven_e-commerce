import PageHeader from "../../page-header";
import SellIcon from "@mui/icons-material/Sell";
import FullFeaturedCrudGrid from "./components/datagridProducts";

import { auth } from "@/app/api/auth/[...nextauth]/auth";
import { CardTitle } from "@/components/ui/card";

export default async function ProductsView() {
  const session = await auth();

  if (
    !process.env["NEXT_PUBLIC_ALLOWED_EMAILS"]
      ?.split(", ")
      .includes(session?.user?.email!)
  ) {
    return <div>ДОСТУП ДО ДАНОГО АДРЕСУ ОБМЕЖЕНИЙ</div>;
  }

  return (
    <div className="mx-auto py-10">
      <CardTitle className="py-3 text-3xl">Управління товарами</CardTitle>
      <FullFeaturedCrudGrid />
    </div>
  );
}
