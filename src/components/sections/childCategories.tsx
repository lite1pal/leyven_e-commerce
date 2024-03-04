import { API_URL } from "@/config/api";
import { slugifyString } from "@/libs/utils";
import Link from "next/link";
import Button from "../Button";
import { buttonVariants } from "../ui/button";

export async function ChildCategories({ params }: any) {
  const res = await fetch(`${API_URL}/categories`, {
    next: { revalidate: 360 },
  });
  const data = await res.json();

  const categories = data.filter(
    (category: any) => category.parentId === params.category.split("-")[0],
  );

  return (
    <div className="flex flex-col gap-7 px-7  pb-8 pt-3">
      <div className="flex flex-wrap justify-center gap-3">
        {categories.map((category: any) => {
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
    </div>
  );
}
