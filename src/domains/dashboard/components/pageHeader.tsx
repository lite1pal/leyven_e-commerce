"use client";

import { useRouter } from "next/navigation";
import { ReactNode } from "react";

interface IProps {
  Icon?: any;
  iconBack?: boolean;
  children: ReactNode;
}

export default function PageHeader({ Icon, iconBack, children }: IProps) {
  const router = useRouter();
  return (
    <div
      style={{ boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px" }}
      className="flex items-center gap-2 p-4 text-xl font-medium"
    >
      {Icon && (
        <div
          className="cursor-pointer"
          onClick={() => (iconBack ? router.back() : {})}
        >
          <Icon />
        </div>
      )}
      {children}
    </div>
  );
}
