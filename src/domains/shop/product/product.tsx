import BasicBreadcrumbs from "@/components/base/BreadCrumbs";
import { API_URL } from "@/config/api";
import { auth } from "@/app/api/auth/[...nextauth]/auth";
import { type Product } from "@/types";
import AllAbout from "./components/allAbout";
import Reviews from "./components/reviews";
import { slugifyString, valueOfPercent } from "@/libs/utils";
import slugify from "slugify";
import { redirect } from "next/navigation";
import SectionHeader from "@/components/base/SectionHeader";

type IProps = {
  id: string;
  slugishTitle: string;
};

export default async function ProductView({ id, slugishTitle }: IProps) {
  const res = await fetch(`${API_URL}/product?id=${id}`, { cache: "no-store" });
  const data: Product = await res.json();

  if (!data.title) {
    return (
      <div className="mb-10 py-10 text-center text-3xl font-semibold">
        404 Not found
      </div>
    );
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

  const FormattedDescription = ({ description }: any) => {
    const strongParags = [
      "Протипоказання",
      "Дози та спосіб застосування",
      "Показання",
      "Фармакологічні властивості",
      "Склад",
      "Склад корму",
      "Опис",
      "Особливі вказівки",
      "Особливості застосування",
      "Побічні явища",
      "Умови зберігання",
      "Форма випуску",
      "Вид тварин",
      "Заходи особистої гігієни",
      "Застосування",
      "Дозування",
    ];
    const paragraphs = description
      .split(/(?<=\s)(?=[\u0410-\u042F])/u)
      .map((paragraph: string, index: number) => (
        <p
          className={`${
            strongParags.includes(paragraph.trim().replace(":", "")) &&
            "mb-5 mt-5 text-xl font-semibold"
          } mt-1.5`}
          key={index}
        >
          {!strongParags.includes(paragraph.trim()) && "- "}
          {paragraph}
        </p>
      ));

    return <div>{paragraphs}</div>;
  };

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
      <BasicBreadcrumbs {...{ data }} />
      <div className="px-7 py-10">
        {/* <TabsComponent data={data} session={session} /> */}
        <AllAbout data={data} />
      </div>

      <div className="flex flex-col gap-5 px-7 py-10">
        <SectionHeader>Опис</SectionHeader>
        <p className="text-slate-700 xl:w-1/2">
          <strong>Застереження!</strong> Будь ласка, перед купівлею зверніться
          до ветеринарного лікаря за рекомендацією! Ми не надаємо консультацій
          щодо підбору препаратів та не несемо відповідальності за їх
          застосування без призначення, адже Ви ризикуєте зашкодити своєму
          улюбленцю!
        </p>

        <p className="text-slate-700 xl:w-1/2">
          {/* <FormattedDescription description={data.description} /> */}
          <div>{data.description}</div>
          {/* {data.description?.slice(0, 12) === "Застереження"
            ? data.description?.slice(257)
            : data.description} */}
        </p>
      </div>

      <Reviews {...{ data, session }} />
    </div>
  );
}
