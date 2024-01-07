import { ReactNode } from "react";

export default function SectionHeader({ children }: { children: ReactNode }) {
  return <div className="text-2xl font-medium">{children}</div>;
}
