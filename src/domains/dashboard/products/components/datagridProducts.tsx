"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";

import {
  GridRowsProp,
  GridRowModesModel,
  GridRowModes,
  DataGrid,
  GridColDef,
  GridToolbarContainer,
  GridActionsCellItem,
  GridToolbarQuickFilter,
} from "@mui/x-data-grid";
import {
  randomCreatedDate,
  randomTraderName,
  randomId,
  randomArrayItem,
} from "@mui/x-data-grid-generator";
import moment from "moment";
import Button from "@/components/base/Button";
import Link from "next/link";

const roles = ["Market", "Finance", "Development"];
const randomRole = () => {
  return randomArrayItem(roles);
};

const initialRows: GridRowsProp = [
  {
    id: randomId(),
    name: randomTraderName(),
    age: 25,
    joinDate: randomCreatedDate(),
    role: randomRole(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 36,
    joinDate: randomCreatedDate(),
    role: randomRole(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 19,
    joinDate: randomCreatedDate(),
    role: randomRole(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 28,
    joinDate: randomCreatedDate(),
    role: randomRole(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 23,
    joinDate: randomCreatedDate(),
    role: randomRole(),
  },
];

interface EditToolbarProps {
  setRows: (newRows: (oldRows: GridRowsProp) => GridRowsProp) => void;
  setRowModesModel: (
    newModel: (oldModel: GridRowModesModel) => GridRowModesModel,
  ) => void;
}

function EditToolbar(props: EditToolbarProps) {
  const { setRows, setRowModesModel } = props;

  const handleClick = () => {
    const id = randomId();
    setRows((oldRows) => [...oldRows, { id, name: "", age: "", isNew: true }]);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: "name" },
    }));
  };

  return (
    <GridToolbarContainer className="flex w-full justify-between">
      {/* <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
        Додати товар
      </Button> */}
      <Button title="Додати товар" onClick={handleClick} />
      <GridToolbarQuickFilter
        sx={{
          backgroundColor: "transparent",
        }}
      />
    </GridToolbarContainer>
  );
}

export default function FullFeaturedCrudGrid({ data }: any) {
  // const [rows, setRows] = React.useState(initialRows);

  const columns: GridColDef[] = [
    {
      field: "img",
      headerName: "",
      width: 250,
      renderCell: (params: any) => {
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
      renderCell: (params: any) => {
        return (
          <div
            className={`${
              params.value === "in stock" ? "text-emerald-600" : "text-teal-700"
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
      renderCell: (params: any) => {
        return (
          <div className="font-bold text-teal-700">{params.value} грн</div>
        );
      },
      // valueOptions: ["Market", "Finance", "Development"],
    },
    {
      field: "createdAt",
      headerName: "Дата",
      width: 150,
      renderCell: (params: any) => {
        const product = params.row;
        return (
          <div className="font-medium text-slate-600">
            {moment(product.createdAt).format("hh:mm, DD.MM.YYYY")}
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
      // valueOptions: ["Market", "Finance", "Development"],
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
          ...data.initialState,
          pagination: { paginationModel: { pageSize: 10 } },
        }}
        pageSizeOptions={[10, 25, 50]}
      />
    </div>
  );
}
