"use client";

import SearchIcon from "@mui/icons-material/Search";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

export default function SearchInput() {
  const [input, setInput] = useState("");

  const router = useRouter();

  return (
    <>
      <div className="md:hidden">
        <SearchIcon
          onClick={() => {
            (
              document.getElementById("searchModal") as HTMLFormElement
            ).showModal();
          }}
          className="transition hover:opacity-80"
        />

        <dialog id="searchModal" className="modal">
          <div className="modal-box flex bg-white">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && input) {
                  setInput("");
                  router.push(`/search?search=${input}`);
                  (
                    document.getElementById("searchModal") as HTMLFormElement
                  ).close();
                }
              }}
              type="text"
              className="mx-auto w-full rounded-lg border-b-2 border-none bg-transparent text-slate-900 focus:outline-none focus:ring-0"
            />
          </div>
          <form method="dialog" className="modal-backdrop">
            <button>close</button>
          </form>
        </dialog>
      </div>

      <div
        className={`hidden items-center justify-between rounded-lg border p-1.5 text-lg max-sm:w-72 md:flex`}
      >
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
          placeholder="Пошук..."
        />
      </div>
    </>
  );
}
