import CartDrawer from "../../../drawers/cart-drawer";
import UserDropdown from "./userDropdown";
import { auth } from "@/app/api/auth/[...nextauth]/auth";

export default async function Icons() {
  const session = await auth();

  return (
    <div className="flex items-center gap-3">
      <UserDropdown session={session} />
      <CartDrawer />
    </div>
  );
}
