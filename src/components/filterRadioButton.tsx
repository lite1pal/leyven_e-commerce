"use client";

import { FormControl, FormLabel, Radio, RadioGroup } from "@mui/joy";
import { usePathname, useRouter } from "next/navigation";
import * as React from "react";

interface IProps {
  header: string;
  labels: String[];
  link?: string;
}

export default function FilterRadioButton({ header, labels, link }: IProps) {
  const [value, setValue] = React.useState("");
  const router = useRouter();
  const pathName = usePathname();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    if (link) {
      router.push(`${pathName}${link}${event.target.value.toLowerCase()}`);
    }
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
          overflowY: labels.length > 5 ? "auto" : "hidden",
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
