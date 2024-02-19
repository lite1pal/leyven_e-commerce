"use client";

import Button from "@/components/base/Button";
import { API_URL } from "@/config/api";
import { categories } from "@/data/categories";
import { type Product } from "@/types";
import { Divider } from "@mui/material";
import { useRouter } from "next/navigation";
import { FieldValues, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import SelectInput from "./selectInput";
import { countries } from "@/data/countries";
import { brands } from "@/data/brands";
import TextInput from "./textInput";
import { useState } from "react";

/*

[
    {
        "g:attribute_name":{"_text":"Країна виробник"},
        "g:attribute_value":{"_text":"Україна"}
    },
    {
        "g:attribute_name":{"_text":"Тип"},
        "g:attribute_value":{"_text":"Таблетки"}
    }
]
 */

type Info = {
  "g:attribute_name": { _text: string };
  "g:attribute_value": { _text: string };
};

export default function AddForm() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    getFieldState,
    watch,
    reset,
    formState: { isDirty },
  } = useForm();

  const [info, setInfo] = useState<Info[]>([]);
  const [curInfoLabel, setCurInfoLabel] = useState("");
  const [curInfoValue, setCurInfoValue] = useState("");

  const watchCategory = watch("category", ""); // you can supply default value as second argument

  const addInfoItem = () => {
    if (curInfoLabel && curInfoValue) {
      setInfo((prev) => {
        return [
          ...prev,
          {
            "g:attribute_name": { _text: curInfoLabel },
            "g:attribute_value": { _text: curInfoValue },
          },
        ];
      });
      setCurInfoLabel("");
      setCurInfoValue("");
      return;
    }
    toast.error("Заповність два поля");
  };

  const onSubmit = async (fields: FieldValues) => {
    try {
      return;
      fields.breadcrumbs =
        categories[fields.category].name +
        ">" +
        categories[fields.category].subCategories[fields.subCategory];
      info.unshift({
        "g:attribute_name": { _text: "Країна виробник" },
        "g:attribute_value": { _text: fields.country },
      });
      fields.info = info;
      const res = await fetch(`${API_URL}/product`, {
        method: "POST",
        body: JSON.stringify(fields),
      });
      const parsedRes: Product = await res.json();
      console.log(parsedRes);
      if (!res.ok) {
        toast.error("Помилка створення");
        reset();
        return;
      }
      toast.success("Створення успішне!");
      router.push("/dashboard/products");
    } catch (err) {
      console.error(err, "Failed to edit product data");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="px-4">
      <div className=" mt-5 flex w-full flex-col gap-3">
        <div className="text-lg font-medium">Додати товар</div>
        <Divider />
        <div className="mb-6 flex max-w-2xl flex-col gap-7">
          <TextInput
            label="Назва товару"
            id="title"
            type="text"
            shadow
            register={register}
            required
          />

          <div>
            <div className="mb-2 block">
              <label
                className="font-medium text-slate-700"
                htmlFor="description"
              >
                Опис
              </label>
            </div>
            <textarea
              className="w-full shadow "
              rows={5}
              cols={50}
              id="description"
              //   shadow
              {...register("description", {
                required: true,
              })}
            ></textarea>
          </div>

          <TextInput
            label="Ціна товару"
            id="price"
            type="number"
            shadow
            register={register}
            required
          />

          <TextInput
            label="Посилання на картинку"
            id="img"
            type="text"
            shadow
            register={register}
            required
          />

          <TextInput
            label="Знижка %"
            id="discount"
            type="number"
            defaultValue={0}
            shadow
            register={register}
            required
          />

          <div>
            <div className="mb-2 block">
              <label
                className="font-medium text-slate-700"
                htmlFor="availability"
              >
                Наявність
              </label>
            </div>
            <select
              id="availability"
              {...register("availability", { required: true })}
            >
              <option value="in stock">Так</option>
              <option value="out of stock">Ні</option>
            </select>
          </div>

          <SelectInput
            label="Країна виробник"
            id="country"
            options={countries}
            register={register}
            required
          />
          <SelectInput
            label="Виробник"
            id="brand"
            options={brands}
            register={register}
            required
          />

          <div>
            <div className="mb-2 block">
              <label className="text-state-700 font-medium" htmlFor="info">
                Додати характеристики{" "}
                <span className="font-light text-slate-600">
                  ( Приклад: Тип - Лікарська форма)
                </span>
              </label>
            </div>
            <div className="flex gap-5">
              <div className="flex flex-col gap-2">
                <label className="font-light" htmlFor="label">
                  Назва
                </label>
                <input
                  onChange={(e) => setCurInfoLabel(e.target.value)}
                  value={curInfoLabel}
                  id="label"
                  type="text"
                />
                <Button onClick={addInfoItem} title="Додати" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-light" htmlFor="value">
                  Значення
                </label>
                <input
                  onChange={(e) => setCurInfoValue(e.target.value)}
                  value={curInfoValue}
                  id="value"
                  type="text"
                />
              </div>
            </div>
            <div className="mt-5 flex flex-col gap-2 p-3">
              {info.map((item, i) => {
                return (
                  <div
                    key={i}
                    className="flex w-fit cursor-default gap-2 rounded-lg border-2 p-3"
                  >
                    <div>{item["g:attribute_name"]._text}</div>
                    <div>{"-"}</div>
                    <div>{item["g:attribute_value"]._text}</div>
                  </div>
                );
              })}
            </div>
          </div>

          <div>
            <div className="mb-2 block">
              <label className="text-state-700 font-medium" htmlFor="category">
                Категорія
              </label>
            </div>
            <select id="category" {...register("category", { required: true })}>
              <option className="pointer-events-none" value=""></option>
              <option value="goduvannya-domashnih-tvarin">
                Годування домашніх тварин і птахів
              </option>
              <option value="tovari-dlya-progulyanok">
                Товари для прогулянок і подорожей з тваринами
              </option>
              <option value="tovari-dlya-komfortu">
                Товари для комфорту домашніх тварин
              </option>
              <option value="tovari-dlya-doglyadu">
                Товари для догляду за домашніми тваринами
              </option>
              <option value="veterinarni-zasobi-preparati">
                Ветеринарні засоби та препарати
              </option>
            </select>
          </div>

          {getFieldState("category").isDirty && (
            <div>
              <div className="mb-2 block">
                <label
                  className="text-state-700 font-medium"
                  htmlFor="subCategory"
                >
                  Підкатегорія
                </label>
              </div>
              <select
                id="subCategory"
                {...register("subCategory", { required: true })}
              >
                {Object.keys(categories[watchCategory].subCategories).map(
                  (subCategory, i) => {
                    return (
                      <option key={i} value={subCategory}>
                        {
                          categories[watchCategory].subCategories[subCategory]
                            .name
                        }
                      </option>
                    );
                  },
                )}
              </select>
            </div>
          )}
        </div>
        <Divider />
        <div className=" pb-5 pt-4">
          <Button type="submit" title="Створити товар" />
        </div>
      </div>
    </form>
  );
}
