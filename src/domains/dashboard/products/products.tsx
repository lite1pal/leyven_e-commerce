import Button from "@/components/base/Button";
import FilterRadioButton from "@/components/filterRadioButton";
import { Label, TextInput } from "flowbite-react";
import { useForm } from "react-hook-form";
import PageHeader from "../components/pageHeader";
import SellIcon from "@mui/icons-material/Sell";
import FullFeaturedCrudGrid from "./components/datagridProducts";
import { API_URL } from "@/config/api";
import { type Product } from "@/types";

export default async function ProductsView() {
  const res = await fetch(`${API_URL}/products?getAll=true`, {
    cache: "no-store",
  });
  const data: Product[] = await res.json();

  return (
    <div className="flex flex-col gap-4">
      <PageHeader Icon={SellIcon}>Управління товарами</PageHeader>
      <div className="px-4">
        <FullFeaturedCrudGrid {...{ data }} />
      </div>
    </div>
  );
}
