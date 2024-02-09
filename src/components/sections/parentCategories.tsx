import { API_URL } from "@/config/api";
import SectionHeader from "../base/SectionHeader";
import Link from "next/link";
import { slugifyString } from "@/libs/utils";

export async function ParentCategories() {
  const res = await fetch(`${API_URL}/categories`);
  const categories = await res.json();

  const parentCategories = categories.filter(
    (category: any) => category.parentId === null,
  );

  return (
    <div className="flex flex-col gap-7 px-7 py-5">
      <SectionHeader>Категорії</SectionHeader>
      <div className="flex flex-wrap justify-center gap-5">
        {parentCategories.map((category: any) => {
          return (
            <Link
              key={category.categoryId}
              href={`/category/${category.categoryId}-${slugifyString(
                category.title,
              )}`}
              className="mx-1 rounded-lg border-2 border-blue-600 bg-blue-600 p-2.5 text-center text-white transition duration-100 hover:bg-slate-50 hover:text-blue-600"
            >
              {category.title}
            </Link>
          );
        })}
      </div>
    </div>
  );
}