import { type SearchInputProps } from "../search";
import SearchInput from "./searchInput";
import { ChangeEvent, useState } from "react";
import { getProducts } from "@/app/actions";
import SearchResults from "./searchResults";
import { useRouter } from "next/navigation";

export default function DesktopInput({ input, setInput }: SearchInputProps) {
  const [searchResults, setSearchResults] = useState<any>([]);
  const router = useRouter();

  const searchProducts = async (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
    if (e.target.value.length > 0) {
      const getProductsBySearch = getProducts.bind(null, input);
      const result = await getProductsBySearch();
      setSearchResults(result.products);
    } else {
      setSearchResults([]);
    }
  };

  return (
    <div className={`relative hidden md:flex`}>
      <SearchInput
        input={input}
        setInput={setInput}
        onChange={searchProducts}
      />
      {/* <div className="absolute right-0 top-12 max-h-96 overflow-y-scroll rounded-lg border">
        <SearchResults data={searchResults} />
      </div> */}
    </div>
  );
}
