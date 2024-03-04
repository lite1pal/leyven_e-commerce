import { type Product } from "@/types";
import { Rating } from "flowbite-react";

export default function ProductRating({ data }: { data: Product }) {
  const calculateAverageRating = (): string => {
    let totalRating = 0;

    if (data.reviews && data.reviews.length > 0) {
      data.reviews.forEach((review: any) => {
        totalRating = totalRating + parseInt(review.rating);
      });
      return (totalRating / data.reviews.length).toFixed(1);
    }
    return "0";
  };

  return (
    <Rating
      style={{
        paddingBlock: "0.5rem",
      }}
    >
      <div className="rating rating-sm pointer-events-none">
        <input
          type="radio"
          name="rating-5"
          className="mask mask-star-2 bg-orange-400"
          checked
        />
      </div>
      {/* <Rating.Star /> */}
      {data.reviews && data.reviews.length > 0 && (
        <p className="ml-1 text-sm font-bold text-slate-900 dark:text-white">
          {calculateAverageRating()}
        </p>
      )}
      <span className="mx-1.5 h-1 w-1 rounded-full bg-gray-500 dark:bg-gray-400" />
      <a className="text-sm font-medium text-slate-900 dark:text-white">
        {data.reviews ? data?.reviews.length : "0"} відгуків
      </a>
    </Rating>
  );
}
