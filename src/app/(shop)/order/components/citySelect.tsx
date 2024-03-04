"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import { Autocomplete } from "@mui/joy";
import { Label } from "flowbite-react";
import { FieldValues, UseFormRegister } from "react-hook-form";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { fetchCities } from "@/services/novaposhta";

export default function CitySelect({
  id,
  label,
  setCity,
}: {
  id: "city";
  label: string;
  setCity: Dispatch<SetStateAction<string>>;
}) {
  const [selects, setSelects] = useState([]);

  const handleOnChange = (
    e: React.SyntheticEvent<Element, Event>,
    newValue: any,
  ) => {
    setCity(newValue["Description"]);
  };

  useEffect(() => {
    const getCities = async () => {
      const data = await fetchCities();
      setSelects(data);
    };

    getCities();
  }, []);

  return (
    <Box>
      <FormControl fullWidth>
        <div className="mb-2 block">
          <Label value={label} />
        </div>
        <Autocomplete
          required
          id={id}
          style={{ boxShadow: "none" }}
          options={selects}
          onChange={(e, newValue) => handleOnChange(e, newValue)}
          getOptionLabel={(option: any) => option["Description"]}
        />
      </FormControl>
    </Box>
  );
}
