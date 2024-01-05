import CardReview from "@/components/cardReview";
import ReviewModal from "@/components/reviewModal";

export default async function Reviews({ data, session }: any) {
  return (
    <div className="flex flex-col gap-5">
      <ReviewModal data={data} session={session} />
      <div className="flex flex-col gap-3">
        {data.reviews && data?.reviews.length === 0 && "Відгуків ще немає"}
        {data.reviews &&
          data?.reviews.map((review: any) => {
            return <CardReview key={review.id} review={review} />;
          })}
      </div>
    </div>
  );
}
