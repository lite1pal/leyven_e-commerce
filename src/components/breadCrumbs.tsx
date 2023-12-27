"use client";

import Breadcrumbs from "@mui/joy/Breadcrumbs";
import Typography from "@mui/joy/Typography";
import { Breadcrumb } from "flowbite-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { HiHome } from "react-icons/hi";

export default function BasicBreadcrumbs({ data }: any) {
  const breadcrumbs = useMemo(() => {
    return data?.breadcrumbs.split(" > ");
  }, [data]);

  function capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const pathName = usePathname();

  const getBreadcrumbLink = (breadcrumb: string) => {
    if (
      breadcrumb == "ветеринарні засоби та препарати" ||
      breadcrumb == "Ветеринарія"
    ) {
      return "/veterynarny";
    } else if (breadcrumb == "годування домашніх тварин і птахів") {
      return "/food";
    } else if (breadcrumb == "Товари для прогулянок і подорожей з тваринами") {
      return "/outdoors";
    } else if (
      breadcrumb == "домашні тварини та зоотовари" ||
      breadcrumb == "товари для домашніх тварин і птахів"
    ) {
      return "/";
    } else {
      return pathName;
    }
  };

  return (
    <Breadcrumb
      className="max-sm:px-5 px-7 py-6 max-w-screen overflow-x-scroll"
      aria-label="Default breadcrumb example"
    >
      <HiHome />
      {breadcrumbs?.map((breadcrumb: any, i: number) => {
        return (
          <Breadcrumb.Item className="whitespace-nowrap" key={i} href="#">
            <Link href={getBreadcrumbLink(breadcrumb) || "/"}>
              {capitalizeFirstLetter(breadcrumb)}
            </Link>
          </Breadcrumb.Item>
        );
      })}
      {/* <Breadcrumb.Item href="#" icon={HiHome}>
        {data.breadcrumbs}
      </Breadcrumb.Item>
      <Breadcrumb.Item href="#">Корм</Breadcrumb.Item>
      <Breadcrumb.Item>Собака</Breadcrumb.Item> */}
    </Breadcrumb>
  );
}
