"use client";

import { Autocomplete } from "@mui/joy";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { fetchCities } from "@/services/novaposhta";
import { FormLabel } from "@/components/ui/form";

export default function CitySelect({
  setCity,
  field,
}: {
  setCity: Dispatch<SetStateAction<string>>;
  field: any;
}) {
  const [selects, setSelects] = useState([]);

  const handleOnChange = (
    e: React.SyntheticEvent<Element, Event>,
    newValue: any,
  ) => {
    field.onChange(newValue["Description"]);
    setCity(newValue["Description"]);
  };

  useEffect(() => {
    const getCities = async () => {
      const data = await fetchCities();
      setSelects(data);
    };

    getCities();
  }, []);

  return (
    <>
      <FormLabel>Місто</FormLabel>
      <Autocomplete
        id={"city"}
        style={{
          boxShadow: "none",
          borderColor: "#e5e5e5",
          backgroundColor: "white",
          height: "2.5rem",
        }}
        options={selects}
        onChange={(e, newValue) => handleOnChange(e, newValue)}
        getOptionLabel={(option: any) => option["Description"]}
      />
    </>
  );
}
