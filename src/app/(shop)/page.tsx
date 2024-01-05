import Catalog from "../../components/catalog";
import CarouselComponent from "@/components/carousel";
import { auth } from "../api/auth/[...nextauth]/auth";
import { API_URL } from "@/config/api";
import BasicBreadcrumbs from "@/components/breadCrumbs";
import CategoryHeader from "@/components/categoryHeader";
import { revalidatePath } from "next/cache";
import { Suspense } from "react";
import { products } from "@/data";
import RelatedProducts from "@/components/relatedProducts";
import { Toaster } from "react-hot-toast";
import HomeView from "@/domains/shop/home/home";
import MySpinner from "@/components/base/Spinner";
import SkeletonHorizontalProducts from "@/components/base/Skeleton";

export default async function HomeScreen({ searchParams }: any) {
  // const countriesOfManufacture = products.map(
  //   (product: any) =>
  //     product.info.filter(
  //       (i: any) => i["g:attribute_name"]._text === "Країна виробник",
  //     )[0],
  // );

  return (
    <Suspense fallback={<SkeletonHorizontalProducts />}>
      <HomeView {...{ searchParams }} />
    </Suspense>
  );
}
