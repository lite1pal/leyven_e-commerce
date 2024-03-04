"use client";

import SectionHeader from "@/components/section-header";
import CardReview from "@/components/cards/card-review";
import ReviewModal from "@/components/modals/reviewModal";
import { useState } from "react";

export default async function Reviews({ data, session }: any) {
  const [showMore, setShowMore] = useState(false);

  return (
    <div className="flex flex-col gap-5 rounded-lg bg-white px-7 pt-5">
      <div className="flex flex-col justify-between gap-12 lg:flex-row">
        <SectionHeader>
          Відгуки ({data.reviews ? data.reviews.length : 0})
        </SectionHeader>

        <ReviewModal data={data} session={session} />
        <div className="hidden opacity-0 lg:flex">1</div>
        <div className="hidden opacity-0 lg:flex">2</div>
      </div>
      {data.reviews && data?.reviews.length === 0 && (
        <div className="py-3 text-lg font-medium text-slate-600">
          Будьте першим, хто залишить відгук 👋
        </div>
      )}
      <div className="flex flex-col gap-3">
        {data.reviews &&
          data.reviews.slice(0, 2).map((review: any) => {
            return <CardReview key={review.id} review={review} />;
          })}

        {showMore &&
          data.reviews &&
          data.reviews.slice(2).map((review: any) => {
            return <CardReview key={review.id} review={review} />;
          })}

        {!showMore && data.reviews && data.reviews.length > 2 && (
          <div
            onClick={() => setShowMore(true)}
            className="mx-auto w-fit cursor-pointer text-lg text-blue-600"
          >
            Показати більше
          </div>
        )}
      </div>
    </div>
  );
}
