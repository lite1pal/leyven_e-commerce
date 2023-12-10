import { Suspense } from "react";
import GridComponent from "../../components/grid";
import SupportDrawer from "../../components/supportDrawer";
import Loading from "@/app/loading";

export default async function CatalogView() {
  return (
    <>
      <SupportDrawer />
      <Suspense fallback={<Loading />}>
        <GridComponent />
      </Suspense>
    </>
  );
}
