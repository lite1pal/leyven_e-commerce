"use client";

import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { fetchWarehouses } from "@/services/novaposhta";
import { useEffect, useState } from "react";
import { Spinner } from "flowbite-react";

export default function WarehouseSelect({ city }: { city: string }) {
  const [input, setInput] = useState("");
  const [warehouses, setWarehouses] = useState([]);
  const [loading, setLoading] = useState(false);

  const getWarehouses = async () => {
    if (city) {
      setLoading(true);
      const data = await fetchWarehouses(city);
      setWarehouses(data);
      setLoading(false);
    }
  };

  useEffect(() => {
    getWarehouses();
  }, [city]);

  const handleChange = (event: SelectChangeEvent) => {
    setInput(event.target.value as string);
  };

  return (
    <Box>
      {warehouses.length > 0 && (
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">
            Відділення нової пошти
          </InputLabel>
          <Select
            defaultValue={input}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={input}
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
    </Box>
  );
}
