import AllProductsView from "@/domains/shop/allProducts/allProducts";
import { Suspense } from "react";
import MySpinner from "@/components/base/Spinner";

export default async function AllProductsScreen() {
  return (
    <Suspense fallback={<MySpinner />}>
      <AllProductsView />
    </Suspense>
  );
}
