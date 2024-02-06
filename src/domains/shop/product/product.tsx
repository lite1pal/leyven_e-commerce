import BasicBreadcrumbs from "@/components/base/BreadCrumbs";
import { API_URL } from "@/config/api";
import { auth } from "@/app/api/auth/[...nextauth]/auth";
import { type Product } from "@/types";
import AllAbout from "./components/allAbout";
import Reviews from "./components/reviews";
import { slugifyString, valueOfPercent } from "@/libs/utils";
import { redirect } from "next/navigation";
import Description from "./components/description";
import ProductInfoTable from "@/components/productInfoTable";

type IProps = {
  id: string;
  slugishTitle: string;
};

export default async function ProductView({ id, slugishTitle }: IProps) {
  const res = await fetch(`${API_URL}/product?id=${id}`, { cache: "no-store" });
  const data: Product = await res.json();

  if (!data.title) {
    redirect("/allProducts");
    // return (
    //   <div className="mb-10 py-10 text-center text-3xl font-semibold">
    //     404 Not found
    //   </div>
    // );
  }

  if (slugifyString(data.title) !== slugishTitle) {
    redirect(`/product/${id}-${slugifyString(data.title)}`);
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
      {data.breadcrumbs !== "miss" && <BasicBreadcrumbs {...{ data }} />}
      <AllAbout data={data} />

      <div className="flex flex-col lg:flex-row">
        <Description {...{ data }} />
        <ProductInfoTable {...{ data }} />
      </div>
      <Reviews {...{ data, session }} />
    </div>
  );
}
