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
    <div className="flex items-center justify-between rounded-lg border p-1.5 text-lg shadow max-sm:w-72">
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && input) {
            setInput("");
            router.push(`/search?search=${input}`);
          }
        }}
        className="max-h-5 w-full border-none focus:outline-none focus:ring-0"
        type="text"
        placeholder="Пошук"
      />
      <div
        onClick={() => {
          if (input) {
            setInput("");
            router.push(`/search?search=${input}`);
          }
        }}
      >
        <SearchIcon className="transition hover:opacity-80" />
      </div>
    </div>
  );
}
