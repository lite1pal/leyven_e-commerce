import { API_KEY, API_URL } from "@/config/api";
import { convertXLSXtoJSON, isXmlString } from "@/libs/utils";
import toast from "react-hot-toast";
import { GridToolbarContainer, GridToolbarQuickFilter } from "@mui/x-data-grid";
import { useState } from "react";
import Button from "@/components/Button";
import ButtonMUI from "@mui/material/Button";
import Link from "next/link";
import AddIcon from "@mui/icons-material/Add";
import { Spinner } from "flowbite-react";
import { buttonVariants } from "@/components/ui/button";
import Import1CForm from "./import1C-form";

export default function EditToolbar() {
  const [loading, setLoading] = useState(false);

  const handleImportProm = async () => {
    try {
      setLoading(true);

      // Make the actual fetch request
      const res = await fetch(`${API_URL}/products`, {
        method: "PUT",
        headers: { "api-key": API_KEY },
      });

      // Check if the result is from the fetch request
      if (res.ok) {
        setLoading(false);
        toast.success(
          "Дані з leyven.prom.ua імпортовані успішно. Все синхронізовано",
          { duration: 7000 },
        );
        return;
      }
      // Handle timeout
      setLoading(false);
      toast.error("Спробуйте пізніше");
    } catch (err: any) {
      console.log(err);
      toast.error("Надто багато імпортів, спробуйте ще раз через годину");
      setLoading(false);
    }
  };

  const handleXLSXUpload = async (e: any) => {
    try {
      setLoading(true);
      const file = e.target.files[0];

      const jsonData: any = await convertXLSXtoJSON(file);

      const res = await fetch(`${API_URL}/productsXLSX`, {
        method: "POST",
        headers: { "api-key": API_KEY },
        body: JSON.stringify({ jsonData }),
      });

      toast.success("success");

      const parsedRes = await res.json();
      console.log(parsedRes);
      setLoading(false);
    } catch (err) {
      console.log(err);
      toast.error("Надто багато імпортів, спробуйте ще раз через годину");
      setLoading(false);
    }
  };

  const handleImport1C = async (e: any) => {
    try {
      const file = e.target.files[0];

      const xmlText = await file.text();

      if (!isXmlString(xmlText)) {
        toast.error(
          "Файл має бути формату XML. Спробуйте пізніше, якщо ви завантажували вірний формат",
        );
        return;
      }
      return;
      setLoading(true);

      const requestBody = JSON.stringify({ xmlText });
      const estimatedRequestSize = requestBody.length; // Approximate size

      console.log(`Estimated request size: ${estimatedRequestSize} bytes`);

      const res = await fetch(`${API_URL}/products1C`, {
        method: "POST",
        body: JSON.stringify({ xmlText }),
        cache: "no-store",
      });

      const parsedRes = await res.json();
      console.log(parsedRes);

      if (!res.ok) {
        // console.log(result.error);
        toast.error(parsedRes.message);
      } else {
        // console.log(result.message);
        toast.success("Імпорт з бази 1С успішний", { duration: 7000 });
      }
    } catch (err) {
      console.log(err);
      toast.error("Надто багато імпортів, спробуйте ще раз через годину");
    } finally {
      setLoading(false);
    }
  };

  return (
    <GridToolbarContainer className="flex w-full justify-between">
      <div className="flex flex-col items-start gap-3 lg:flex-row lg:items-center">
        <Link
          className={buttonVariants({ variant: "outline" })}
          href="/dashboard/products/add"
        >
          {/* <Button title="Додати товар" /> */}
          Додати товар
        </Link>
        {/* {loading ? (
          <div className="flex gap-3 text-lg text-slate-500">
            Не робіть ніяких дій, поки відбувається імпорт
            <Spinner />
          </div>
        ) : (
          <ButtonMUI
            onClick={handleImportProm}
            startIcon={<AddIcon />}
            variant="text"
          >
            Sync with Prom
          </ButtonMUI>
        )} */}
        {loading && (
          <div className="flex items-center gap-3 text-lg text-slate-500">
            Не робіть ніяких дій, поки відбувається імпорт
            <Spinner />
          </div>
        )}
        {/* {!loading && (
          <ButtonMUI startIcon={<AddIcon />}>
            <label className="cursor-pointer" htmlFor="file">
              Імпорт з offers.xml файлу 1C
            </label>
            <input
              id="file"
              className="hidden"
              type="file"
              onChange={(e) => handleImport1C(e)}
            />
          </ButtonMUI>
        )} */}

        <Import1CForm />

        {/* {!loading && (
          <ButtonMUI startIcon={<AddIcon />}>
            <label className="cursor-pointer" htmlFor="file">
              Upload data from XLSX
            </label>
            <input
              id="file"
              className="hidden"
              type="file"
              onChange={(e) => handleXLSXUpload(e)}
            />
          </ButtonMUI>
        )} */}
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
