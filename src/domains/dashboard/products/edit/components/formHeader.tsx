import { ReactNode } from "react";

export default function FormHeader({ children }: { children: ReactNode }) {
  return (
    <div className="py-3 text-lg font-medium text-gray-300">{children}</div>
  );
}
