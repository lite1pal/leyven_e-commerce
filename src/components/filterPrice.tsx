"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { FormControl, FormLabel } from "@mui/joy";

function valuetext(value: number) {
  return `${value}°C`;
}

export default function PriceFilter() {
  const [value, setValue] = React.useState<number[]>([0, 10000]);

  const handleChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number[]);
  };

  return (
    <FormControl>
      <FormLabel>Ціна</FormLabel>
      <Slider
        size="small"
        getAriaLabel={() => "Ціна"}
        value={value}
        onChange={handleChange}
        valueLabelDisplay="auto"
        getAriaValueText={valuetext}
      />
    </FormControl>
  );
}
