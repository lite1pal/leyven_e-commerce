import { type Product } from "@/types";
import { Label, TextInput } from "flowbite-react";
import CloseIcon from "@mui/icons-material/Close";
import toast from "react-hot-toast";
import { useEffect } from "react";

export default function EditInfo({
  data,
  info,
  setInfo,
}: {
  data: Product;
  info: any;
  setInfo: any;
}) {
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
    setInfo(updatedInfo);
  };

  const deleteInfoItem = (item: any) => {
    const filteredInfo = info.filter(
      (i: any) =>
        i["g:attribute_name"]._text !== item["g:attribute_name"]._text,
    );
    setInfo(filteredInfo);
  };

  return (
    <div>
      <div className="mb-2 block">
        <Label
          className="text-slate-900"
          htmlFor="img"
          value="Характеристики"
        />
      </div>
      <TextInput
        id="info"
        onKeyDown={(e: any) => {
          if (e.key === "Enter") {
            addInfoItem(e.target.value);
            e.target.value = "";
          }
        }}
        placeholder="Додайте нову характеристику через дефіс з пробілами. Натисніть Enter, щоб додати"
      />
      <div className="mt-5 flex flex-wrap gap-3">
        {info.map((item: any, i: number) => {
          return (
            <div
              key={i}
              className="flex w-fit cursor-default flex-wrap items-center gap-2 rounded-lg bg-blue-600 px-3 py-2 text-xs text-white"
            >
              <div onClick={() => deleteInfoItem(item)}>
                <CloseIcon fontSize="small" />
              </div>
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
