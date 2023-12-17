"use client";

import { Session } from "next-auth";
import DrawerScrollable from "./drawer";
import SearchInput from "./searchInput";
import UserDropdown from "./userDropdown";
import { CartProvider } from "react-use-cart";

export default function Icons({ session }: { session: Session | null }) {
  return (
    <div className="flex gap-5 items-center">
      <div className="max-sm:hidden">
        <SearchInput />
      </div>

      <UserDropdown session={session} />
      <DrawerScrollable />
    </div>
  );
}
