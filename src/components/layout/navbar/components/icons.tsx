import { API_KEY, API_URL } from "@/config/api";
import CartDrawer from "../../../drawers/cart-drawer";
import UserDropdown from "./userDropdown";
import { auth } from "@/app/api/auth/[...nextauth]/auth";

export default async function Icons() {
  const session = await auth();
  let isAdmin = false;

  const res = await fetch(`${API_URL}/admin`, {
    method: "POST",
    headers: {
      "api-key": API_KEY,
    },
    body: JSON.stringify({ session }),
  });

  if (res.ok) {
    isAdmin = true;
  }

  return (
    <div className="flex items-center gap-3">
      <UserDropdown session={session} isAdmin={isAdmin} />
      <CartDrawer />
    </div>
  );
}
