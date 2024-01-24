import SectionHeader from "@/components/base/SectionHeader";
import CardReview from "@/components/cards/cardReview";
import ReviewModal from "@/components/modals/reviewModal";

export default async function Reviews({ data, session }: any) {
  return (
    <div className="flex flex-col gap-5 px-7 py-5">
      <SectionHeader>
        Відгуки товару ({data.reviews ? data.reviews.length : 0})
      </SectionHeader>
      {data.reviews && data?.reviews.length === 0 && (
        <div className="py-3 text-lg font-medium">
          Будьте першим, хто залишить відгук!
        </div>
      )}
      <ReviewModal data={data} session={session} />
      <div className="flex flex-col gap-3">
        {data.reviews &&
          data?.reviews.map((review: any) => {
            return <CardReview key={review.id} review={review} />;
          })}
      </div>
    </div>
  );
}
