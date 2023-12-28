import ProductView from "@/domains/product/product";
import { Suspense } from "react";
import { API_URL } from "@/config/api";
import { Spinner } from "flowbite-react";
import MySpinner from "@/components/base/Spinner";
import FooterComponent from "@/components/footer";
import Card from "@/components/card";
import RelatedProducts from "@/components/relatedProducts";

export default function ProductScreen({ params }: any) {
  const id = params.id;
  return (
    <Suspense fallback={<MySpinner />}>
      <ProductView id={id} />
      <Suspense>
        <RelatedProducts id={id} header={"Рекомендовані"} />
        <FooterComponent />
      </Suspense>
    </Suspense>
  );
}
