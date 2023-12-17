import { API_URL } from "@/config/api";
import { auth } from "../api/auth/[...nextauth]/auth";

import OrderView from "@/domains/order/order";

export default async function OrderScreen() {
  const session = await auth();

  return <OrderView {...{ session }} />;
}
