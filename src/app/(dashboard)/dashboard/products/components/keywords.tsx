"use client";

import { Input } from "@/components/ui/input";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuShortcut,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { Trash } from "lucide-react";
import { Button } from "@/components/ui/button";

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
              <ContextMenu>
                <ContextMenuTrigger>
                  <div
                    key={i}
                    className={
                      "flex h-fit w-fit  cursor-default items-center gap-2 rounded-lg bg-emerald-200 px-3 py-2 text-xs font-medium"
                    }
                  >
                    {keyword}
                  </div>
                </ContextMenuTrigger>
                <ContextMenuContent>
                  <ContextMenuItem onClick={() => deleteKeyword(keyword)}>
                    Видалити
                  </ContextMenuItem>
                </ContextMenuContent>
              </ContextMenu>
            );
          })}
      </div>
    </div>
  );
}
