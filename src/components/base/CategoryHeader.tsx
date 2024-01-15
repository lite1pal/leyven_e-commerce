"use client";

import { usePathname } from "next/navigation";

export default function CategoryHeader({ title }: { title: string }) {
  const pathName = usePathname();
  return (
    <div
      className={`${
        pathName === "/" && "mb-3 text-2xl"
      } px-4 py-5 font-sans text-3xl font-medium text-slate-900`}
    >
      {title}
    </div>
  );
}
