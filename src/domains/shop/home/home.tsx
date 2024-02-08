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
import { ParentCategories } from "@/components/sections/parentCategories";

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
      {/* <ParentCategories /> */}

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
