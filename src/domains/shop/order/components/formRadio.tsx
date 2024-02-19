import { Label } from "flowbite-react";
import { FieldValues, UseFormRegister } from "react-hook-form";

type Props = {
  id: string;
  label: string;
  options: any[];
  defaultValue?: string;
  register: UseFormRegister<FieldValues>;
};

export default function FormRadio({
  id,
  label,
  options,
  register,
  defaultValue = "",
}: Props) {
  return (
    <div className="w-full">
      <div className="mb-2 block">
        <Label htmlFor={id} value={label} />
      </div>
      {options.map((option: any, i) => {
        return (
          <div key={i} className="form-control">
            <label className="label cursor-pointer py-5">
              <span className="label-text flex items-center gap-2 text-sm">
                {option.img && (
                  <div className="w-5">
                    <img
                      className="rounded-full"
                      src={option.img}
                      alt="Nova poshta image"
                    />
                  </div>
                )}
                {/* <span className="flex flex-col"> */}
                <div>{option.title}</div>
                {option.underTitle && (
                  <div className="text-slate-600"> - {option.underTitle}</div>
                )}
                {/* </span> */}
              </span>
              <input
                {...register(id)}
                type="radio"
                required
                disabled={option.title === "Оплата карткою"}
                value={option.title}
                className="border-blue-600 bg-slate-100"
              />
            </label>
          </div>
        );
      })}
    </div>
  );
}
