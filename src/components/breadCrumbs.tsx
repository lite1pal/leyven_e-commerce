import * as React from "react";
import Breadcrumbs from "@mui/joy/Breadcrumbs";
import Link from "@mui/joy/Link";
import Typography from "@mui/joy/Typography";
import { Breadcrumb } from "flowbite-react";
import { HiHome } from "react-icons/hi";

export default function BasicBreadcrumbs() {
  return (
    <Breadcrumb className="px-7 py-5" aria-label="Default breadcrumb example">
      <Breadcrumb.Item href="#" icon={HiHome}>
        Головна
      </Breadcrumb.Item>
      <Breadcrumb.Item href="#">Корм</Breadcrumb.Item>
      <Breadcrumb.Item>Курка</Breadcrumb.Item>
    </Breadcrumb>
  );
}
