import Image from "next/image";
import Link from "next/link";
import Button from "../base/Button";

export default function Hero() {
  return (
    <div className="flex flex-col xl:flex-row">
      <div className="order-2 mx-auto my-auto flex w-full flex-col items-center gap-6 px-10 pt-10 text-center lg:order-1 xl:w-5/12 xl:items-start xl:px-[2%] xl:pt-0 xl:text-start">
        <h1 className="text-3xl font-semibold sm:text-4xl">
          Купуйте товари для своїх домашніх улюбленців
        </h1>
        <h3 className="text-xl font-medium text-slate-500">
          Знайдіть ідеальні продукти для своїх пухнастих друзів
        </h3>
        <div className="mb-10">
          <Link href="/allProducts">
            <Button title="Перейти до каталогу" />
          </Link>
        </div>
      </div>
      <div className="order-1  w-full lg:order-2 xl:w-7/12">
        <Image
          className="object-cover px-2 sm:px-20 xl:px-0"
          src="/hero-2.png"
          width={1920}
          height={1080}
          sizes="(max-width: 768px) 40vw, (max-width: 1200px) 50vw, 75vw"
          alt="Картинка на головній сторінці Лейвен"
        />
      </div>
    </div>
  );
}
