"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { API_URL } from "@/config/api";
import { type Product } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { CardTitle } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";
import TextEditor from "../../components/text-editor";
import ImgUpload from "../../components/img-upload";
import EditKeywords from "../../components/keywords";
import EditInfo from "../../components/info";
import SelectCategories from "../../components/categories";

const formSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  price: z.coerce.number().min(0),
  discount: z.coerce.number().min(0),
  quantity: z.coerce.number().min(0),
  barcode: z.string().optional(),
  artycul: z.string().optional(),
  images: z.string().array().optional(),
  keywords: z.string().optional().nullable(),
  categoryId: z.string().optional(),
  info: z.any().optional(),
});

function EditForm({ params }: { params: { id: string } }) {
  const id = params.id;
  const [data, setData] = useState<Product | undefined>();

  const [fields, setFields] = useState<any>([]);

  async function fetchData() {
    try {
      const res = await fetch(`${API_URL}/product?id=${id}&dashboard=true`);
      const data: Product = await res.json();

      form.setValue("id", data.id);
      form.setValue("title", data.title);
      form.setValue("description", data.description);
      form.setValue("price", data.price);
      form.setValue("discount", data.discount);
      form.setValue("quantity", data.quantity);
      form.setValue("barcode", data.barcode);
      form.setValue("images", data.images);
      form.setValue("artycul", data.artycul);
      form.setValue("keywords", data.keywords);
      form.setValue("info", data.info);
      form.setValue("categoryId", data.categoryId);

      setFields([
        {
          name: "title",
          label: "Назва",
          oldValue: data.title,
        },

        {
          name: "price",
          label: "Ціна",
          oldValue: data.price,
        },
        { name: "discount", label: "Знижка", oldValue: data.discount },
        { name: "quantity", label: "Кількість", oldValue: data.quantity },
        { name: "barcode", label: "Штрихкод", oldValue: data.barcode },
        { name: "artycul", label: "Артикул", oldValue: data.artycul },
        { name: "categoryId", label: "Категорія", oldValue: data.categoryId },
      ]);

      setData(data);
    } catch (err) {
      console.error(err, "Failed to fetch product data for edit form");
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const res = await fetch(`${API_URL}/product`, {
        method: "PUT",
        body: JSON.stringify(values),
      });
      if (!res.ok) {
        throw new Error();
      }

      // Update fields with new data
      fetchData();

      toast({
        title: "Зміни збережено",
        duration: 10000,
      });
    } catch (err) {
      console.error(err, "Failed to edit a product");
    }
  };

  return (
    <div className="mx-auto py-10">
      {data && (
        <Form {...form}>
          <CardTitle className="pb-7 pt-3 text-3xl">
            Редагування товару: {data.title}
          </CardTitle>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-5 rounded-lg bg-white p-5"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Назва</FormLabel>
                  <FormControl>
                    <Input defaultValue={data.title} {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Опис</FormLabel>

                  <TextEditor
                    description={field.value || data.description}
                    field={field}
                  />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ціна</FormLabel>
                  <FormControl>
                    <Input type="number" defaultValue={data.price} {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormMessage />
            <FormField
              control={form.control}
              name="discount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Знижка %</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      defaultValue={data.discount}
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="quantity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Кількість</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      defaultValue={data.quantity}
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="images"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Зображення</FormLabel>
                  <FormDescription>
                    Щоб зміни збереглися, обов{"'"}язково пролистайти донизу та
                    нажміть Зберегти
                  </FormDescription>
                  <ImgUpload {...{ data, field, form, onSubmit }} />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="barcode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Штрихкод</FormLabel>
                  <FormControl>
                    <Input defaultValue={data.barcode} {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="artycul"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Артикул</FormLabel>
                  <FormControl>
                    <Input defaultValue={data.artycul} {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="keywords"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ключові слова</FormLabel>
                  <EditKeywords
                    keywords={field.value || data.keywords || ""}
                    field={field}
                  />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="info"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Характеристики</FormLabel>
                  <EditInfo info={field.value || data.info} field={field} />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="categoryId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Категорія</FormLabel>
                  <SelectCategories data={data} field={field} />
                </FormItem>
              )}
            />

            {fields.length > 0 && (
              <div className="flex flex-col gap-3">
                <Separator />
                <CardTitle className="text-lg">Редаговані поля</CardTitle>
                {fields.map(
                  (field: any) =>
                    form.watch(field.name) != field.oldValue && (
                      <CollapsibleField
                        key={field.name}
                        fieldName={field.label}
                        oldValue={field.oldValue}
                        newValue={form.watch(field.name)}
                      />
                    ),
                )}
                <FormDescription>
                  Редаговані опис, ключові слова та характеристики не
                  відображаються
                </FormDescription>

                <Separator />
              </div>
            )}

            <Button
              variant="outline"
              size="lg"
              className="my-5 w-fit bg-indigo-500 text-white"
              type="submit"
            >
              Зберегти
            </Button>
          </form>
        </Form>
      )}
    </div>
  );
}

export default EditForm;

const CollapsibleField = ({
  fieldName,
  oldValue,
  newValue,
}: {
  fieldName: string;
  oldValue: string | number;
  newValue: string | number;
}) => (
  <details className="collapse collapse-arrow rounded-lg border shadow">
    <summary className="collapse-title text-lg font-medium">
      {fieldName}
    </summary>
    <div className="collapse-content">
      <div className="flex flex-col gap-3 text-sm">
        <div className="text-slate-500">Old: {oldValue}</div>
        <div>New: {newValue}</div>
      </div>
    </div>
  </details>
);
