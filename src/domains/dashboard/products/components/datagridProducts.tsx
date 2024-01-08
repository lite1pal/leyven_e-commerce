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
import Link from "next/link";
import { Product } from "@/types";

function EditToolbar() {
  return (
    <GridToolbarContainer className="flex w-full justify-between">
      <Link href="/dashboard/products/add">
        <Button title="Додати товар" />
      </Link>
      <GridToolbarExport />
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
