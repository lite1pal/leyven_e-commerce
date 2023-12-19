"use client";

import { Dropdown, Menu, MenuButton, MenuItem } from "@mui/joy";
import { signOut } from "next-auth/react";
import { useState } from "react";
import SignInComponent from "./signIn";
import { Avatar } from "flowbite-react";

export default function UserDropdown({ session }: any) {
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);

  const toggleUserDropdown = () => {
    setIsUserDropdownOpen((prev) => !prev);
  };
  return (
    <>
      {session?.user.email ? (
        <Dropdown>
          <MenuButton
            sx={{
              padding: 0,
              border: "none",
              borderRadius: "50%",
              height: "fit-content",
            }}
          >
            <Avatar
              onClick={toggleUserDropdown}
              img={session?.user.image}
              rounded
              size={"sm"}
            />
          </MenuButton>
          <Menu>
            {/* <MenuItem>Історія замовлень</MenuItem>
            <MenuItem>Збережені</MenuItem> */}
            <MenuItem onClick={() => signOut()}>Вийти</MenuItem>
          </Menu>
        </Dropdown>
      ) : (
        <SignInComponent />
      )}
    </>
  );
}
