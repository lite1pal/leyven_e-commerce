import { API_URL } from "@/config/api";
import { convertXLSXtoJSON } from "@/libs/utils";
import toast from "react-hot-toast";
import { GridToolbarContainer, GridToolbarQuickFilter } from "@mui/x-data-grid";
import { useState } from "react";
import Button from "@/components/base/Button";
import ButtonMUI from "@mui/material/Button";
import Link from "next/link";
import AddIcon from "@mui/icons-material/Add";
import { Spinner } from "flowbite-react";

export default function EditToolbar() {
  const [loading, setLoading] = useState(false);

  const handleImportProm = async () => {
    try {
      setLoading(true);

      // Make the actual fetch request
      const res = await fetch(`${API_URL}/products`, { method: "PUT" });

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

      const res = await fetch(`${API_URL}/products1C`, {
        method: "PUT",
        body: JSON.stringify({ jsonData }),
      });

      const parsedRes = await res.json();
      setLoading(false);
    } catch (err) {
      console.log(err);
      toast.error("Надто багато імпортів, спробуйте ще раз через годину");
      setLoading(false);
    }
  };

  const handleImport1C = async (e: any) => {
    try {
      setLoading(true);
      const file = e.target.files[0];

      const xmlText = await file.text();

      const res = await fetch(`${API_URL}/products1C`, {
        method: "POST",
        body: JSON.stringify({ xmlText }),
      });

      // Check if the result is from the fetch request
      if (res.ok) {
        setLoading(false);
        toast.success("Імпорт з бази 1С успішний", { duration: 7000 });
        const parsedRes = await res.json();
        console.log(parsedRes);
        return;
      }
      // Handle timeout
      setLoading(false);
      toast.error(
        "Файл має бути формату XML. Спробуйте пізніше, якщо ви завантажували вірний формат",
      );
    } catch (err) {
      console.log(err);
      toast.error("Надто багато імпортів, спробуйте ще раз через годину");
      setLoading(false);
    }
  };

  return (
    <GridToolbarContainer className="flex w-full justify-between">
      <Link href="/dashboard/products/add">
        <Button title="Додати товар" />
      </Link>
      <div className="flex flex-col items-start gap-3 lg:flex-row lg:items-center">
        {loading ? (
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
        )}
        {/* <GridToolbarExport /> */}
        {!loading && (
          <ButtonMUI startIcon={<AddIcon />}>
            <label className="cursor-pointer" htmlFor="file">
              Upload data from 1C
            </label>
            <input
              id="file"
              className="hidden"
              type="file"
              onChange={(e) => handleImport1C(e)}
            />
          </ButtonMUI>
        )}
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