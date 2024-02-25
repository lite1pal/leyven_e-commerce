"use client";

import { Card, CardContent } from "@mui/joy";
import ProductAvailability from "@/domains/shop/product/components/availability";
import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";
import moment from "moment";
import Button from "@/components/base/Button";

export default function DataGridOrders({ data }: any) {
  const columns: GridColDef[] = [
    {
      field: "orderProducts",
      headerName: "Товари",
      filterable: false,
      // sortable: false,
      width: 140,
      renderCell: (params: any) => {
        const orderProducts = params.row.orderProducts;
        return (
          <div
            onClick={() =>
              (
                document.getElementById(
                  `modal_order_${params.row.id}`,
                ) as HTMLFormElement
              ).showModal()
            }
            className="flex w-full justify-between"
          >
            <Button title="Відкрити" />

            <dialog id={`modal_order_${params.row.id}`} className="modal">
              <div className="modal-box bg-white">
                <div className="flex h-fit w-full flex-col gap-3 overflow-y-scroll rounded-lg bg-white p-5">
                  {orderProducts.map((orderProduct: any) => {
                    const product = orderProduct.product;
                    return (
                      <Card
                        key={orderProduct.id}
                        orientation="horizontal"
                        variant="outlined"
                        sx={{
                          width: "100%",
                          backgroundColor: "white",
                          border: "none",
                        }}
                      >
                        <div className="h-20 w-20 overflow-hidden">
                          <img
                            className={`h-full w-full object-contain`}
                            src={product.img}
                            loading="lazy"
                            alt={product.title + "картинка"}
                          />
                        </div>

                        <CardContent>
                          <div className="cursor-pointer font-medium">
                            {product.title}
                          </div>

                          <div className="flex items-center gap-10">
                            <span className="text-lg font-medium text-slate-700 dark:text-white max-sm:text-sm">
                              {orderProduct.itemTotal}.00 UAH
                            </span>
                            <div className="hidden gap-2 text-xs text-slate-400 sm:flex">
                              Артикул: {product.artycul}
                            </div>
                          </div>
                          <div className="text-xs">
                            {orderProduct.quantity} шт.
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </div>
              <form method="dialog" className="modal-backdrop">
                <button>close</button>
              </form>
            </dialog>
          </div>
        );
      },
    },
    { field: "totalPrice", headerName: "Ціна", width: 60 },
    {
      field: "firstName",
      headerName: "Клієнт",
      width: 230,
      renderCell: (params: any) => {
        return (
          <div className="flex flex-col gap-2">
            <div>{params.row.lastName + " " + params.row.firstName}</div>
            <div className="text-indigo-700">{params.row.phone}</div>
            <div className="text-slate-600">{params.row.comment}</div>
          </div>
        );
      },
    },
    {
      field: "email",
      headerName: "Пошта",
      width: 230,
      renderCell: (params: any) => {
        return <div className="w-full font-medium">{params.value}</div>;
      },
    },

    { field: "city", headerName: "Місто", width: 120 },
    { field: "warehouse", headerName: "Відділення", width: 200 },
    {
      field: "createdAt",
      headerName: "Дата замовлення",
      width: 110,
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

  return (
    <div className="mx-auto w-full">
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
