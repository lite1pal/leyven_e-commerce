import Button from "@/components/Button";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto mt-36 flex w-fit flex-col gap-10 text-center">
      <h2 className="text-3xl font-medium">404</h2>
      <h2 className="text-3xl font-medium">Сторінку не знайдено</h2>

      <Link href="/">
        <Button title="Повернутися до головної сторінкі" />
      </Link>
    </div>
  );
}
