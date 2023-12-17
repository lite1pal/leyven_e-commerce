import Breadcrumbs from "@mui/joy/Breadcrumbs";
import Link from "@mui/joy/Link";
import Typography from "@mui/joy/Typography";
import { Breadcrumb } from "flowbite-react";
import { useMemo } from "react";
import { HiHome } from "react-icons/hi";

export default function BasicBreadcrumbs({ data }: any) {
  const breadcrumbs = useMemo(() => {
    return data?.breadcrumbs.split(" > ");
  }, [data]);

  function capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  return (
    <Breadcrumb
      className="max-sm:px-5 px-7 py-6"
      aria-label="Default breadcrumb example"
    >
      <HiHome />
      {breadcrumbs?.map((breadcrumb: any, i: number) => {
        return (
          <Breadcrumb.Item key={i} href="#">
            {capitalizeFirstLetter(breadcrumb)}
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
