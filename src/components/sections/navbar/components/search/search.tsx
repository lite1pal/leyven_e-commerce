"use client";

import { Dispatch, SetStateAction, useState } from "react";
import DesktopInput from "./components/mobileSearch";
import MobileInput from "./components/desktopSearch";

export type SearchInputProps = {
  input: string;
  setInput: Dispatch<SetStateAction<string>>;
};

export default function Search() {
  const [input, setInput] = useState("");

  return (
    <>
      <DesktopInput {...{ input, setInput }} />
      <MobileInput {...{ input, setInput }} />
    </>
  );
}
