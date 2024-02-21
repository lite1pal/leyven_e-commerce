"use client";

import { Dispatch, SetStateAction } from "react";
import { FieldValues, UseFormRegister } from "react-hook-form";
import CloseIcon from "@mui/icons-material/Close";
import LabelField from "./label";
import { TextInput } from "flowbite-react";

export default function EditKeywords({
  setKeywords,
  keywords,
  register,
}: {
  setKeywords: Dispatch<SetStateAction<string>>;
  keywords: string;
  register: UseFormRegister<FieldValues>;
}) {
  const addKeyword = (keyword: string) => {
    if (!keywords) {
      setKeywords(keyword);
      return;
    }
    const filteredKeywords = keywords.split(", ").concat([keyword]).join(", ");
    setKeywords(filteredKeywords);
  };

  const deleteKeyword = (keyword: string) => {
    const filteredKeywords = keywords
      .split(", ")
      .filter((key: string) => key !== keyword)
      .join(", ");
    setKeywords(filteredKeywords);
  };

  return (
    <div className="w-full">
      <LabelField id="keywords" label="Ключові слова" />

      <TextInput
        id="keywords"
        onKeyDown={(e: any) => {
          if (e.key === "Enter") {
            e.preventDefault();
            addKeyword(e.target.value);
            e.target.value = "";
          }
        }}
        placeholder="Перечисліть ключові слова через кому та пробел. Натисніть Enter, щоб додати"
      />

      <div className="mt-5 flex w-full flex-wrap gap-3">
        {keywords.length > 0 &&
          keywords.split(", ").map((keyword: string, i) => {
            return (
              <div
                key={i}
                className="flex h-fit w-fit items-center gap-2 rounded-lg bg-emerald-600 px-3 py-2 text-xs text-white"
              >
                <div onClick={() => deleteKeyword(keyword)}>
                  <CloseIcon fontSize="small" />
                </div>
                {keyword}
              </div>
            );
          })}
      </div>
    </div>
  );
}
