"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { Label } from "flowbite-react";

export default function CitySelect() {
  const [city, setCity] = React.useState("Малин");

  const handleChange = (event: SelectChangeEvent) => {
    setCity(event.target.value as string);
  };

  return (
    <Box>
      <FormControl fullWidth>
        {/* <div className="mb-2">
          <Label htmlFor="repeat-password" value="Місто" />
        </div> */}
        <InputLabel id="demo-simple-select-label">Місто</InputLabel>
        <Select
          defaultValue={city}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={city}
          label="Місто"
          onChange={handleChange}
        >
          <MenuItem value={"Малин"}>Малин</MenuItem>
          <MenuItem value={"Київ"}>Київ</MenuItem>
          <MenuItem value={"Звягіль"}>Звягіль</MenuItem>
          <MenuItem value={"Житомир"}>Житомир</MenuItem>
          <MenuItem value={"Ірпінь"}>Ірпінь</MenuItem>
          <MenuItem value={"Львів"}>Львів</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
