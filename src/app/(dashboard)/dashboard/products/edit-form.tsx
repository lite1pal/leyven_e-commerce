import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { API_URL } from "@/config/api";
import { type Product } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { GridRowId } from "@mui/x-data-grid/models/gridRows";
import { Pencil } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  title: z.string(),
  description: z.string(),
});

function EditForm({ id }: { id: GridRowId }) {
  const [data, setData] = useState<Product | undefined>();

  async function fetchData() {
    try {
      const res = await fetch(`${API_URL}/product?id=${id}&dashboard=true`);
      const data: Product = await res.json();
      setData(data);
    } catch (err) {
      console.error(err, "Failed to fetch product data for edit form");
    }
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Pencil onClick={() => fetchData()} className="w-5 sm:cursor-pointer" />
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Зміна товару</DialogTitle>
        <Separator />
        {data && (
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-5"
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
                    <FormControl>
                      <Textarea
                        rows={7}
                        defaultValue={data.description}
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button className="w-fit" type="submit">
                Змінити
              </Button>
            </form>
          </Form>
        )}
      </DialogContent>
    </Dialog>
  );
}

export default EditForm;
