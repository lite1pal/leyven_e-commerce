"use client";

import * as React from "react";
import EditIcon from "@mui/icons-material/Edit";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { DataGrid, GridColDef, GridActionsCellItem } from "@mui/x-data-grid";
import moment from "moment";
import Link from "next/link";
import EditToolbar from "./editToolbar";
import { API_URL } from "@/config/api";
import { useEffect, useState } from "react";
import { slugifyString } from "@/libs/utils";
import { PhotoProvider, PhotoView } from "react-photo-view";

export default function FullFeaturedCrudGrid() {
  const columns: GridColDef[] = [
    {
      field: "actions",
      type: "actions",
      headerName: "Дії",
      width: 80,
      cellClassName: "actions",
      renderCell: ({ id, row }) => {
        return (
          <div className="flex flex-col gap-2">
            <Link
              prefetch={false}
              title="Редагувати товар"
              key={1}
              href={`/dashboard/products/edit/${id}`}
            >
              <GridActionsCellItem
                icon={<EditIcon />}
                label="Edit"
                className="textPrimary"
                color="inherit"
              />
            </Link>
            <Link
              prefetch={false}
              title="Відкрити сторінку товара"
              target="_blank"
              href={`/product/${id}-${slugifyString(row.title)}`}
            >
              <OpenInNewIcon />
            </Link>
          </div>
        );
      },
    },

    {
      field: "title",
      headerName: "Назва",
      width: 300,
      renderCell: (params) => {
        console.log(params);
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
        return <div>{params.value} %</div>;
      },
    },
    { field: "quantity", headerName: "К-сть", width: 60 },
    { field: "barcode", headerName: "Штрихкод", width: 150 },
    { field: "artycul", headerName: "Артикул", width: 130 },
    { field: "unique_id_1c", headerName: "1C, id", width: 300 },
    { field: "unique_id", headerName: "Prom.ua, id", width: 120 },
    {
      field: "img",
      headerName: "Картинка",
      width: 110,
      renderCell: (params) => {
        const product = params.row;
        return (
          <PhotoProvider>
            <PhotoView src={product.img}>
              <div className="flex h-20 flex-col items-center justify-between overflow-hidden bg-white">
                <img
                  className="mx-auto h-full w-full object-contain"
                  src={product.img}
                />
              </div>
            </PhotoView>
          </PhotoProvider>
        );
      },
    },
    {
      field: "updatedAt",
      headerName: "Дата зміни",
      width: 180,
      renderCell: (params) => {
        const product = params.row;
        return (
          <div className="font-medium text-slate-900">
            {product.updatedAt
              ? moment(product.updatedAt).format("hh:mm a, DD.MM.YYYY")
              : "Відсутня"}
          </div>
        );
      },
    },
  ];

  const [rows, setRows] = useState([]);

  const [rowCountState, setRowCountState] = useState(0);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 20,
  });
  const [filterModel, setFilterModel] = useState<any>({
    items: [],
  });
  const [sortModel, setSortModel] = useState<any>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const resOptions = {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            page: paginationModel.page,
            pageSize: paginationModel.pageSize,
            sortModel,
            filterModel,
          }),
        };

        const res = await fetch(`${API_URL}/productsDatagrid`, resOptions);

        if (!res.ok) {
          console.error("Failed to fetch data");
          return;
        }

        const parsedRes = await res.json();

        setRows(parsedRes.products);
        setRowCountState(parsedRes.productsCount);
      } catch (err) {
        console.error(err);
      }
    }
    fetchData();
  }, [sortModel, filterModel, paginationModel]);

  return (
    <div className="mx-auto flex w-full flex-col">
      <div className="pb-4 text-slate-500">{rowCountState} позицій</div>
      <DataGrid
        sx={{
          "&, [class^=MuiDataGrid]": { border: "none" },
          border: "none",
          color: "rgb(15 23 42)",
        }}
        rows={rows || []}
        getRowHeight={() => "auto"}
        columns={columns}
        showCellVerticalBorder
        disableRowSelectionOnClick
        density="standard"
        slots={{
          toolbar: EditToolbar,
        }}
        initialState={{
          columns: {
            columnVisibilityModel: {
              // Hide columns status and traderName, the other columns will remain visible
              artycul: false,
              unique_id: false,
              unique_id_1c: false,
              barcode: false,
            },
          },
        }}
        pagination
        pageSizeOptions={[20, 50, 100]}
        sortingMode="server"
        filterMode="server"
        paginationMode="server"
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
        onSortModelChange={setSortModel}
        onFilterModelChange={setFilterModel}
        rowCount={rowCountState}
      />
    </div>
  );
}

function Value({ children }: { children: React.ReactNode }) {
  return <div className="text-slate-900">{children}</div>;
}
