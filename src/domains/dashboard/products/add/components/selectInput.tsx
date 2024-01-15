import { FieldValues, UseFormRegister } from "react-hook-form";

type Props = {
  label: string;
  id: string;
  options: string[];
  register: UseFormRegister<FieldValues>;
  required?: boolean;
};

const SelectInput = ({ label, id, options, register, required }: Props) => {
  return (
    <div>
      <div className="mb-2 block">
        <label htmlFor={id} className="text-state-700 block font-medium">
          {label}
        </label>
      </div>
      <select id={id} {...register(id, { required })} className="form-select">
        <option className="pointer-events-none" value=""></option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectInput;
