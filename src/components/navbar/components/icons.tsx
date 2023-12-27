"use client";

import { Session } from "next-auth";
import DrawerScrollable from "./drawer";
import SearchInput from "./searchInput";
import UserDropdown from "./userDropdown";
import { CartProvider } from "react-use-cart";

export default function Icons({ session }: { session: Session | null }) {
  return (
    <div className="flex gap-3 items-center">
      <UserDropdown session={session} />
      <DrawerScrollable />
    </div>
  );
}
