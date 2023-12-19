import { MouseEventHandler } from "react";

interface IProps {
  title: string;
  onClick?: () => void;
  type?: "button" | "submit";
  size?: "lg" | "sm";
}

export default function Button({
  title,
  onClick,
  type = "button",
  size = "sm",
}: IProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`max-sm:px-4 max-sm:py-3 max-sm:text-base px-5 py-2 text-lg rounded text-white bg-blue-600 border-2 border-blue-600 transition hover:bg-white hover:text-blue-600`}
    >
      {title}
    </button>
  );
}
