import { type SearchInputProps } from "../search";
import SearchInput from "./searchInput";
import { ChangeEvent, useEffect, useState } from "react";
import { getProductsAction } from "@/actions";
import { usePathname, useRouter } from "next/navigation";
import SearchResults from "./searchResults";

export default function DesktopInput({ input, setInput }: SearchInputProps) {
  const [searchResults, setSearchResults] = useState<any>([]);
  const router = useRouter();
  const pathName = usePathname();

  const searchProducts = async (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
    if (e.target.value.length > 0) {
      const getProductsBySearch = getProductsAction.bind(null, input);
      const result = await getProductsBySearch();
      setSearchResults(result.products);
    } else {
      setSearchResults([]);
    }
  };

  useEffect(() => {
    setInput("");
  }, [pathName]);

  return (
    <div className={`relative hidden md:flex`}>
      <SearchInput
        input={input}
        setInput={setInput}
        onChange={searchProducts}
      />
      {input.length > 0 && (
        <div
          style={{ width: "50rem" }}
          className="absolute left-0 top-14 mx-auto max-h-96 -translate-x-1/2 transform overflow-y-scroll rounded-lg shadow-xl"
        >
          <SearchResults data={searchResults} />
        </div>
      )}
    </div>
  );
}
