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
        <Label htmlFor={id} value={label} />
      </div>
      <select disabled={disabled} {...register(id, { required })}>
        {children}
      </select>
    </div>
  );
}
