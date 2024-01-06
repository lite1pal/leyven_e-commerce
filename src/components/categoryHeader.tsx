"use client";

import { usePathname } from "next/navigation";

export default function CategoryHeader({ title }: { title: string }) {
  const pathName = usePathname();
  return (
    <div
      className={`${
        pathName === "/" && "mb-3 font-medium xl:ml-7"
      } ml-8 py-5 font-sans text-2xl xl:ml-10`}
    >
      {title}
    </div>
  );
}
