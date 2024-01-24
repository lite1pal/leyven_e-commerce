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
} from "@mui/x-data-grid";
import moment from "moment";
import Button from "@/components/base/Button";
import ButtonMUI from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Link from "next/link";
import { Product } from "@/types";
import AddIcon from "@mui/icons-material/Add";
import { API_URL } from "@/config/api";
import toast from "react-hot-toast";
import MySpinner from "@/components/base/Spinner";
import { Spinner } from "flowbite-react";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

function EditToolbar() {
  const [loading, setLoading] = React.useState(false);

  const handleImport = async (e: any) => {
    try {
      setLoading(true);

      // Set a timeout of 10 seconds
      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error("Timeout")), 20000),
      );

      // Make the actual fetch request
      const fetchPromise = fetch(`${API_URL}/products`, { method: "POST" });

      // Use Promise.race to handle the timeout
      const res = await Promise.race([fetchPromise, timeoutPromise]);

      // Check if the result is from the fetch request
      if (res instanceof Response) {
        const parsedRes = await res.json();
        console.log(parsedRes);
        setLoading(false);
        toast.success(
          "Дані з leyven.prom.ua імпортовані успішно. Все синхронізовано",
          { duration: 7000 },
        );
      } else {
        // Handle timeout
        console.log("Request timed out");
        setLoading(false);
        toast.error("Request timed out");
      }
    } catch (err: any) {
      console.log(err);
      toast.error(err.message);
      setLoading(false);
    }
  };

  return (
    <GridToolbarContainer className="flex w-full justify-between">
      <Link href="/dashboard/products/add">
        <Button title="Додати товар" />
      </Link>
      <div className="flex gap-3">
        {loading ? (
          <div className="flex gap-3 text-lg text-slate-500">
            Не робіть ніяких дій, поки відбувається імпорт
            <Spinner />
          </div>
        ) : (
          <ButtonMUI
            onClick={(e) => handleImport(e)}
            startIcon={<AddIcon />}
            variant="text"
          >
            import
          </ButtonMUI>
        )}
        <GridToolbarExport />
      </div>
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
      headerName: "",
      width: 250,
      renderCell: (params) => {
        const product = params.row;
        return (
          <div className="flex w-full justify-between">
            <img
              className="mx-auto h-48 w-48 object-contain"
              src={product.img}
            />
          </div>
        );
      },
    },
    { field: "title", headerName: "Назва", width: 250 },
    {
      field: "availability",
      headerName: "Статус",
      width: 120,
      renderCell: (params) => {
        return (
          <div
            className={`${
              params.value === "in stock" ? "text-emerald-600" : "text-red-700"
            } font-bold`}
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
        return (
          <div className="font-bold text-teal-700">{params.value} грн</div>
        );
      },
    },
    {
      field: "discount",
      headerName: "Знижка",
      width: 100,
      renderCell: (params) => {
        return <div className="font-bold text-teal-700">{params.value} %</div>;
      },
    },
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
    // {
    //   field: "updatedAt",
    //   headerName: "Дата зміни",
    //   width: 150,
    //   renderCell: (params) => {
    //     const product: Product = params.row;
    //     return (
    //       <div className="font-medium text-slate-600">
    //         {moment(product.updatedAt).format("hh:mm, DD.MM.YYYY")}
    //       </div>
    //     );
    //   },
    // },
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
    <div className="mx-auto w-fit">
      <DataGrid
        sx={{ border: "none" }}
        getRowHeight={() => "auto"}
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
        pageSizeOptions={[10, 25, 50]}
      />
    </div>
  );
}
