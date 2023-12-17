import { Spinner } from "flowbite-react";

export default function Loading() {
  return (
    <div className="flex gap-3 w-fit mx-auto my-20 pb-96 text-4xl font-bold">
      <Spinner size="lg" />
    </div>
  );
}
