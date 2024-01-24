import BasicBreadcrumbs from "@/components/base/BreadCrumbs";
import TabsComponent from "./components/tabs";
import { API_URL } from "@/config/api";
import parse from "html-react-parser";
import { auth } from "@/app/api/auth/[...nextauth]/auth";
import { type Product } from "@/types";
import AllAbout from "./components/allAbout";
import Reviews from "./components/reviews";
import { valueOfPercent } from "@/libs/utils";
import slugify from "slugify";

type IProps = {
  id: string;
};

export default async function ProductView({ id }: IProps) {
  const res = await fetch(`${API_URL}/product?id=${id}`, { cache: "no-store" });
  const data: Product = await res.json();

  console.log(data.reviews);

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
      lowPrice: data.price - valueOfPercent(data.discount, data.price),
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
      <BasicBreadcrumbs {...{ data }} />
      <div className="px-7 py-10">
        {/* <TabsComponent data={data} session={session} /> */}
        <AllAbout data={data} />
      </div>

      <div className="flex flex-col gap-3 px-7 py-10">
        <p className=" text-slate-700 lg:w-1/2 xl:w-1/2">
          <strong>Застереження!</strong> Будь ласка, перед купівлею зверніться
          до ветеринарного лікаря за рекомендацією! Ми не надаємо консультацій
          щодо підбору препаратів та не несемо відповідальності за їх
          застосування без призначення, адже Ви ризикуєте зашкодити своєму
          улюбленцю!
        </p>

        <p className="pointer-events-none absolute left-0 top-0 text-slate-700 opacity-0">
          {data.description?.slice(0, 12) === "Застереження"
            ? data.description?.slice(257)
            : data.description}
        </p>
      </div>

      <Reviews {...{ data, session }} />
    </div>
  );
}
