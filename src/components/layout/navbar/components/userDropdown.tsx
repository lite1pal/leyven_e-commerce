"use client";

import { signOut } from "next-auth/react";
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
import { Button } from "@/components/ui/button";

export default function UserDropdown({
  session,
  isAdmin,
}: {
  session: Session | null;
  isAdmin: boolean;
}) {
  if (!session) {
    return <SignInComponent />;
  }
  return (
    <div className="flex items-center">
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
            <Avatar img={session?.user?.image!} rounded size={"sm"} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-36">
          {isAdmin && (
            <DropdownMenuItem>
              <Link prefetch={false} href="/dashboard/products" target="_blank">
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
    </div>
  );
}
