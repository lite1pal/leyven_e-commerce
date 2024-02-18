// interface IProps {
//   title: string;
//   onClick?: () => void;
//   type?: "button" | "submit";
//   size?: "lg" | "sm";
//   className?: string;
// }

// export default function Button({
//   title,
//   onClick,
//   type = "button",
//   className,
// }: IProps) {
//   return (
//     <button
//       type={type}
//       onClick={onClick}
//       className={`${className} w-fit rounded border-2 border-blue-600 bg-blue-600 px-5 py-2 text-white transition hover:bg-white hover:text-blue-600 max-sm:px-4 max-sm:py-3 max-sm:text-base`}
//     >
//       {title}
//     </button>
//   );
// }
interface IProps {
  title: string;
  onClick?: () => void;
  type?: "button" | "submit";
  size?: "lg" | "sm";
  className?: string;
  theme?: "blue" | "red" | "green"; // Add theme prop
}

export default function Button({
  title,
  onClick,
  type = "button",
  theme = "blue", // Default theme is blue
}: IProps) {
  // Determine color classes based on theme
  const colorClasses =
    theme === "blue"
      ? "border-blue-600 bg-blue-600 text-white hover:bg-white hover:text-blue-600"
      : theme === "red"
        ? "border-red-600 bg-red-600 text-white hover:bg-white hover:text-red-600"
        : theme === "green"
          ? "border-emerald-600 bg-emerald-600 text-white hover:bg-white hover:text-emerald-600"
          : ""; // Default to blue if theme is not recognized

  return (
    <button
      type={type}
      onClick={onClick}
      className={`w-fit rounded border-2 px-5 py-2 transition max-sm:px-4 max-sm:py-3 max-sm:text-base ${colorClasses}`}
    >
      {title}
    </button>
  );
}
