import { ReactNode } from "react";

function SectionWrapper({ children }: { children: ReactNode }) {
  return (
    <section className="flex flex-col gap-7 px-7 py-5">{children}</section>
  );
}

export default SectionWrapper;
