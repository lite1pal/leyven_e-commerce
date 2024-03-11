"use client";

import InputLabel from "@mui/material/InputLabel";
import { fetchWarehouses } from "@/services/novaposhta";
import { SyntheticEvent, useEffect, useState } from "react";
import { Autocomplete } from "@mui/joy";
import { FormLabel } from "@/components/ui/form";

export default function WarehouseSelect({
  field,
  cityInput,
  shippingType,
  warehouseInput,
  setWarehouseInput,
}: {
  field: any;
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
    field.onChange(newValue["Description"]);
    setWarehouseInput(newValue["Description"]);
  };

  return (
    <>
      {warehouses.length > 0 && (
        <>
          <FormLabel>
            {shippingType === "warehouse"
              ? "Відділення нової пошти"
              : "Поштомат нової пошти"}
          </FormLabel>

          <Autocomplete
            id="warehouse"
            style={{
              boxShadow: "none",
              borderColor: "#e5e5e5",
              backgroundColor: "white",
              height: "2.5rem",
            }}
            options={warehouses}
            onChange={(e, newValue) => handleChange(e, newValue)}
            getOptionLabel={(option: any) => option["Description"]}
          />
        </>
      )}
      {cityInput && !loading && warehouses.length === 0 && (
        <InputLabel sx={{ color: "red" }} id="demo-simple-select-label">
          На жаль, відділення у цьому місті наразі не працюють
        </InputLabel>
      )}
    </>
  );
}
