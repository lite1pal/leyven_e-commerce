import { Label, TextInput, Textarea } from "flowbite-react";
import { FieldValues, UseFormRegister } from "react-hook-form";

type Props = {
  id: string;
  label: string;
  defaultValue: string | number;
  type?: "text" | "number" | "textarea";
  register: UseFormRegister<FieldValues>;
  rows?: number;
  required?: boolean;
  disabled?: boolean;
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
}: Props) {
  return (
    <div>
      <div className="mb-2 block">
        <Label htmlFor={id} value={label} />
      </div>
      {type === "textarea" ? (
        <Textarea
          id={id}
          defaultValue={defaultValue}
          rows={rows}
          disabled={disabled}
          required={required}
          shadow
          {...register(id, { required })}
        />
      ) : (
        <TextInput
          id={id}
          defaultValue={defaultValue}
          type={type}
          required={required}
          disabled={disabled}
          shadow
          {...register(id, {
            required,
          })}
        />
      )}
    </div>
  );
}
