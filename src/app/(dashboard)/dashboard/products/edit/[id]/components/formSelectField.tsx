import { Label } from "flowbite-react";
import { ReactNode } from "react";
import { FieldValues, UseFormRegister } from "react-hook-form";

type Props = {
  id: string;
  label: string;
  register: UseFormRegister<FieldValues>;
  required?: boolean;
  disabled?: boolean;
  children: ReactNode;
};

export default function FormSelectField({
  id,
  label,
  register,
  required = false,
  disabled = false,
  children,
}: Props) {
  return (
    <div>
      <div className="mb-2 block">
        <Label className="text-slate-900" htmlFor={id} value={label} />
      </div>
      <select
        className="select select-bordered border border-gray-300 bg-gray-50"
        disabled={disabled}
        {...register(id, { required })}
      >
        {children}
      </select>
    </div>
  );
}