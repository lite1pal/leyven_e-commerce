"use client";

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  changeArrayValue,
  getArrayValueByKey,
  getDecodedFilters,
  getFiltersPathName,
} from "@/libs/utils";
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
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
  const searchParams = useSearchParams();
  const search = searchParams.get("search");

  // current filters
  const filters = getDecodedFilters(params.filters as string);
  const [value, setValue] = React.useState(
    getArrayValueByKey(filters, type) || "Всі",
  );
  const router = useRouter();
  const pathName = usePathname();

  const handleChange = (value: string) => {
    setValue(value);

    const newFilters = changeArrayValue(filters, type, value);

    router.push(getFiltersPathName(newFilters, pathName, search));
  };

  return (
    <div className="flex flex-col gap-4">
      <Label>{header}</Label>
      <RadioGroup
        value={value}
        onValueChange={handleChange}
        style={{
          marginBlock: 1,
          maxHeight: "10rem",
          overflowY: labels.length > 5 ? "auto" : "hidden",
          overflowX: "hidden",
          height: "fit-content",
        }}
        className="gap-4"
        defaultValue={value}
      >
        {labels.map((label, i) => {
          return (
            <div key={i} className="flex items-center space-x-2">
              <RadioGroupItem value={label.toString()} id={label.toString()} />
              <Label className="font-normal" htmlFor={label.toString()}>
                {label}
              </Label>
            </div>
          );
        })}
      </RadioGroup>
    </div>
  );
}
