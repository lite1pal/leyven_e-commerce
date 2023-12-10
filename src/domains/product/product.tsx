"use client";

import BasicBreadcrumbs from "@/layout_components/breadCrumbs";
import { products } from "@/data/data";
import { useParams } from "next/navigation";
import TabsComponent from "./components/tabs";
import { useEffect, useState } from "react";

export default function ProductView() {
  return (
    <div>
      <BasicBreadcrumbs />
      <div className="px-7">
        <TabsComponent />
      </div>
    </div>
  );
}
