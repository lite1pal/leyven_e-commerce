"use client";

import { categories } from "@/data/categories";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

export default function Categories() {
  const pathName = usePathname();
  const params: any = useParams();
  const mainCategories = Object.keys(categories);
  const subCategories = params.category
    ? Object.keys(categories[params.category].subCategories)
    : [];

  return (
    <div className={`${pathName === "/" && "flex flex-col gap-7 px-7 py-5"}`}>
      {pathName === "/" && (
        <div className="text-2xl font-medium">Категорії</div>
      )}

      <div className="flex flex-wrap justify-center gap-5 pt-5">
        {params.category &&
          !params.subCategory &&
          subCategories.map((category, i) => {
            return (
              <Link
                key={i}
                className="mx-1 rounded-lg border-2 p-2.5 text-center transition duration-100 hover:text-blue-600"
                href={categories[params.category].subCategories[category].route}
              >
                {categories[params.category].subCategories[category].name}
              </Link>
            );
          })}

        {!params.category &&
          mainCategories.map((category, i) => {
            return (
              <Link
                key={i}
                className="mx-1 rounded-lg border-2 p-2.5 text-center transition duration-100 hover:text-blue-600"
                href={categories[category].route}
              >
                {categories[category].name}
              </Link>
            );
          })}

        {/* {params.category
        ? subCategories.map((category, i) => {
            return (
              <Link
                key={i}
                className="mx-1 rounded-lg border-2 p-2.5 text-center transition duration-100 hover:text-blue-600"
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
                className="mx-1 rounded-lg border-2 p-2.5 text-center transition duration-100 hover:text-blue-600"
                href={categories[category].route}
              >
                {categories[category].name}
              </Link>
            );
          })} */}
      </div>
    </div>
  );
}
