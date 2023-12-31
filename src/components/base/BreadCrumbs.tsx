"use client";

import { categories } from "@/data/categories";
import { type Product } from "@/types";
import { Breadcrumb } from "flowbite-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useMemo } from "react";
import { HiHome } from "react-icons/hi";

export default function BasicBreadcrumbs({ data }: { data?: Product }) {
  const params: any = useParams();

  function capitalizeFirstLetter(string: string) {
    if (!string) {
      return "";
    }
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const breadcrumbs = useMemo((): string[] => {
    if (data && params.id) {
      return params.id ? data.breadcrumbs.split(" > ") : [""];
    }
    return [""];
  }, [data]);

  return (
    <Breadcrumb
      className="max-w-screen overflow-x-scroll px-7 py-6 max-sm:px-5"
      aria-label="Default breadcrumb example"
    >
      <Breadcrumb.Item>
        <Link href="/">
          <HiHome />
        </Link>
      </Breadcrumb.Item>
      <Breadcrumb.Item className="whitespace-nowrap" href="#">
        <Link
          className="transition duration-100 hover:text-blue-600"
          href={"/allProducts"}
        >
          Товари
        </Link>
      </Breadcrumb.Item>

      {params.category && (
        <Breadcrumb.Item className="whitespace-nowrap" href="#">
          <Link
            className="transition duration-100 hover:text-blue-600"
            href={categories[params.category as string].route}
          >
            {categories[params.category as string].name}
          </Link>
        </Breadcrumb.Item>
      )}

      {params.subCategory && (
        <Breadcrumb.Item className="whitespace-nowrap" href="#">
          <Link
            className="transition duration-100 hover:text-blue-600"
            href={
              categories[params.category].subCategories[params.subCategory]
                .route
            }
          >
            {categories[params.category].subCategories[params.subCategory].name}
          </Link>
        </Breadcrumb.Item>
      )}

      {params.id && (
        <Breadcrumb.Item className="whitespace-nowrap" href="#">
          <Link
            href="/"
            className="transition duration-100 hover:text-blue-600"
          >
            {capitalizeFirstLetter(breadcrumbs[2])}
          </Link>
        </Breadcrumb.Item>
      )}
      {params.id && (
        <Breadcrumb.Item className="whitespace-nowrap" href="#">
          <Link
            href="/"
            className="transition duration-100 hover:text-blue-600"
          >
            {capitalizeFirstLetter(breadcrumbs[3])}
          </Link>
        </Breadcrumb.Item>
      )}
    </Breadcrumb>
  );
}
