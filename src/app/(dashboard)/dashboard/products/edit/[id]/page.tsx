import EditProductView from "@/domains/dashboard/products/edit/edit";
import { Suspense } from "react";

export default function EditProductScreen({ params }: any) {
  const id = params.id;
  return (
    <Suspense>
      <EditProductView {...{ id }} />
    </Suspense>
  );
}
