import { Button } from "flowbite-react";
import Link from "next/link";

export default function OrderSuccess({ params }: any) {
  const id = params.id;
  return (
    <div className="w-full flex flex-col gap-5 items-center mx-auto py-44">
      <div className="w-fit mx-auto text-2xl">
        Замовлення <span className="font-sans underline">№ {id}</span> успішне!
      </div>
      <h1 className="text-lg w-96 text-center">
        Очікуйте дзвінок нашого менеджера для уточнення замовлення
      </h1>
      <Link href="/">
        <Button>Повернутися до каталогу</Button>
      </Link>
    </div>
  );
}
