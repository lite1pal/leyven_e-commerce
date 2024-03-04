interface IProps {
  title: string;
  onClick?: () => void;
  type?: "button" | "submit";
  size?: "lg" | "sm";
  className?: string;
  theme?: "blue" | "dark" | "green"; // Add theme prop
  disabled?: boolean;
}

export default function Button({
  title,
  onClick,
  type = "button",
  theme = "blue", // Default theme is blue
  disabled = false,
}: IProps) {
  // Determine color classes based on theme
  const colorClasses =
    theme === "blue"
      ? "border-blue-600 bg-blue-600 text-white hover:bg-white hover:text-blue-600"
      : theme === "dark"
        ? "border-slate-900 font-light bg-slate-900 text-white hover:bg-white hover:text-slate-900"
        : theme === "green"
          ? "border-emerald-600 bg-emerald-600 text-white hover:bg-white hover:text-emerald-600"
          : ""; // Default to blue if theme is not recognized

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`w-fit rounded border-2 px-5 py-2 transition max-sm:px-4 max-sm:py-3 max-sm:text-base ${colorClasses}`}
    >
      {title}
    </button>
  );
}
