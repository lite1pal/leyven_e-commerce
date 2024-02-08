import { API_URL } from "@/config/api";
import { slugifyString } from "@/libs/utils";
import Link from "next/link";
import { HiHome } from "react-icons/hi";

export default async function BreadcrumbsProduct({
  categoryId,
}: {
  categoryId: string;
}) {
  const res = await fetch(`${API_URL}/category?id=${categoryId}`);
  const data = await res.json();

  const { category, parentCategory } = data;

  return (
    <div className="align-items breadcrumbs overflow-x-hidden border-b px-4 py-4 text-sm max-sm:px-5">
      <ul>
        <li>
          <Link href="/">
            <HiHome />
          </Link>
        </li>
        <li>
          <Link href="/allProducts">Товари</Link>
        </li>
        {parentCategory && (
          <li>
            <Link
              href={`/category/${parentCategory.categoryId}-${slugifyString(
                parentCategory.title,
              )}`}
            >
              {parentCategory.title}
            </Link>
          </li>
        )}
        <li>
          <Link
            href={`/category/${category.categoryId}-${slugifyString(
              category.title,
            )}`}
          >
            {category.title}
          </Link>
        </li>
      </ul>
    </div>
  );
}
