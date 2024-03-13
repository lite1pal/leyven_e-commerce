import { GridToolbarContainer, GridToolbarQuickFilter } from "@mui/x-data-grid";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import Import1CForm from "../import1C-form";
import ImportPromExcelForm from "../importPromExcel-form";

export default function Toolbar() {
  return (
    <GridToolbarContainer className="flex w-full justify-between">
      <div className="flex flex-col items-start gap-3 lg:flex-row lg:items-center">
        <Link
          className={buttonVariants({ variant: "outline" })}
          href="/dashboard/products/add"
        >
          Додати товар
        </Link>

        <Import1CForm />
        <ImportPromExcelForm />
      </div>
      {/* <GridToolbarFilterButton /> */}
      <GridToolbarQuickFilter
        sx={{
          backgroundColor: "transparent",
        }}
      />
    </GridToolbarContainer>
  );
}
