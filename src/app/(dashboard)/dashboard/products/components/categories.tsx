import { API_URL } from "@/config/api";
import { type Product } from "@/types";
import { Label } from "flowbite-react";
import { FieldValues, UseFormRegister } from "react-hook-form";

export default async function SelectCategories({
  data,
  field,
}: {
  data?: Product;
  field: any;
}) {
  const res = await fetch(`${API_URL}/categories`, { cache: "no-store" });
  const categories = await res.json();

  const childCategories = categories.filter((c: any) => c.parentId);

  const currentCategory = data
    ? categories.find((c: any) => c.categoryId === data.categoryId)
    : "";

  return (
    <div>
      <div className="mb-2 block">
        <Label
          className="text-slate-900"
          htmlFor="category"
          value="Категорія"
        />
      </div>
      <select
        id="category"
        defaultValue={currentCategory?.categoryId || "Rick and Morty"}
        required
        className="select select-bordered w-full border border-gray-300 bg-gray-50"
        // {...register("categoryId", { required: true })}
        {...field}
      >
        <option value={"Вибрати категорію"} disabled>
          Вибрати категорію
        </option>
        {childCategories.map((category: any) => {
          return (
            <option value={category.categoryId} key={category.id}>
              {category.title}
            </option>
          );
        })}
      </select>
    </div>
  );
}
