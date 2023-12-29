import CardOrder from "@/components/cardOrder";
import { API_URL } from "@/config/api";
import OrdersView from "@/domains/orders/orders";
import { Suspense } from "react";

export default async function OrdersScreen() {
  return <OrdersView />;
}
