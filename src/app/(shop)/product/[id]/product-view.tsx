import { API_URL } from "@/config/api";
import { auth } from "@/app/api/auth/[...nextauth]/auth";
import { type Product } from "@/types";
import AllAbout from "./components/allAbout";
import Reviews from "./components/reviews";
import { slugifyString, valueOfPercent } from "@/libs/utils";
import { permanentRedirect, redirect } from "next/navigation";
import Description from "./components/description";
import ProductInfoTable from "@/app/(shop)/product/[id]/components/info-table";
import { Suspense, useState } from "react";
import RelatedProducts from "@/components/sections/relatedProducts";
import FooterComponent from "@/components/layout/footer";
import { notFound } from "next/navigation";
import { useInView } from "react-intersection-observer"; // Import useInView
import Breadcrumbs from "@/components/breadcrumbs";

type IProps = {
  id: string;
  slugishTitle: string;
};

export default async function ProductView({ id, slugishTitle }: IProps) {
  const res = await fetch(`${API_URL}/product?id=${id}`);
  const data: Product = await res.json();

  if (!data.title) {
    notFound();
  }

  if (slugifyString(data.title) !== slugishTitle) {
    permanentRedirect(`/product/${id}-${slugifyString(data.title)}`);
  }

  const calculateAverageRating = (): number => {
    let totalRating = 0;

    if (data.reviews && data.reviews.length > 0) {
      data.reviews.forEach((review: any) => {
        totalRating = totalRating + parseInt(review.rating);
      });
      return parseInt((totalRating / data.reviews.length).toFixed(1));
    }
    return 0;
  };

  const getBestRating = (): number => {
    let bestRating = 0;

    if (data.reviews && data.reviews.length > 0) {
      data.reviews.forEach((review: any) => {
        if (parseInt(review.rating) > bestRating) {
          bestRating = parseInt(review.rating);
        }
      });
      return bestRating;
    }
    return 5;
  };

  const session = await auth();

  let productJsonLd: any = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: data.title,
    description: data.description,
    image: data.img,
    offers: {
      "@type": "AggregateOffer",
      availability:
        data.availability === "in stock"
          ? "https://schema.org/InStock"
          : "https://schema.org/OutOfStock",
      priceCurrency: "UAH",
      offerCount: 1,
      highPrice: data.price,
      lowPrice: data.discount
        ? data.price - valueOfPercent(data.discount, data.price)
        : data.price,
    },
  };

  if (data.reviews && data?.reviews?.length > 0) {
    productJsonLd.review = {
      "@type": "Review",
      reviewRating: {
        "@type": "Rating",
        ratingValue: parseInt(data?.reviews[0].rating.toString()),
        bestRating: getBestRating(),
      },
      author: {
        "@type": "Person",
        name: data?.reviews[0]?.user?.name!,
      },
    };
    productJsonLd.aggregateRating = {
      "@type": "AggregateRating",
      ratingValue: calculateAverageRating(),
      reviewCount: data?.reviews?.length,
    };
  }

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(productJsonLd),
        }}
      />

      {data.categoryId && data.categoryId !== "miss" && (
        <Breadcrumbs categoryId={data.categoryId} />
      )}
      <AllAbout data={data} />

      <div className="mb-5 flex flex-col gap-5 lg:flex-row">
        <Description {...{ data }} />
        <ProductInfoTable {...{ data }} />
      </div>
      <Reviews {...{ data, session }} />
      <Suspense>
        <RelatedProducts
          id={id}
          header={"Рекомендовані"}
          type="relatedProducts"
        />
      </Suspense>
    </div>
  );
}
