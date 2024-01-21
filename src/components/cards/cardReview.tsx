import { Rating } from "@mui/material";
import { Card } from "flowbite-react";

export default async function CardReview({ review }: any) {
  return (
    <Card className="flex w-full flex-col gap-3 p-3 lg:w-2/3 xl:w-1/2">
      <div className="flex w-full flex-col items-start justify-between sm:flex-row sm:items-center">
        <div className="text-lg font-medium">{review.user.name}</div>
        <div className="text-sm font-medium text-slate-500">
          {new Date(review.createdAt).toLocaleDateString("uk-UA", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </div>
      </div>
      <div className="align-items flex gap-3">
        <Rating
          // name="half-rating-read"
          defaultValue={review.rating}
          value={review.rating}
          precision={0.5}
          readOnly
        />
        {/* <p className="font-medium dark:text-gray-400">{review.rating} з 5</p> */}
      </div>
      {/* <Rating>
        <Rating.Star />
        <Rating.Star />
        <Rating.Star />
        <Rating.Star />
        <Rating.Star />
      </Rating> */}
      <div>{review.text}</div>
    </Card>
  );
}
