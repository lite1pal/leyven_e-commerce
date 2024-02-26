import EditProductView from "@/domains/dashboard/products/edit/edit";
import { Suspense } from "react";

export const dynamic = "force-dynamic";

export default function EditProductScreen({ params }: any) {
  const id = params.id;
  return (
    <Suspense>
      <EditProductView {...{ id }} />
    </Suspense>
  );
}
