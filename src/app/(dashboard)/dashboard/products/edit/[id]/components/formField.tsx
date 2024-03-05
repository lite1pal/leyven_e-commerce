import { Label, TextInput, Textarea } from "flowbite-react";
import { FieldValues, UseFormRegister } from "react-hook-form";

type Props = {
  id: string;
  label: string;
  defaultValue: string | number;
  type?: "text" | "number" | "textarea" | "email";
  register: UseFormRegister<FieldValues>;
  rows?: number;
  required?: boolean;
  disabled?: boolean;
  placeholder?: string;
  border?: boolean;
};

export default function FormField({
  id,
  label,
  defaultValue,
  type = "text",
  register,
  rows,
  required = false,
  disabled = false,
  placeholder,
  border = false,
}: Props) {
  return (
    <div className="w-full">
      <div className="mb-2 block">
        <Label className="text-slate-900" htmlFor={id} value={label} />
      </div>
      {type === "textarea" ? (
        <Textarea
          id={id}
          defaultValue={defaultValue}
          rows={rows}
          disabled={disabled}
          style={border ? {} : { border: "none" }}
          required={required}
          shadow
          {...register(id, { required })}
        />
      ) : (
        <TextInput
          id={id}
          defaultValue={defaultValue}
          placeholder={placeholder}
          type={type}
          required={required}
          disabled={disabled}
          style={border ? {} : { border: "none" }}
          shadow
          {...register(id, {
            required,
          })}
        />
      )}
    </div>
  );
}