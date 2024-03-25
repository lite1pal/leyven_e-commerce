import toast from "react-hot-toast";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";

export default function EditInfo({ info, field }: { info: any; field: any }) {
  const addInfoItem = (newValue: string) => {
    if (!newValue.includes(" - ")) {
      toast.error(
        "Впевніться, що нова характеристика має наступну форму: Назва - значення",
      );
      return;
    }
    if (!newValue.split(" - ")[0]) {
      toast.error("Ви не додали назву");
    }
    if (!newValue.split(" - ")[1]) {
      toast.error("Ви не додали значення");
    }
    const updatedInfo = [
      ...info,
      {
        "g:attribute_name": { _text: newValue.split(" - ")[0] },
        "g:attribute_value": { _text: newValue.split(" - ")[1] },
      },
    ];
    field.onChange(updatedInfo);
  };

  const deleteInfoItem = (item: any) => {
    const filteredInfo = info.filter(
      (i: any) =>
        i["g:attribute_name"]._text !== item["g:attribute_name"]._text,
    );
    field.onChange(filteredInfo);
  };

  return (
    <div>
      <Input
        id="info"
        onKeyDown={(e: any) => {
          if (e.key === "Enter") {
            e.preventDefault();
            if (e.target.value.length > 0) {
              addInfoItem(e.target.value);
              e.target.value = "";
            }
          }
        }}
        placeholder="Додайте нову характеристику через дефіс з пробілами. Натисніть Enter, щоб додати"
      />
      <div className="mt-5 flex flex-wrap gap-3">
        {info.map((item: any, i: number) => {
          return (
            <div
              key={i}
              className="flex w-fit cursor-default flex-wrap items-center gap-2 rounded-lg bg-blue-200 px-3 py-2 text-xs font-medium"
            >
              <X onClick={() => deleteInfoItem(item)} />
              <div>{item["g:attribute_name"]._text}</div>
              <div>{"-"}</div>
              <div>{item["g:attribute_value"]._text}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
