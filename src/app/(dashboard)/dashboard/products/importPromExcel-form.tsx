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
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/components/ui/use-toast";
import convert from "xml-js";
import { getData1C, getDataPromExcel } from "@/data-mappers";
import { API_URL } from "@/config/api";
import { convertXLSXtoJSON } from "@/libs/utils";
import { importPromExcelAction } from "@/actions";

const MAX_FILE_SIZE = 4500000;

const formSchema = z.object({
  file: z
    .any()
    .refine((file) => file !== null, "Завантажте export-products.xlsx файл")
    .refine((file) => file?.size <= MAX_FILE_SIZE, `Максимальний розмір 4.5MB.`)
    .refine(
      (file) => file?.name.includes(".xlsx"),
      "Файл має бути формату .xlsx",
    )
    .refine(async (file) => {
      if (file) {
        const data: any = await convertXLSXtoJSON(file);
        return data.length > 0 && data[0] && data[0][3] === "Пошукові_запити";
      }
      return false;
    }, "Цей .xlsx файл не є файлом з Prom"),
  updateQuantity: z.boolean(),
  updatePrice: z.boolean(),
  createNew: z.boolean(),
});

function ImportPromExcelForm() {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      file: null,
      updateQuantity: true,
      updatePrice: true,
      createNew: true,
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // ✅ This will be type-safe and validated.
    try {
      const { file } = values;

      const dataProm = await convertXLSXtoJSON(file);

      const formattedDataPromExcel = getDataPromExcel(dataProm);

      const { created } = await importPromExcelAction.bind(
        null,
        formattedDataPromExcel,
      )();

      // const res = await fetch(`${API_URL}/productsXLSX`, {
      //   method: "POST",
      //   body: JSON.stringify({
      //     dataExcel: formattedDataPromExcel,
      //   }),
      // });

      // const parsedRes = await res.json();

      toast({
        title: "Імпорт успішний!",
        duration: 10000,
        description: (
          <>
            {/* <div className="text-sm">
              Кількість поновлених товарів: {parsedRes.update}
            </div> */}
            <div className="text-sm">
              Кількість створених товарів: {created}
            </div>
          </>
        ),
      });
    } catch (err: any) {
      console.error(err.message);
      toast({
        title: err.message,
        duration: 10000,
      });
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="bg-sky-300">
          Імпорт з Prom
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Імпорт з Prom</DialogTitle>
        <Separator />
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="file"
              render={({ field }) => (
                <FormItem>
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">
                      Завантажити локальний файл
                    </FormLabel>
                    <FormDescription>
                      Тільки файл export-products.xlsx буде працювати
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Input
                      accept=".xlsx"
                      type="file"
                      className="w-fit"
                      onChange={(e) =>
                        field.onChange(
                          e.target.files ? e.target.files[0] : null,
                        )
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormDescription>
              Отримує товари з xml прому та об{"'"}єднує їх з excel файлом, щоб
              одержати максимальну к-сть даних. Створює новий товар, якщо не
              було збігу по prom_id або 1c_id
            </FormDescription>

            {!form.formState.isSubmitting ? (
              <Button type="submit">Імпорт</Button>
            ) : (
              <span className="loading loading-infinity loading-lg"></span>
            )}
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default ImportPromExcelForm;
