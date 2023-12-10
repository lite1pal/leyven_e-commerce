import GridComponent from "@/domains/catalog/components/grid";
import SupportDrawer from "@/layout_components/supportDrawer";
import { Suspense } from "react";

export default async function CatalogView({ session }: any) {
  return (
    <>
      <SupportDrawer />

      <GridComponent session={session} />
    </>
  );
}
