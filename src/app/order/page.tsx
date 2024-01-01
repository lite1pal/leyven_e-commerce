import { API_URL } from "@/config/api";
import { auth } from "../api/auth/[...nextauth]/auth";

import OrderView from "@/domains/order/order";
import { Toaster } from "react-hot-toast";

export default async function OrderScreen() {
  const session = await auth();

  return <OrderView {...{ session }} />;
}
