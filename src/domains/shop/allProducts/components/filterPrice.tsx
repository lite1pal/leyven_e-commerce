"use client";

import * as React from "react";
import { FormControl, FormLabel, Slider } from "@mui/joy";
import { useParams, usePathname, useRouter } from "next/navigation";
import {
  changeArrayValue,
  getArrayValueByKey,
  getDecodedFilters,
  getFiltersPathName,
} from "@/libs/utils";

export default function PriceFilter() {
  const router = useRouter();
  const pathName = usePathname();

  const params = useParams();

  // current filters
  const filters = getDecodedFilters(params.filters as string);
  const minValue = parseInt(getArrayValueByKey(filters, "price_from"));
  const maxValue = parseInt(getArrayValueByKey(filters, "price_to"));

  const [value, setValue] = React.useState<number[]>([
    minValue || 0,
    maxValue || 5000,
  ]);

  const handleChange = (
    event: Event | React.SyntheticEvent<Element, Event>,
    newValue: number | number[],
  ) => {
    setValue(newValue as number[]);
    console.log(newValue);
  };

  return (
    <FormControl>
      <FormLabel>Ціна</FormLabel>
      <Slider
        getAriaLabel={() => "Temperature range"}
        value={value}
        onChangeCommitted={(e, newValue: any) => {
          const newFilters = changeArrayValue(
            filters,
            "price_from",
            newValue[0],
          );
          const newNewFilters = changeArrayValue(
            newFilters,
            "price_to",
            newValue[1],
          );

          router.push(getFiltersPathName(newNewFilters, pathName));
        }}
        max={5000}
        onChange={handleChange}
        valueLabelDisplay="auto"
      />
      <div className="flex gap-3">
        <input
          value={value[0]}
          className="pointer-events-none w-full border-0 border-b-2 p-3 text-xs"
          type="text"
        />
        <input
          value={value[1]}
          className="pointer-events-none w-full border-0 border-b-2 p-3 text-xs"
          type="text"
        />
      </div>
    </FormControl>
  );
}
