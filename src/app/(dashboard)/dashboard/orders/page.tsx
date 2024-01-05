import MySpinner from "@/components/base/Spinner";
import CardOrder from "@/components/cardOrder";
import { API_URL } from "@/config/api";
import OrdersView from "@/domains/dashboard/orders/orders";
import { Suspense } from "react";

export default async function OrdersScreen() {
  return (
    <Suspense fallback={<MySpinner />}>
      <OrdersView />
    </Suspense>
  );
}
