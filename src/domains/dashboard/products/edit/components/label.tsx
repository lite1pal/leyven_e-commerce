import { Label } from "flowbite-react";

export default function LabelField({
  id,
  label,
  size = "default",
}: {
  id: string;
  label: string;
  size?: "default" | "large";
}) {
  return (
    <div className="mb-2 block">
      <Label
        className={`${size === "large" && "text-lg"} text-slate-900`}
        htmlFor={id}
        value={label}
      />
    </div>
  );
}
