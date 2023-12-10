import ProductView from "@/domains/product/product";
import { Suspense } from "react";
import Loading from "./loading";

export default function ProductScreen({ params }: any) {
  const id = params.id;
  return (
    <Suspense fallback={<Loading />}>
      <ProductView id={id} />
    </Suspense>
  );
}
