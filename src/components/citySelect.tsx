"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { Autocomplete, FormLabel } from "@mui/joy";
import { Label } from "flowbite-react";

export default function CitySelect({
  cityInput,
  setCityInput,
  setWarehouseInput,
  cities,
}: {
  cityInput: string;
  setCityInput: React.Dispatch<React.SetStateAction<string>>;
  setWarehouseInput: React.Dispatch<React.SetStateAction<string>>;
  cities: any;
}) {
  const handleChange = (event: SelectChangeEvent, newValue: any) => {
    setCityInput(newValue["Description"]);
    setWarehouseInput("");
  };

  return (
    <Box>
      <FormControl fullWidth>
        <div className="mb-2 block">
          <Label value="Місто" />
        </div>
        <Autocomplete
          className="py-3.5 rounded shadow-none border-gray-300 bg-white"
          onChange={(e: any, newValue) => handleChange(e, newValue)}
          options={cities}
          getOptionLabel={(option: any) => option["Description"]}
        />
        {/* <InputLabel id="demo-simple-select-label">Місто</InputLabel>
        <Select
          defaultValue={cityInput}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={cityInput}
          label="Місто"
          onChange={handleChange}
        >
          {cities.length > 0 &&
            cities.map((city: any) => {
              return (
                <MenuItem
                  key={city["Ref"]}
                  value={city["Description"].toLowerCase()}
                >
                  {city["Description"]}
                </MenuItem>
              );
            })}
        </Select> */}
      </FormControl>
    </Box>
  );
}
