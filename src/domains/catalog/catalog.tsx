import { Suspense } from "react";
import GridComponent from "../../components/grid";
import SupportDrawer from "../../components/supportDrawer";

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
import FiltersMobile from "@/components/filtersMobile";
import FooterComponent from "@/components/footer";
import RelatedProducts from "@/components/relatedProducts";

export default async function CatalogView({ data }: any) {
  return (
    <Suspense
      fallback={
        <div className="mx-auto w-fit mt-10 mb-96">
          <Spinner />
        </div>
      }
    >
      <SupportDrawer />
      <FiltersMobile />
      <Meta data={data} />

      <div className="flex">
        <Filters />
        <GridComponent data={data} />
      </div>
      <PaginationComponent data={data} />
      <Suspense>
        <RelatedProducts header="Вам може сподобатися" />
        <FooterComponent />
      </Suspense>
    </Suspense>
  );
}
