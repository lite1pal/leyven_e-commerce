import Button from "@/components/Button";
import Link from "next/link";

export default function OrderSuccess({ params }: any) {
  const id = params.id;
  return (
    <div className="mx-auto flex w-full flex-col items-center gap-5 py-44">
      <div className="mx-auto flex w-fit flex-col gap-3 text-center text-2xl sm:flex-row">
        Замовлення{" "}
        <span className="font-sans text-blue-600 max-sm:text-lg">№ {id}</span>{" "}
        успішне!
      </div>
      <h1 className="w-96 text-center text-lg max-sm:px-3">
        Очікуйте дзвінок нашого менеджера для уточнення замовлення
      </h1>
      <Link href="/">
        <Button title="Повернутися до каталогу" />
      </Link>
    </div>
  );
}
