import { API_URL } from "@/config/api";
import Link from "next/link";
import { slugifyString } from "@/libs/utils";
import Button from "../Button";
import { buttonVariants } from "../ui/button";

export async function ParentCategories() {
  const res = await fetch(`${API_URL}/categories`, {
    next: { revalidate: 360 },
  });
  const categories = await res.json();

  const parentCategories = categories.filter(
    (category: any) => category.parentId === null,
  );

  return (
    <div className="flex flex-wrap justify-center gap-5">
      {parentCategories.map((category: any) => {
        return (
          <Link
            className={buttonVariants({ variant: "outline" })}
            prefetch={false}
            key={category.categoryId}
            href={`/category/${category.categoryId}-${slugifyString(
              category.title,
            )}`}
          >
            {category.title}
          </Link>
        );
      })}
    </div>
  );
}
