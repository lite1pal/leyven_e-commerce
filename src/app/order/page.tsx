import { API_URL } from "@/config/api";
import { auth } from "../api/auth/[...nextauth]/auth";

import OrderView from "@/domains/order/order";
import Layout from "./layout";

export default async function OrderScreen() {
  const session = await auth();

  const res = await fetch(`${API_URL}/cart?email=${session?.user?.email}`, {
    next: { revalidate: 0 },
  });

  const cart = await res.json();

  return <OrderView {...{ session, cart }} />;
}
