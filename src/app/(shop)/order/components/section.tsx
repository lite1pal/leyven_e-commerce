import { ReactNode } from "react";

export default function FormSection({
  header,
  children,
}: {
  header: string;
  children: ReactNode;
}) {
  return (
    <div className="flex w-full flex-col gap-3 rounded-lg bg-white p-4">
      <div className="py-3 text-xl">{header}</div>
      <div className="mb-6 flex flex-col gap-6">{children}</div>
    </div>
  );
}
