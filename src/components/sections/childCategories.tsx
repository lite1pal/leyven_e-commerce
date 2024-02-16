import { API_URL } from "@/config/api";
import { slugifyString } from "@/libs/utils";
import Link from "next/link";
import Button from "../base/Button";

export async function ChildCategories({ params }: any) {
  const res = await fetch(`${API_URL}/categories`, {
    next: { revalidate: 360 },
  });
  const data = await res.json();

  const categories = data.filter(
    (category: any) => category.parentId === params.category.split("-")[0],
  );

  return (
    <div className="flex flex-col gap-7 px-7 py-5">
      <div className="flex flex-wrap justify-center gap-5">
        {categories.map((category: any) => {
          return (
            <Link
              prefetch={false}
              key={category.categoryId}
              href={`/category/${category.categoryId}-${slugifyString(
                category.title,
              )}`}
              // className="mx-1 rounded-lg border-2 border-blue-600 bg-blue-600 p-2.5 text-center text-white transition duration-100 hover:bg-slate-50 hover:text-blue-600"
            >
              <Button title={category.title} />
              {/* {category.title} */}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
