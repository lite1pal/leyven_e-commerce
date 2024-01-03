"use client";

import { Suspense } from "react";
import GridComponent from "./grid";
import SupportDrawer from "./supportDrawer";

import { auth } from "@/app/api/auth/[...nextauth]/auth";
import { API_URL } from "@/config/api";
import BasicBreadcrumbs from "@/components/breadCrumbs";
import Card from "@/components/card";
import PaginationComponent from "@/components/pagination";
import { Roboto } from "next/font/google";
import Meta from "@/components/meta";
import Filters from "@/components/filters";
import FiltersMobile from "@/components/filtersMobile";
import FooterComponent from "@/components/footer";
import RelatedProducts from "@/components/relatedProducts";
import MySpinner from "@/components/base/Spinner";
import Button from "./base/Button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import CompanyLocation from "./companyLocation";

export default function CatalogView({ data }: any) {
  const router = useRouter();
  if (data.length === 0)
    return (
      <div className="flex flex-col items-center gap-5">
        <div className="mx-auto w-fit text-xl font-medium">Немає товарів</div>
        <Button
          onClick={() => router.back()}
          title="Повернутися до попередньої категорії"
        />
      </div>
    );
  return (
    <Suspense fallback={<MySpinner />}>
      <SupportDrawer />
      <FiltersMobile />
      <Meta data={data} />

      <div className="flex">
        <Filters />
        <GridComponent data={data} />
      </div>
      <PaginationComponent data={data} />
      <Suspense fallback={<MySpinner />}>
        <RelatedProducts header="Вам може сподобатися" />
        <Suspense>
          <CompanyLocation />
          <FooterComponent />
        </Suspense>
      </Suspense>
    </Suspense>
  );
}
