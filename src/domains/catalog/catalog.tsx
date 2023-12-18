import { Suspense } from "react";
import GridComponent from "../../components/grid";
import SupportDrawer from "../../components/supportDrawer";

import Loading from "@/app/loading";
import { auth } from "@/app/api/auth/[...nextauth]/auth";
import { API_URL } from "@/config/api";
import BasicBreadcrumbs from "@/components/breadCrumbs";
import Card from "@/components/card";
import PaginationComponent from "@/components/pagination";
import { Roboto } from "next/font/google";
import Meta from "@/components/meta";
import { Grid } from "@mui/joy";
import FilterRadioButton from "@/components/filterRadioButton";
import SwitchAvailability from "@/components/switchAvailability";
import RangeSlider from "@/components/rangeSlider";
import { convertXMLtoJSON } from "../../libs/utils";
import CategoryHeader from "@/components/categoryHeader";
import LoadMore from "@/components/loadMore";
import { Spinner } from "flowbite-react";

export default async function CatalogView({ data }: any) {
  return (
    <>
      <SupportDrawer />
      <Meta data={data} />

      <div className="flex">
        <div
          style={{ marginLeft: "1rem" }}
          className="bg-white flex flex-col gap-4 max-xl:hidden h-fit p-5 shadow rounded-lg px-20 max-w-sm  border border-gray-200"
        >
          <FilterRadioButton
            header="Тварина"
            labels={["Собака", "Кіт", "Кінь"]}
          />
          <FilterRadioButton
            header="Розмір"
            labels={["Маленький", "Середній", "Великий"]}
          />
          <FilterRadioButton
            header="Країна виробник"
            labels={["Україна", "Норвегія", "Польша", "Франція"]}
          />
          <FilterRadioButton
            header="Ціна"
            labels={[
              "Менше 50грн",
              "від 50 до 250грн",
              "від 250 до 1000грн",
              "від 1000грн",
            ]}
          />
          <FilterRadioButton
            header="Рейтинг від покупців"
            labels={["5 зірок", "4 зірки", "3 зірки", "2 зірки і менше"]}
          />

          <SwitchAvailability />
        </div>

        <Suspense fallback={<Loading />}>
          <GridComponent data={data} />
        </Suspense>
      </div>
      <PaginationComponent />
    </>
  );
}
