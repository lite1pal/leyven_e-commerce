"use client";

import BasicBreadcrumbs from "@/layout_components/breadCrumbs";
import { useParams } from "next/navigation";
import TabsComponent from "./components/tabs";

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
