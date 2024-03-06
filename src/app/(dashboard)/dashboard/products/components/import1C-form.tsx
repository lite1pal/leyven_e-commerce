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
import { getData1C } from "@/data-mappers";
import { API_URL } from "@/config/api";

const MAX_FILE_SIZE = 4500000;

async function convertXml_1C_FileToJSON(xmlFile: File) {
  const xmlText = await xmlFile.text();

  const xmlString = convert.xml2json(xmlText, {
    compact: true,
    spaces: 4,
  });

  const parsedXML = await JSON.parse(xmlString);

  if (parsedXML["КоммерческаяИнформация"]) {
    return parsedXML["КоммерческаяИнформация"]["ПакетПредложений"][
      "Предложения"
    ]["Предложение"];
  }
  return [];
}

const formSchema = z.object({
  xmlFile: z
    .any()
    .refine((file) => file !== null, "Завантажте offers.xml файл")
    .refine((file) => file?.size <= MAX_FILE_SIZE, `Максимальний розмір 4.5MB.`)
    .refine((file) => file?.name.includes(".xml"), "Файл має бути формату .xml")
    .refine(async (file) => {
      if (file) {
        const data = await convertXml_1C_FileToJSON(file);
        return data.length > 0;
      }
      return false;
    }, "Цей .xml файл не є файлом з 1C"),
  updateQuantity: z.boolean(),
  updatePrice: z.boolean(),
  createNew: z.boolean(),
});

function Import1CForm() {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      xmlFile: null,
      updateQuantity: true,
      updatePrice: true,
      createNew: true,
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.

    const { xmlFile, updateQuantity, updatePrice, createNew } = values;

    const data1C = await convertXml_1C_FileToJSON(xmlFile);

    const formattedData1C = getData1C(data1C);

    const res = await fetch(`${API_URL}/products1C`, {
      method: "POST",
      body: JSON.stringify({
        data: formattedData1C,
        updateQuantity,
        updatePrice,
        createNew,
      }),
    });

    const parsedRes = await res.json();

    console.log(parsedRes);

    if (!res.ok) {
      toast({
        title: "Помилка імпорту",
        duration: 10000,
      });
      return;
    }

    // toast({
    //   title: "Імпорт успішний!",
    //   duration: 10000,
    //   description: (
    //     <>
    //       <div className="text-sm">
    //         Кількість поновлених товарів: {parsedRes}
    //       </div>
    //     </>
    //   ),
    // });
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="bg-sky-300">
          Імпорт 1С
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Імпорт з 1С</DialogTitle>
        <Separator />
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="xmlFile"
              render={({ field }) => (
                <FormItem>
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">
                      Завантажити локальний файл
                    </FormLabel>
                    <FormDescription>
                      Тільки файл offers.xml буде працювати
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Input
                      accept=".xml"
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
            <FormField
              control={form.control}
              name="updateQuantity"
              render={({ field }) => (
                <FormItem>
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">
                      Поновити кількість
                    </FormLabel>
                    <FormDescription>Залишок в базі</FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="updatePrice"
              render={({ field }) => (
                <FormItem>
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Поновити ціну</FormLabel>
                    <FormDescription>
                      Якщо кількість товару {">"} 0
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="createNew"
              render={({ field }) => (
                <FormItem>
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">
                      Створити нові товари
                    </FormLabel>
                    <FormDescription>
                      Якщо немає товару з однаковим id 1c, штрихкодом або
                      артикулем, створюється новий товар.
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormDescription>
              Ідентифікатор, штрихкод та артикул будуть поновлені, або додані, в
              любому випадку
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

export default Import1CForm;
