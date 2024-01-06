"use client";

import { Suspense } from "react";
import GridComponent from "./grid";
import SupportDrawer from "./supportDrawer";
import PaginationComponent from "@/components/pagination";
import Meta from "@/components/meta";
import Filters from "@/components/filters";
import FiltersMobile from "@/components/filtersMobile";
import FooterComponent from "@/components/footer";
import Button from "./base/Button";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import CompanyLocation from "./companyLocation";
import Testimonials from "./sections/testimonials";

export default function CatalogView({ data }: any) {
  const router = useRouter();
  const pathName = usePathname();
  // if (data.length === 0)
  //   return (
  //     <div className="flex flex-col items-center gap-5">
  //       <div className="mx-auto w-fit text-xl font-medium">Немає товарів</div>
  //       <Button onClick={() => router.back()} title="Крок назад" />
  //     </div>
  //   );
  return (
    <Suspense>
      <SupportDrawer />
      <FiltersMobile />
      {pathName !== "/" && <Meta data={data} />}

      <div className="flex">
        {pathName !== "/" && <Filters />}
        {}
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
      {/* <Suspense fallback={<SkeletonHorizontalProducts />}>
        <RelatedProducts header="Вам може сподобатися" />
      </Suspense> */}
      <Suspense>
        <Testimonials />
        <CompanyLocation />
        <FooterComponent />
      </Suspense>
    </Suspense>
  );
}
