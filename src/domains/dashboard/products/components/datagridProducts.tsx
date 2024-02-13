"use client";

import * as React from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import { DataGrid, GridColDef, GridActionsCellItem } from "@mui/x-data-grid";
import moment from "moment";
import Link from "next/link";
import { Product } from "@/types";
import EditToolbar from "./editToolbar";
import { useParams, usePathname, useRouter } from "next/navigation";
import { API_URL } from "@/config/api";
import { useEffect, useState } from "react";
import { getDecodedFilters, getFiltersPathName } from "@/libs/utils";
import { filter } from "lodash";

export default function FullFeaturedCrudGrid({ data }: { data: Product[] }) {
  const columns: GridColDef[] = [
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
          // <GridActionsCellItem
          //   key={2}
          //   icon={<DeleteIcon />}
          //   label="Delete"
          //   color="inherit"
          // />,
        ];
      },
    },
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
      <div className="pb-4 text-gray-500">{rowCountState} позицій</div>
      <DataGrid
        sx={{ border: "none" }}
        rows={rows || []}
        columns={columns}
        showCellVerticalBorder
        disableRowSelectionOnClick
        density="standard"
        slots={{
          toolbar: EditToolbar,
        }}
        // initialState={{
        //   pagination: { paginationModel: { pageSize: 20 } },
        // }}
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
  return <div className="text-gray-900">{children}</div>;
}
