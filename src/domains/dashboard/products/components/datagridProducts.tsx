"use client";

import * as React from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";

import {
  DataGrid,
  GridColDef,
  GridToolbarContainer,
  GridActionsCellItem,
  GridToolbarQuickFilter,
  GridToolbarExport,
  GridToolbarFilterButton,
} from "@mui/x-data-grid";
import moment from "moment";
import Button from "@/components/base/Button";
import ButtonMUI from "@mui/material/Button";
import Link from "next/link";
import { Product } from "@/types";
import AddIcon from "@mui/icons-material/Add";
import { API_URL } from "@/config/api";
import toast from "react-hot-toast";
import { Spinner } from "flowbite-react";
import { convertXLSXtoJSON } from "@/libs/utils";

function EditToolbar() {
  const [loading, setLoading] = React.useState(false);

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
      <GridToolbarFilterButton />
      <GridToolbarQuickFilter
        sx={{
          backgroundColor: "transparent",
        }}
      />
    </GridToolbarContainer>
  );
}

export default function FullFeaturedCrudGrid({ data }: { data: Product[] }) {
  const columns: GridColDef[] = [
    {
      field: "img",
      headerName: "Картинка",
      width: 250,
      renderCell: (params) => {
        const product = params.row;
        return (
          <div className="flex h-48 max-h-48 w-48 flex-col items-center justify-between">
            <img
              className="mx-auto h-full w-full object-contain"
              src={product.img}
            />
            <div className="h-16 w-full overflow-hidden whitespace-normal p-2 text-slate-400">
              {product.img !== "miss" && product.img}
            </div>
          </div>
        );
      },
    },
    {
      field: "title",
      headerName: "Назва",
      width: 300,
      renderCell: (params) => {
        return <Value>{params.value}</Value>;
      },
    },
    {
      field: "availability",
      headerName: "Статус",
      width: 120,
      renderCell: (params) => {
        return (
          <div
            className={`${
              params.value === "in stock" ? "text-emerald-600" : "text-red-700"
            }`}
          >
            {params.value}
          </div>
        );
      },
    },

    {
      field: "price",
      headerName: "Ціна",
      width: 120,
      renderCell: (params) => {
        return <Value>{params.value}</Value>;
      },
    },
    {
      field: "discount",
      headerName: "Знижка",
      width: 100,
      renderCell: (params) => {
        return <div className="text-teal-700">{params.value} %</div>;
      },
    },
    { field: "quantity", headerName: "К-сть", width: 60 },
    { field: "barcode", headerName: "Штрихкод", width: 150 },
    { field: "artycul", headerName: "Артикул", width: 130 },
    { field: "unique_id_1c", headerName: "1C, id", width: 300 },
    { field: "unique_id", headerName: "Prom.ua, id", width: 120 },

    {
      field: "updatedAt",
      headerName: "Дата зміни",
      width: 150,
      renderCell: (params) => {
        const product = params.row;
        return (
          <div className="font-medium text-slate-600">
            {product.updatedAt
              ? moment(product.updatedAt).format("hh:mm a, DD.MM.YYYY")
              : "Відсутня"}
          </div>
        );
      },
    },

    {
      field: "actions",
      type: "actions",
      headerName: "Дії",
      width: 100,
      editable: true,
      cellClassName: "actions",
      getActions: ({ id }) => {
        return [
          <Link key={1} href={`/dashboard/products/edit/${id}`}>
            <GridActionsCellItem
              icon={<EditIcon />}
              label="Edit"
              className="textPrimary"
              color="inherit"
            />
          </Link>,
          <GridActionsCellItem
            key={2}
            icon={<DeleteIcon />}
            label="Delete"
            color="inherit"
          />,
        ];
      },
    },
  ];

  return (
    <div className="mx-auto flex w-full flex-col">
      <div className="pb-4 text-gray-500">{data.length} позицій</div>
      <DataGrid
        sx={{ border: "none" }}
        // getRowHeight={() => "auto"}
        rows={data}
        columns={columns}
        showCellVerticalBorder
        disableRowSelectionOnClick
        density="standard"
        slots={{
          toolbar: EditToolbar,
        }}
        initialState={{
          pagination: { paginationModel: { pageSize: 10 } },
        }}
        pageSizeOptions={[10, 25, 50, 100]}
      />
    </div>
  );
}

function Value({ children }: { children: React.ReactNode }) {
  return <div className="text-gray-900">{children}</div>;
}
