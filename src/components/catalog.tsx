import { Suspense } from "react";
import GridComponent from "./grid";
import SupportDrawer from "./supportDrawer";

import { auth } from "@/app/api/auth/[...nextauth]/auth";
import { API_URL } from "@/config/api";
import BasicBreadcrumbs from "@/components/breadCrumbs";
import Card from "@/components/card";
import PaginationComponent from "@/components/pagination";
import { Roboto } from "next/font/google";
import Meta from "@/components/meta";
import Filters from "@/components/filters";
import FiltersMobile from "@/components/filtersMobile";
import FooterComponent from "@/components/footer";
import RelatedProducts from "@/components/relatedProducts";
import MySpinner from "@/components/base/Spinner";

export default async function CatalogView({ data }: any) {
  return (
    <Suspense fallback={<MySpinner />}>
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
