import { API_URL } from "@/config/api";
import Catalog from "@/components/catalog/catalog";
import { type Product } from "@/types";
import { ParentCategories } from "@/components/sections/parentCategories";
import SectionWrapper from "@/components/section-wrapper";
import SectionHeader from "@/components/section-header";

export default async function AllProductsView() {
  // gets products for the catalog
  const res = await fetch(`${API_URL}/products`, { next: { revalidate: 360 } });
  const data: Product[] = await res.json();
  return (
    <>
      <SectionWrapper>
        <ParentCategories />
      </SectionWrapper>
      <div className={`px-4 font-sans text-3xl font-medium text-slate-900`}>
        Каталог
      </div>
      <Catalog {...{ data }} />
    </>
  );
}
