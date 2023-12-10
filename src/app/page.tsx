import Catalog from "../domains/catalog/catalog";
import CarouselComponent from "@/components/carousel";
import { auth } from "./api/auth/[...nextauth]/auth";

export default async function HomeScreen() {
  return (
    <div className="bg-slate-100">
      <CarouselComponent />
      <Catalog />
    </div>
  );
}
