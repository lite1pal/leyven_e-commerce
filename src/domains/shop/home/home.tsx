import Catalog from "@/components/catalog";
import DiscountProducts from "@/components/sections/discountProducts";
import RelatedProducts from "@/components/sections/relatedProducts";
import { API_URL } from "@/config/api";
import { Suspense } from "react";
import { type Product } from "@/types";
import SectionHeader from "@/components/base/SectionHeader";
import FooterComponent from "@/components/sections/footer/footer";
import { ParentCategories } from "@/components/sections/parentCategories";
import Testimonials from "@/components/sections/testimonials";
import AboutView from "../about/about";
import CompanyLocation from "@/components/sections/companyLocation";
import React from "react";

export default async function HomeView() {
  // gets products for the catalog
  const res = await fetch(`${API_URL}/products`, { next: { revalidate: 360 } });
  const data: Product[] = await res.json();

  return (
    <>
      <DiscountProducts header="Акційні пропозиції" />
      <RelatedProducts header="Новинки" />

      <ParentCategories />

      <div className="px-7 py-5">
        <SectionHeader>Вибір товарів</SectionHeader>
      </div>

      <Suspense>
        <Catalog data={data.slice(0, 12)} />

        <AboutView />
        <Testimonials />
        <CompanyLocation />
        <FooterComponent />
      </Suspense>
    </>
  );
}
