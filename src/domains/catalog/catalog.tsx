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

export default async function CatalogView() {
  // gets current session object
  const session = await auth();

  // gets products for the catalog
  const res = await fetch(`${API_URL}/products`);
  const data = await res.json();

  return (
    <>
      <SupportDrawer />
      <Suspense fallback={<Loading />}>
        <Meta data={data} />
        <div className="flex">
          <div
            style={{ marginLeft: "1rem" }}
            className="bg-white max-xl:hidden h-[10rem] w-64 shadow rounded-lg px-20 max-w-sm  border border-gray-200"
          >
            Фільтри
          </div>
          <GridComponent data={data} session={session} />
        </div>

        <PaginationComponent />
      </Suspense>
    </>
  );
}
