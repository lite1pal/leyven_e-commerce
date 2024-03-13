import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { API_URL } from "@/config/api";
import { type Product } from "@/types";
import { Label } from "flowbite-react";
import { useEffect, useState } from "react";
import { FieldValues, UseFormRegister } from "react-hook-form";

export default function SelectCategories({
  data,
  field,
}: {
  data?: Product;
  field: any;
}) {
  const [categories, setCategories] = useState([]);
  const [childCategories, setChildCategories] = useState([]);
  const [currentCategory, setCurrentCategory] = useState<any>("");

  async function fetchCategories() {
    try {
      const res = await fetch(`${API_URL}/categories`, { cache: "no-store" });
      const parsedRes = await res.json();
      setCategories(parsedRes);
      setChildCategories(parsedRes.filter((c: any) => c.parentId));
      setCurrentCategory(
        parsedRes.find((c: any) => c.categoryId === data?.categoryId),
      );
    } catch (err) {
      console.error(err, "Failed to fetch categories");
    }
  }

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <>
      {categories.length > 0 && (
        <Select
          defaultValue={currentCategory?.categoryId}
          onValueChange={(value) => field.onChange(value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Виберіть категорію" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Категорії</SelectLabel>
              {childCategories?.map((category: any) => {
                return (
                  <SelectItem key={category.id} value={category.categoryId}>
                    {category.title}
                  </SelectItem>
                );
              })}
            </SelectGroup>
          </SelectContent>
        </Select>
      )}
    </>
  );
}
