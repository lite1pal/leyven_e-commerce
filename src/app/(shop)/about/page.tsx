import FooterComponent from "@/components/sections/footer/footer";
import AboutView from "@/domains/shop/about/about";
import { Card } from "flowbite-react";
import { Suspense } from "react";

export default function About() {
  return (
    <Suspense>
      <div className="my-5">
        <AboutView />
      </div>
      <Suspense>
        <FooterComponent />
      </Suspense>
    </Suspense>
  );
}

function InfoItem({ header, items }: { header: string; items: any }) {
  return (
    <div className="mt-5 flex flex-col gap-3">
      <div className="text-lg font-medium">{header}</div>
      {items.map((item: any, i: number) => {
        return (
          <div key={i} className="flex flex-col gap-1.5">
            <div className="flex gap-10">
              <div className="w-1/3 font-bold">{item[0]}:</div>
              <div className="w-2/3">{item[1]}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
