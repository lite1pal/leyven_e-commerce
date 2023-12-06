import { Roboto, Raleway, Merriweather } from "next/font/google";
import Catalog from "../../domains/catalog/catalog";
import CarouselComponent from "@/components/carousel";

export default function Home() {
  return (
    <main className={`max-w-screen min-h-screen`}>
      <CarouselComponent />
      <Catalog />
    </main>
  );
}
