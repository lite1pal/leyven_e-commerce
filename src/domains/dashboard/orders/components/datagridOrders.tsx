"use client";

import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";
import moment from "moment";

export default function DataGridOrders({ data }: any) {
  const columns: GridColDef[] = [
    {
      field: "createdAt",
      headerName: "Товари",
      filterable: false,
      // sortable: false,
      width: 270,
      renderCell: (params: any) => {
        const orderProduct = params.row.orderProducts[0];
        return (
          <div className="flex w-full justify-between">
            <img
              className="h-20 object-contain"
              src={orderProduct.product.img}
            />
            <div className="flex flex-col justify-center gap-3">
              <div className="text-blue-600">{orderProduct.quantity} шт.</div>
              <div className="font-medium text-slate-600">
                {moment(params.row.createdAt).format("hh:mm, DD.MM.YYYY")}
              </div>
            </div>
          </div>
        );
      },
    },
    { field: "totalPrice", headerName: "Ціна", width: 100 },
    {
      field: "firstName",
      headerName: "Клієнт",
      width: 160,
      renderCell: (params: any) => {
        return (
          <div className="flex flex-col gap-2">
            <div>{params.row.lastName + " " + params.row.firstName}</div>
            <div className="text-indigo-700">{params.row.phone}</div>
          </div>
        );
      },
    },
    {
      field: "email",
      headerName: "Пошта",
      width: 240,
      renderCell: (params: any) => {
        return <div className="w-full font-medium">{params.value}</div>;
      },
    },

    { field: "city", headerName: "Місто", width: 120 },
    { field: "warehouse", headerName: "Відділення", width: 200 },
  ];

  return (
    <div className="mx-auto w-fit">
      <DataGrid
        sx={{ border: "none" }}
        getRowHeight={() => "auto"}
        rows={data}
        // disableColumnFilter
        disableColumnSelector
        disableDensitySelector
        density="standard"
        showCellVerticalBorder
        disableRowSelectionOnClick
        columns={columns}
        slots={{ toolbar: GridToolbar }}
        slotProps={{
          toolbar: {
            showQuickFilter: true,
          },
        }}
        initialState={{
          ...data.initialState,
          pagination: { paginationModel: { pageSize: 25 } },
        }}
        pageSizeOptions={[10, 25, 50]}
      />
    </div>
  );
}
