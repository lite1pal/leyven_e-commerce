import SearchIcon from "@mui/icons-material/Search";
import { usePathname, useRouter } from "next/navigation";
import {
  ChangeEvent,
  Dispatch,
  KeyboardEventHandler,
  SetStateAction,
  useEffect,
} from "react";

type Props = {
  input: string;
  setInput: Dispatch<SetStateAction<string>>;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

export default function SearchInput({ input, setInput, onChange }: Props) {
  const router = useRouter();
  const pathName = usePathname();

  const searchProductsOnKeyDown = (e: any) => {
    if (e.key === "Enter" && input.length > 0) {
      setInput("");
      router.push(`/search?search=${input}`);
      (document.getElementById("searchModal") as HTMLFormElement).close();
    }
  };

  useEffect(() => {
    setInput("");
    (document.getElementById("searchModal") as HTMLFormElement).close();
  }, [pathName]);

  return (
    <div
      className={`flex items-center justify-between rounded-lg border p-1.5 text-lg max-sm:w-72`}
    >
      <div>
        <SearchIcon className="transition hover:opacity-80" />
      </div>

      <input
        value={input}
        // onChange={searchProductsOnKeyDown}
        onChange={onChange}
        // onChange={(e) => setInput(e.target.value)}
        onKeyDown={searchProductsOnKeyDown}
        className="max-h-5 w-full border-none focus:outline-none focus:ring-0"
        type="text"
        placeholder="Пошук..."
      />
    </div>
  );
}
