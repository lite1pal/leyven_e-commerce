import Button from "@/components/base/Button";
import FilterRadioButton from "@/components/filterRadioButton";
import { Label, TextInput } from "flowbite-react";
import { useForm } from "react-hook-form";
import PageHeader from "../components/pageHeader";
import SellIcon from "@mui/icons-material/Sell";
import FullFeaturedCrudGrid from "./components/datagridProducts";
import { API_URL } from "@/config/api";

export default async function ProductsView() {
  const res = await fetch(`${API_URL}/products?getAll=true`, {
    cache: "no-store",
  });
  const data = await res.json();

  return (
    <div className="flex flex-col gap-4">
      <PageHeader Icon={SellIcon}>Управління товарами</PageHeader>
      <div className="px-4">
        <FullFeaturedCrudGrid {...{ data }} />
      </div>
      {/* <div className=" mt-5 flex w-full flex-col gap-3">
        <div className="text-lg font-medium">Додати товар</div>
        <div className="mb-6 flex max-w-2xl flex-col gap-4">
          <div>
            <div className="mb-2 block">
              <Label htmlFor="title" value="Назва товару" />
            </div>
            <TextInput
              id="title"
              type="text"
              required
              shadow
              {...register("title", {
                required: true,
              })}
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="price" value="Ціна товару" />
            </div>
            <TextInput
              className="w-fit"
              id="price"
              type="text"
              shadow
              {...register("price")}
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="img" value="Посилання на картинку" />
            </div>
            <TextInput id="img" type="text" shadow {...register("img")} />
          </div>
          <FilterRadioButton header={"В наявності"} labels={["Так", "Ні"]} />
        </div>
        <Button title="Додати" />
      </div> */}
    </div>
  );
}
