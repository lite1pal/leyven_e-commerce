import FooterComponent from "@/components/sections/footer/footer";
import AboutView from "@/domains/shop/about/about";
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
