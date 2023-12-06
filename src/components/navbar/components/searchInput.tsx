import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";

export default function SearchInput() {
  const [showInput, setShowInput] = useState(false);
  return (
    <div className="p-1.5 rounded-lg shadow">
      <input
        className="border-none max-h-3 focus:outline-none focus:ring-0"
        type="text"
        placeholder="Пошук"
      />
      <SearchIcon className="transition hover:opacity-80" />
    </div>
  );
}
