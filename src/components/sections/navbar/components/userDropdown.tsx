"use client";

import { Dropdown, Menu, MenuButton, MenuItem } from "@mui/joy";
import { signOut } from "next-auth/react";
import { useState } from "react";
import SignInComponent from "./signIn";
import { Avatar } from "flowbite-react";
import Link from "next/link";
import { Session } from "next-auth";

export default function UserDropdown({ session }: { session: Session | null }) {
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);

  const toggleUserDropdown = () => {
    setIsUserDropdownOpen((prev) => !prev);
  };
  return (
    <div className="flex items-center">
      {session?.user?.email ? (
        <Dropdown>
          <MenuButton
            sx={{
              padding: 0,
              minWidth: "2rem",
              border: "none",
              borderRadius: "50%",
              height: "fit-content",
            }}
          >
            <Avatar
              onClick={toggleUserDropdown}
              img={session?.user?.image!}
              rounded
              size={"sm"}
            />
          </MenuButton>
          <Menu>
            {process.env["NEXT_PUBLIC_ALLOWED_EMAILS"]
              ?.split(", ")
              .includes(session.user.email) && (
              <Link target="_blank" href="/dashboard/orders">
                <MenuItem>Панель адміна</MenuItem>
              </Link>
            )}
            <MenuItem onClick={() => signOut()}>Вийти</MenuItem>
          </Menu>
        </Dropdown>
      ) : (
        <SignInComponent />
      )}
    </div>
  );
}
