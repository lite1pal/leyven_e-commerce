import EditProductView from "@/app/(dashboard)/dashboard/products/edit/[id]/edit-view";
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
