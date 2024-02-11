"use client";

import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { fetchWarehouses } from "@/services/novaposhta";
import { SyntheticEvent, useEffect, useState } from "react";
import { Label, Spinner } from "flowbite-react";
import { Autocomplete } from "@mui/joy";

export default function WarehouseSelect({
  cityInput,
  shippingType,
  warehouseInput,
  setWarehouseInput,
}: {
  shippingType: string;
  cityInput: string;
  warehouseInput: string;
  setWarehouseInput: React.Dispatch<React.SetStateAction<string>>;
}) {
  const [warehouses, setWarehouses] = useState([]);
  const [loading, setLoading] = useState(false);

  const getWarehouses = async () => {
    if (cityInput) {
      setLoading(true);
      const data = await fetchWarehouses(cityInput, shippingType);

      setWarehouses(data);
      setLoading(false);
    }
  };

  useEffect(() => {
    getWarehouses();
  }, [cityInput, shippingType]);

  const handleChange = (e: SyntheticEvent<Element, Event>, newValue: any) => {
    setWarehouseInput(newValue["Description"]);
  };

  return (
    <Box>
      {warehouses.length > 0 && (
        <FormControl fullWidth>
          <div className="mb-2 block">
            <Label
              value={
                shippingType === "Нова пошта Відділення"
                  ? "Відділення нової пошти"
                  : "Поштомат нової пошти"
              }
            />
          </div>

          <Autocomplete
            required
            id="warehouse"
            style={{ boxShadow: "none" }}
            options={warehouses}
            onChange={(e, newValue) => handleChange(e, newValue)}
            getOptionLabel={(option: any) => option["Description"]}
          />
        </FormControl>
      )}
      {cityInput && !loading && warehouses.length === 0 && (
        <InputLabel sx={{ color: "red" }} id="demo-simple-select-label">
          На жаль, відділення у цьому місті наразі не працюють
        </InputLabel>
      )}
    </Box>
  );
}
