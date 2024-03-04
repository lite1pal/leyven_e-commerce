import { type SearchInputProps } from "../search";
import SearchModal from "@/components/modals/searchModal";

export default function MobileInput({ input, setInput }: SearchInputProps) {
  return <SearchModal {...{ input, setInput }} />;
}
