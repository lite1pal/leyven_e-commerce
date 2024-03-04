"use client";

import * as React from "react";
import { Slider } from "@mui/joy";
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import {
  changeArrayValue,
  getArrayValueByKey,
  getDecodedFilters,
  getFiltersPathName,
} from "@/libs/utils";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function PriceFilter() {
  const router = useRouter();
  const pathName = usePathname();

  const params = useParams();

  const searchParams = useSearchParams();
  const search = searchParams.get("search");

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
  };

  return (
    <div>
      <Label htmlFor="slider">Ціна</Label>
      <Slider
        id="slider"
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

          router.push(getFiltersPathName(newNewFilters, pathName, search));
        }}
        max={5000}
        onChange={handleChange}
        valueLabelDisplay="auto"
      />
      <div className="flex gap-3">
        <Input
          value={value[0]}
          className="pointer-events-none w-full border-0 border-b-2 p-3 text-xs"
        />
        <Input
          value={value[1]}
          className="pointer-events-none w-full border-0 border-b-2 p-3 text-xs"
        />
      </div>
    </div>
  );
}
