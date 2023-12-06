import { Roboto } from "next/font/google";
import Catalog from "../../domains/catalog/catalog";
import CarouselComponent from "@/components/carousel";

const roboto = Roboto({ subsets: ["latin"], weight: "400" });

export default function Home() {
  return (
    <main className={`${roboto.className} max-w-screen min-h-screen`}>
      <CarouselComponent />
      <Catalog />
    </main>
  );
}
