import { Suspense } from "react";
import MySpinner from "@/components/base/Spinner";
import FiltersView from "@/domains/shop/filters/filters";

export default async function FiltersScreen({ params, searchParams }: any) {
  return (
    <Suspense fallback={<MySpinner />}>
      <FiltersView {...{ params, searchParams }} />
    </Suspense>
  );
}
