"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { DataTableColumnHeader } from "@/components/ui/data-table-column-header";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { type Product } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
// This type is used to define the shape of our data.
export type Order = {
  id: string;
  email: string;
  phone: string;
  firstName: string;
  lastName: string;
  city: string;
  warehouse: string;
  totalPrice: number;
  comment: string | null;
  orderProducts: Product[];
  createdAt: string | Date;
  updatedAt: string | Date;
};

export const columns: ColumnDef<Order>[] = [
  {
    accessorKey: "email",

    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email" />
    ),
  },
  {
    accessorKey: "phone",
    cell: ({ row }) => (
      <div>{(row.getValue("phone") as any).replace(/\s|\+|-|\(|\)/g, "")}</div>
    ),
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Телефон" />
    ),
  },
  {
    accessorKey: "firstName",
    cell: ({ row }) => <div>{row.getValue("firstName")}</div>,

    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Ім'я" />
    ),
  },
  {
    accessorKey: "lastName",
    cell: ({ row }) => <div>{row.getValue("lastName")}</div>,

    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Прізвище" />
    ),
  },

  {
    accessorKey: "city",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Місто" />
    ),
  },
  {
    accessorKey: "totalPrice",
    cell: ({ row }) => <div>{row.getValue("totalPrice")} грн</div>,

    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Сума" />
    ),
  },
  {
    accessorKey: "warehouse",
    cell: ({ row }) => <div className="w-36">{row.getValue("warehouse")}</div>,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Відділення" />
    ),
  },
  {
    accessorKey: "comment",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Коментар" />
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const order = row.original;

      return (
        <div className="flex gap-1.5">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" className="bg-emerald-300">
                Товари
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogTitle>
                {order.firstName} {order.lastName}, {order.phone}
              </DialogTitle>
              <DialogDescription>
                Загальна сума - {order.totalPrice} грн
              </DialogDescription>
              <div className="flex h-fit w-full flex-col gap-3 overflow-y-scroll rounded-lg bg-white pt-3">
                {order.orderProducts.map((orderProduct: any) => {
                  const product = orderProduct.product;
                  return (
                    <Card
                      className="flex border-none shadow-none"
                      key={orderProduct.id}
                    >
                      <div className="h-36 w-36 overflow-hidden">
                        <img
                          className={`h-full w-full object-contain`}
                          src={product.img}
                          loading="lazy"
                          alt={product.title + "картинка"}
                        />
                      </div>

                      <CardContent className="flex flex-col gap-1.5">
                        <CardTitle className="font-normal">
                          {product.title}
                        </CardTitle>

                        <div className="flex items-center gap-10">
                          <span className="text-lg font-medium dark:text-white max-sm:text-sm">
                            {orderProduct.itemTotal}.00 UAH
                          </span>
                          <div className="hidden gap-2 text-xs text-slate-400 sm:flex">
                            Артикул: {product.artycul}
                          </div>
                        </div>
                        <div>{orderProduct.quantity} шт.</div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </DialogContent>
          </Dialog>
        </div>
      );
    },
  },
  {
    id: "orderProducts",
    cell: ({ row }) => {
      const order = row.original;

      return (
        <Dialog>
          <DialogTrigger asChild>Товари</DialogTrigger>
          <DialogContent>
            <div className=" bg-white">
              <div className="text-lg font-medium">
                {order.firstName} {order.lastName}, {order.phone}
              </div>
              <div className="text-lg font-medium text-slate-400">
                Загальна сума - {order.totalPrice} грн
              </div>
              {/* <div className="flex h-fit w-full flex-col gap-3 overflow-y-scroll rounded-lg bg-white p-5">
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
                    <div>{orderProduct.quantity} шт.</div>
                  </CardContent>
                </Card>
              );
            })}
          </div> */}
            </div>
          </DialogContent>
        </Dialog>
      );
    },
  },
];
