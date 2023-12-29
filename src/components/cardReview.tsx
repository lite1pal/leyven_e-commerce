import { auth } from "@/app/api/auth/[...nextauth]/auth";
import { Card, Rating } from "flowbite-react";

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
      <Rating>
        <Rating.Star />
        <Rating.Star />
        <Rating.Star />
        <Rating.Star />
        <Rating.Star />
        <p className="ml-2 text-sm font-medium text-gray-500 dark:text-gray-400">
          {review.rating} з 5
        </p>
      </Rating>
      <div>{review.text}</div>
    </Card>
  );
}
