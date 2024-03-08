"use client";

import { signOut } from "next-auth/react";
import { useState } from "react";
import SignInComponent from "./signIn";
import { Avatar } from "flowbite-react";
import Link from "next/link";
import { Session } from "next-auth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button, buttonVariants } from "@/components/ui/button";

export default function UserDropdown({ session }: { session: Session | null }) {
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);

  const toggleUserDropdown = () => {
    setIsUserDropdownOpen((prev) => !prev);
  };
  return (
    <div className="flex items-center">
      {session?.user?.email ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              style={{
                padding: 0,
                minWidth: "2rem",
                border: "none",
                borderRadius: "50%",
                height: "fit-content",
              }}
              className="hover:bg-transparent"
              variant="ghost"
            >
              <Avatar
                // style={{ minWidth: "2rem" }}
                // onClick={toggleUserDropdown}
                img={session?.user?.image!}
                rounded
                size={"sm"}
              />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-36">
            {process.env["NEXT_PUBLIC_ALLOWED_EMAILS"]
              ?.split(", ")
              .includes(session?.user?.email!) && (
              <DropdownMenuItem>
                <Link
                  prefetch={false}
                  href="/dashboard/products"
                  target="_blank"
                >
                  Панель адміна
                </Link>
              </DropdownMenuItem>
            )}
            <DropdownMenuSeparator />
            <DropdownMenuItem className="" onClick={() => signOut()}>
              Вийти
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <SignInComponent />
      )}
    </div>
  );
}
