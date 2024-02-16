import { API_URL } from "@/config/api";
import Link from "next/link";
import { slugifyString } from "@/libs/utils";
import Button from "../base/Button";

export async function ParentCategories() {
  const res = await fetch(`${API_URL}/categories`, {
    next: { revalidate: 360 },
  });
  const categories = await res.json();

  const parentCategories = categories.filter(
    (category: any) => category.parentId === null,
  );

  return (
    <div className="flex flex-col gap-7 px-7 py-5">
      {/* <SectionHeader>Категорії</SectionHeader> */}
      <div className="flex flex-wrap justify-center gap-5">
        {parentCategories.map((category: any) => {
          return (
            <Link
              prefetch={false}
              key={category.categoryId}
              href={`/category/${category.categoryId}-${slugifyString(
                category.title,
              )}`}
            >
              <Button title={category.title} />
            </Link>
          );
        })}
      </div>
    </div>
  );
}
