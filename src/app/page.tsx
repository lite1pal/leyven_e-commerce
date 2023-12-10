import Catalog from "../domains/catalog/catalog";
import CarouselComponent from "@/domains/catalog/components/carousel";
import { auth } from "./api/auth/[...nextauth]/auth";
import { Suspense } from "react";

const getProducts = async () => {
  try {
    const res = await fetch("/api/products");
    if (!res.ok) {
      return "Failed to fetch products";
    }
    return res.json();
    const parsedRes = await res.json();
    return parsedRes;
    // setProducts(parsedRes);
    // setLoading(false);
  } catch (err) {
    console.error("Failed to fetch products", err);
  }
};

export default async function HomeScreen() {
  const session = await auth();
  const data = await fetch("/api/products");

  console.log(JSON.stringify(data));

  return (
    <>
      <CarouselComponent />
      <Catalog session={session} />
    </>
  );
}
