"use client";

import { Input } from "@/components/ui/input";

import { X } from "lucide-react";

export default function EditKeywords({
  keywords,
  field,
}: {
  keywords: string;
  field: any;
}) {
  const addKeyword = (keyword: string) => {
    if (!keywords) {
      field.onChange(keyword);
      return;
    }
    const filteredKeywords = keywords.split(", ").concat([keyword]).join(", ");
    field.onChange(filteredKeywords);
  };

  const deleteKeyword = (keyword: string) => {
    const filteredKeywords = keywords
      .split(", ")
      .filter((key: string) => key !== keyword)
      .join(", ");
    field.onChange(filteredKeywords);
  };

  return (
    <div className="w-full">
      <Input
        id="keywords"
        onKeyDown={(e: any) => {
          if (e.key === "Enter") {
            e.preventDefault();
            if (e.target.value.length > 0) {
              addKeyword(e.target.value);
              e.target.value = "";
            }
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
                className={
                  "flex h-fit w-fit  cursor-default items-center gap-2 rounded-lg bg-emerald-200 px-3 py-2 text-xs font-medium"
                }
              >
                <X onClick={() => deleteKeyword(keyword)} />
                {keyword}
              </div>
            );
          })}
      </div>
    </div>
  );
}
