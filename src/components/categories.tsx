"use client";

import { categories } from "@/data/categories";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function Categories() {
  const params: any = useParams();
  const mainCategories = Object.keys(categories);
  const subCategories = params.category
    ? Object.keys(categories[params.category].subCategories)
    : [];
  return (
    <div className="flex flex-wrap justify-center gap-5 pt-5">
      {params.category
        ? subCategories.map((category, i) => {
            return (
              <Link
                key={i}
                className="rounded-lg border-2 p-2.5"
                href={categories[params.category].subCategories[category].route}
              >
                {categories[params.category].subCategories[category].name}
              </Link>
            );
          })
        : mainCategories.map((category, i) => {
            return (
              <Link
                key={i}
                className="rounded-lg border-2 p-2.5"
                href={categories[category].route}
              >
                {categories[category].name}
              </Link>
            );
          })}
    </div>
  );
}
