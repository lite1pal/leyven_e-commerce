import CardReview from "@/components/cards/cardReview";
import ReviewModal from "@/components/modals/reviewModal";

export default async function Reviews({ data, session }: any) {
  return (
    <div className="flex flex-col gap-5">
      <ReviewModal data={data} session={session} />
      <div className="mb-52 flex flex-col gap-3">
        {data.reviews && data?.reviews.length === 0 && (
          <div className="mx-auto">Відгуків ще немає</div>
        )}
        {data.reviews &&
          data?.reviews.map((review: any) => {
            return <CardReview key={review.id} review={review} />;
          })}
      </div>
    </div>
  );
}
