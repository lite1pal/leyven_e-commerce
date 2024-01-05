import MySpinner from "@/components/base/Spinner";
import ProductsView from "@/domains/dashboard/products/products";
import { Suspense } from "react";

export default function ProductsScreen() {
  return (
    <Suspense fallback={<MySpinner />}>
      <ProductsView />
    </Suspense>
  );
}
