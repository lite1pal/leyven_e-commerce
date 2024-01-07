"use client";

import {
  changeArrayValue,
  getArrayValueByKey,
  getDecodedFilters,
  getFiltersPathName,
} from "@/libs/utils";
import { FormControl, FormLabel, Radio, RadioGroup } from "@mui/joy";
import { useParams, usePathname, useRouter } from "next/navigation";
import * as React from "react";

interface IProps {
  type: "instock" | "country" | "brand";
  header: string;
  labels: String[];
  link?: string;
}

export default function FilterRadioButton({
  type,
  header,
  labels,
  link,
}: IProps) {
  const params = useParams();
  // current filters
  const filters = getDecodedFilters(params.filters as string);
  const [value, setValue] = React.useState(
    getArrayValueByKey(filters, type) || "Всі",
  );
  const router = useRouter();
  const pathName = usePathname();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);

    const newFilters = changeArrayValue(filters, type, event.target.value);

    router.push(getFiltersPathName(newFilters, pathName));
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
