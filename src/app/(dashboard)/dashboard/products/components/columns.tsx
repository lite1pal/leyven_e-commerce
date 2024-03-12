import { GridColDef } from "@mui/x-data-grid";
import Link from "next/link";
import EditForm from "../edit-form";
import { slugifyString } from "@/libs/utils";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import moment from "moment";

export const columns: GridColDef[] = [
  {
    field: "actions",
    type: "actions",
    headerName: "",
    width: 80,
    cellClassName: "actions",
    renderCell: ({ id, row }) => {
      return (
        <div className="flex flex-col items-center gap-2">
          {/* <Link
              prefetch={false}
              title="Редагувати товар"
              href={`/dashboard/products/edit/${id}`}
            >
              <GridActionsCellItem
                icon={<EditIcon />}
                label="Edit"
                className="textPrimary"
                color="inherit"
              />
            </Link> */}
          <EditForm {...{ id }} />

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
        <div className="flex h-20 flex-col items-center justify-between overflow-hidden bg-white">
          <img
            className="mx-auto h-full w-full object-contain"
            src={product.img}
          />
        </div>
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

function Value({ children }: { children: React.ReactNode }) {
  return <div className="text-slate-900">{children}</div>;
}
