"use client";

import { Suspense } from "react";
import GridComponent from "./grid";
import PaginationComponent from "@/components/catalog/pagination";
import Meta from "@/components/catalog/meta";
import Filters from "@/components/catalog/filters-section/filters";
import Button from "../Button";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { type Product } from "@/types";

export default function CatalogView({ data }: { data: Product[] }) {
  const router = useRouter();
  const pathName = usePathname();

  return (
    <Suspense>
      {/* <SupportDrawer /> */}
      {pathName !== "/" && <Meta />}

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
    </Suspense>
  );
}
