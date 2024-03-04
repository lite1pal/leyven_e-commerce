import Catalog from "@/components/catalog/catalog";
import DiscountProducts from "@/components/sections/discountProducts";
import RelatedProducts from "@/components/sections/relatedProducts";
import { API_URL } from "@/config/api";
import { Suspense } from "react";
import { type Product } from "@/types";
import SectionHeader from "@/components/section-header";
import FooterComponent from "@/components/layout/footer";
import { ParentCategories } from "@/components/sections/parentCategories";
import Testimonials from "@/components/sections/testimonials";
import CompanyLocation from "@/components/sections/companyLocation";
import React from "react";
import NewProducts from "@/components/sections/newProducts";
import AboutView from "./about/about-view";
import SectionWrapper from "@/components/section-wrapper";
import GridComponent from "@/components/catalog/grid";
import Link from "next/link";
import Button from "@/components/Button";

export default async function HomeView() {
  // gets products for the catalog
  const res = await fetch(`${API_URL}/products`, { next: { revalidate: 360 } });
  const data: Product[] = await res.json();

  return (
    <>
      {/* <DiscountProducts header="Акційні пропозиції" /> */}
      <SectionWrapper>
        <SectionHeader>Новинки</SectionHeader>
        <NewProducts />
      </SectionWrapper>

      <SectionWrapper>
        <SectionHeader>Категорії</SectionHeader>
        <ParentCategories />
      </SectionWrapper>

      <SectionWrapper>
        <SectionHeader>Вибір товарів</SectionHeader>
        {/* <Catalog data={data.slice(0, 12)} /> */}
        <GridComponent data={data.slice(0, 12)} />
        <div className="mx-auto mb-10 w-fit">
          <Link href="/allProducts">
            <Button title="Перейти до каталогу" />
          </Link>
        </div>
      </SectionWrapper>

      <SectionWrapper>
        <AboutView />
      </SectionWrapper>

      <SectionWrapper>
        <SectionHeader>Відгуки клієнтів</SectionHeader>
        <Testimonials />
      </SectionWrapper>

      <SectionWrapper>
        <SectionHeader>Місцезнаходження компанії</SectionHeader>
        <CompanyLocation />
      </SectionWrapper>
    </>
  );
}
