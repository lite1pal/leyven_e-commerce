"use client";

import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import EditToolbar from "./toolbar";
import { API_URL } from "@/config/api";
import { useEffect, useState } from "react";
import { columns } from "./columns";
import { Button } from "@/components/ui/button";
import { RefreshCcw } from "lucide-react";

export default function DataTableProducts() {
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

  useEffect(() => {
    fetchData();
  }, [sortModel, filterModel, paginationModel]);

  return (
    <div className="mx-auto flex w-full flex-col">
      <div className="flex items-center justify-between">
        <div className="pb-4 text-slate-500">{rowCountState} позицій</div>
        <Button
          onClick={fetchData}
          variant="outline"
          className="flex items-center gap-2"
        >
          <RefreshCcw className="w-4" />
          Поновить
        </Button>
      </div>
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
