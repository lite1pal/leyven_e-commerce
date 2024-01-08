import { FieldValues, UseFormRegister } from "react-hook-form";

type Props = {
  label: string;
  id: string;
  type?: "text" | "number";
  defaultValue?: string | number;
  register: UseFormRegister<FieldValues>;
  required?: boolean;
  shadow?: boolean;
  className?: string;
};

const TextInput = ({
  label,
  id,
  type,
  defaultValue,
  register,
  required,
  shadow,
  className,
}: Props) => {
  return (
    <div>
      <div className="mb-2 block">
        <label htmlFor={id} className="block font-medium text-gray-700">
          {label}
        </label>
      </div>
      <input
        id={id}
        type={type}
        defaultValue={defaultValue}
        {...register(id, { required })}
        className={`${shadow ? "shadow" : ""} ${className || ""}`}
      />
    </div>
  );
};

export default TextInput;
