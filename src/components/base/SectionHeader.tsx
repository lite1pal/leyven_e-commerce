import { ReactNode } from "react";

export default function SectionHeader({ children }: { children: ReactNode }) {
  return <h2 className="text-2xl font-medium">{children}</h2>;
}
