"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";

interface IProps {
  Icon?: any;
  iconBack?: boolean;
  children: ReactNode;
}

export default function PageHeader({ Icon, iconBack, children }: IProps) {
  return (
    <div className="flex items-center gap-2 border-b border-l border-gray-500 border-opacity-20 bg-gray-100 p-3 text-xl text-slate-900">
      {Icon && (
        <Link href="/dashboard/products" className="cursor-pointer">
          <Icon fontSize="small" />
        </Link>
      )}
      {children}
    </div>
  );
}
