import Catalog from "@/components/catalog";
import Categories from "@/components/sections/categories";
import CategoryHeader from "@/components/base/CategoryHeader";
import DiscountProducts from "@/components/sections/discountProducts";
import RelatedProducts from "@/components/sections/relatedProducts";
import { API_URL } from "@/config/api";
import { Suspense } from "react";
import { type Product } from "@/types";
import SectionHeader from "@/components/base/SectionHeader";
import Hero from "@/components/sections/hero";
import Testimonials from "@/components/sections/testimonials";
import CompanyLocation from "@/components/sections/companyLocation";
import FooterComponent from "@/components/sections/footer/footer";
import Link from "next/link";
import { slugifyString } from "@/libs/utils";

export default async function HomeView() {
  // gets products for the catalog
  const res = await fetch(`${API_URL}/products`, {
    cache: "no-store",
  });
  const data: Product[] = await res.json();

  return (
    <>
      <DiscountProducts header="Акційні пропозиції" />
      <RelatedProducts header="Новинки" />
      {/* <Categories /> */}
      <CategoriesTest />

      <div className="px-7 py-5">
        <SectionHeader>Вибір товарів</SectionHeader>
      </div>

      {/* <CategoryHeader title="Вибір товарів" /> */}
      <Suspense>
        <Catalog data={data.slice(0, 12)} />
        <Testimonials />
        <CompanyLocation />
        <FooterComponent />
      </Suspense>
    </>
  );
}

async function CategoriesTest() {
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
              href={`${category.categoryId}-${slugifyString(category.title)}`}
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
