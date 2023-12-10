import Catalog from "../domains/catalog/catalog";
import CarouselComponent from "@/components/carousel";
import { auth } from "./api/auth/[...nextauth]/auth";

export default async function HomeScreen() {
  // gets current session
  const session = await auth();

  // gets products for the catalog
  const res = await fetch("https://leyven.vercel.app/api/products");
  const data = await res.json();

  return (
    <>
      <CarouselComponent />
      <Catalog session={session} data={data} />
    </>
  );
}
