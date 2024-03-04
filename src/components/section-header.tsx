import { ReactNode } from "react";

export default function SectionHeader({ children }: { children: ReactNode }) {
  return <h2 className="mb-2 mt-3 text-2xl font-medium">{children}</h2>;
}
