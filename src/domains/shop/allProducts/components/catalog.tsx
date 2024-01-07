"use client";

import { Suspense } from "react";
import GridComponent from "./grid";
import SupportDrawer from "../../../../components/drawers/supportDrawer";
import PaginationComponent from "@/domains/shop/allProducts/components/pagination";
import Meta from "@/domains/shop/allProducts/components/meta";
import Filters from "@/domains/shop/allProducts/components/filters";
import FiltersMobile from "@/domains/shop/allProducts/components/filtersMobile";
import FooterComponent from "@/components/sections/footer/footer";
import Button from "../../../../components/base/Button";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import CompanyLocation from "../../../../components/sections/companyLocation";
import Testimonials from "../../../../components/sections/testimonials";
import { type Product } from "@/types";

export default function CatalogView({ data }: { data: Product[] }) {
  const router = useRouter();
  const pathName = usePathname();

  return (
    <Suspense>
      <SupportDrawer />
      <FiltersMobile />
      {/* {pathName !== "/" && <Meta />} */}

      <div className="flex">
        {pathName !== "/" && <Filters />}

        {data.length > 0 ? (
          <GridComponent data={data} />
        ) : (
          <div className="mx-auto flex flex-col items-center gap-5">
            <div className="mx-auto w-fit text-xl">Немає товарів</div>
            <Button onClick={() => router.back()} title="Крок назад" />
          </div>
        )}
      </div>

      {pathName !== "/" ? (
        <PaginationComponent data={data} />
      ) : (
        <div className="mx-auto mb-10 w-fit">
          <Link href="/allProducts">
            <Button title="Перейти до каталогу" />
          </Link>
        </div>
      )}

      <Suspense>
        <Testimonials />
        <CompanyLocation />
        <FooterComponent />
      </Suspense>
    </Suspense>
  );
}
