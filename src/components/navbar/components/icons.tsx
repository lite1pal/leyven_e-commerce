import { Session } from "next-auth";
import DrawerScrollable from "./drawer";
import SearchInput from "./searchInput";
import UserDropdown from "./userDropdown";
import { CartProvider } from "react-use-cart";
import { auth } from "@/app/api/auth/[...nextauth]/auth";

export default async function Icons() {
  const session = await auth();

  return (
    <div className="flex items-center gap-3">
      <UserDropdown session={session} />
      <DrawerScrollable />
    </div>
  );
}
