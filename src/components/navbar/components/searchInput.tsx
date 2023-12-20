"use client";

import SearchIcon from "@mui/icons-material/Search";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

export default function SearchInput() {
  const [showInput, setShowInput] = useState(false);
  const [input, setInput] = useState("");

  const router = useRouter();
  const pathName = usePathname();

  return (
    <div className="p-1.5 rounded-lg shadow max-sm:w-72">
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            setInput("");
            router.push(`/search?search=${input}`);
          }
        }}
        className="border-none max-h-3 focus:outline-none focus:ring-0"
        type="text"
        placeholder="Пошук"
      />
      <SearchIcon className="transition hover:opacity-80" />
    </div>
  );
}
