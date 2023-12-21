"use client";

import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { fetchWarehouses } from "@/services/novaposhta";
import { useEffect, useState } from "react";
import { Label, Spinner } from "flowbite-react";

export default function WarehouseSelect({
  cityInput,
  warehouseInput,
  setWarehouseInput,
}: {
  cityInput: string;
  warehouseInput: string;
  setWarehouseInput: React.Dispatch<React.SetStateAction<string>>;
}) {
  const [warehouses, setWarehouses] = useState([]);
  const [loading, setLoading] = useState(false);

  const getWarehouses = async () => {
    if (cityInput) {
      setLoading(true);
      const data = await fetchWarehouses(cityInput);
      setWarehouses(data);
      setLoading(false);
    }
  };

  useEffect(() => {
    getWarehouses();
  }, [cityInput]);

  const handleChange = (event: SelectChangeEvent) => {
    setWarehouseInput(event.target.value as string);
  };

  return (
    <Box>
      {warehouses.length > 0 && (
        <FormControl fullWidth>
          {/* <div className="mb-2 block">
            <Label value="Відділення нової пошти" />
          </div> */}
          <InputLabel id="demo-simple-select-label">
            Відділення нової пошти
          </InputLabel>
          <Select
            defaultValue={warehouseInput}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={warehouseInput}
            label="Відділення нової пошти"
            onChange={handleChange}
            className={`${loading && "pointer-events-none"}`}
          >
            {warehouses.map((warehouse, i) => {
              return (
                <MenuItem key={i} value={warehouse["Description"]}>
                  {warehouse["Description"]}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      )}
      {cityInput && warehouses.length === 0 && (
        <InputLabel sx={{ color: "red" }} id="demo-simple-select-label">
          На жаль, відділення у цьому місті наразі не працюють
        </InputLabel>
      )}
    </Box>
  );
}
