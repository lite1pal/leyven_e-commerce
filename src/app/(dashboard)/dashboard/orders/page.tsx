import MySpinner from "@/components/base/Spinner";
import OrdersView from "@/app/(dashboard)/dashboard/orders/orders-view";
import { Suspense } from "react";

export default async function OrdersScreen() {
  return (
    <Suspense fallback={<MySpinner />}>
      <OrdersView />
    </Suspense>
  );
}
