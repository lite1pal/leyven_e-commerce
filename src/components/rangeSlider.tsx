"use client";

import Box from "@mui/joy/Box";
import Slider from "@mui/joy/Slider";
import * as React from "react";

function valueText(value: number) {
  return `${value}грн`;
}

export default function RangeSlider() {
  const [value, setValue] = React.useState<number[]>([0, 30000]);

  const handleChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number[]);
  };

  return (
    <Box sx={{ width: "80%" }}>
      <Slider
        getAriaLabel={() => "Ціна"}
        value={value}
        onChange={handleChange}
        valueLabelDisplay="auto"
        getAriaValueText={valueText}
      />
    </Box>
  );
}
