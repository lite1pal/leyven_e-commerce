"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
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
  const handleChange = (event: SelectChangeEvent) => {
    setCityInput(event.target.value as string);
    setWarehouseInput("");
  };

  return (
    <Box>
      <FormControl fullWidth>
        {/* <div className="mb-2">
          <Label htmlFor="repeat-password" value="Місто" />
        </div> */}
        <InputLabel id="demo-simple-select-label">Місто</InputLabel>
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
          {/* <MenuItem value={"київ"}>Київ</MenuItem>
          <MenuItem value={"звягель"}>Звягель</MenuItem>
          <MenuItem value={"житомир"}>Житомир</MenuItem>
          <MenuItem value={"ірпінь"}>Ірпінь</MenuItem>
          <MenuItem value={"львів"}>Львів</MenuItem> */}
        </Select>
      </FormControl>
    </Box>
  );
}
