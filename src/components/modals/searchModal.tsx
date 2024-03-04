import SearchIcon from "@mui/icons-material/Search";
import { SearchInputProps } from "../layout/navbar/components/search/search";
import { getProducts } from "@/app/actions";
import { ChangeEvent, useState } from "react";
import SearchInput from "../layout/navbar/components/search/components/searchInput";
import SearchResults from "../layout/navbar/components/search/components/searchResults";

export default function SearchModal({ input, setInput }: SearchInputProps) {
  const [searchResults, setSearchResults] = useState<any>([]);

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
        <div className="modal-box flex flex-col bg-white">
          <SearchInput
            input={input}
            setInput={setInput}
            onChange={searchProducts}
          />
          <SearchResults data={searchResults} />
        </div>
        <form method="dialog" className="modal-backdrop">
          <button onClick={() => setInput("")}>close</button>
        </form>
      </dialog>
    </div>
  );
}
