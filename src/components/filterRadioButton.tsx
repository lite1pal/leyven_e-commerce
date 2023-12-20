"use client";

import { FormControl, FormLabel, Radio, RadioGroup } from "@mui/joy";
import * as React from "react";

interface IProps {
  header: string;
  labels: String[];
}

export default function FilterRadioButton({ header, labels }: IProps) {
  const [value, setValue] = React.useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  return (
    <FormControl>
      <FormLabel sx={{ fontSize: "0.9rem" }}>{header}</FormLabel>
      <RadioGroup
        name="controlled-radio-buttons-group"
        value={value}
        onChange={handleChange}
        sx={{
          my: 1,
          maxHeight: "10rem",
          overflowY: "scroll",
          overflowX: "hidden",
          height: "fit-content",
        }}
      >
        {labels.map((label, i) => {
          return (
            <Radio
              key={i}
              sx={{ fontSize: "0.9rem", fontWeight: "300" }}
              value={label}
              label={label}
            />
          );
        })}
      </RadioGroup>
    </FormControl>
  );
}
