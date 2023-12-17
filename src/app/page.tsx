import Catalog from "../domains/catalog/catalog";
import CarouselComponent from "@/components/carousel";
import { auth } from "./api/auth/[...nextauth]/auth";

export default async function HomeScreen({ searchParams }: any) {
  return (
    <div className="bg-slate-100">
      <CarouselComponent />
      <Catalog {...{ searchParams }} />
    </div>
  );
}
