"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { fetchWarehouses } from "@/services/novaposhta";

export default function WarehouseSelect() {
  const [input, setInput] = React.useState("");
  const [warehouses, setWarehouses] = React.useState([]);

  const getWarehouses = async () => {
    const data = await fetchWarehouses();
    setWarehouses(data);
  };

  React.useEffect(() => {
    getWarehouses();
  }, []);

  const handleChange = (event: SelectChangeEvent) => {
    setInput(event.target.value as string);
  };

  return (
    <Box>
      <FormControl fullWidth>
        {/* <div className="mb-2">
          <Label htmlFor="repeat-password" value="Місто" />
        </div> */}
        <InputLabel id="demo-simple-select-label">
          Відділення нової пошти
        </InputLabel>
        {warehouses.length > 0 && (
          <Select
            defaultValue={warehouses[0]["Description"]}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={warehouses[0]["Description"]}
            label="Відділення нової пошти"
            onChange={handleChange}
          >
            {warehouses.map((warehouse, i) => {
              return (
                <MenuItem key={i} value={warehouse["Description"]}>
                  {warehouse["Description"]}
                </MenuItem>
              );
            })}
          </Select>
        )}
      </FormControl>
    </Box>
  );
}
