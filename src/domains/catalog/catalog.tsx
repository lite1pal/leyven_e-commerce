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
import Filters from "@/components/filters";

export default async function CatalogView({ data }: any) {
  return (
    <>
      <SupportDrawer />
      <Meta data={data} />

      <div className="flex">
        <Filters />
        <Suspense fallback={<Loading />}>
          <GridComponent data={data} />
        </Suspense>
      </div>
      <PaginationComponent data={data} />
    </>
  );
}
