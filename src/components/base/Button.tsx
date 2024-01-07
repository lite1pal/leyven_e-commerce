interface IProps {
  title: string;
  onClick?: () => void;
  type?: "button" | "submit";
  size?: "lg" | "sm";
}

export default function Button({ title, onClick, type = "button" }: IProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`w-fit rounded border-2 border-blue-600 bg-blue-600 px-5 py-2 text-lg text-white transition hover:bg-white hover:text-blue-600 max-sm:px-4 max-sm:py-3 max-sm:text-base`}
    >
      {title}
    </button>
  );
}
