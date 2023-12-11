"use client";

import * as React from "react";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Radio from "@mui/joy/Radio";
import RadioGroup from "@mui/joy/RadioGroup";

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
      <FormLabel sx={{ fontSize: "1rem" }}>{header}</FormLabel>
      <RadioGroup
        // defaultValue={labels[0]}
        name="controlled-radio-buttons-group"
        value={value}
        onChange={handleChange}
        sx={{ my: 1 }}
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
        {/* <Radio value="dog" label="Собака" />
        <Radio value="cat" label="Кіт" />
        <Radio value="horse" label="Кінь" /> */}
      </RadioGroup>
    </FormControl>
  );
}
