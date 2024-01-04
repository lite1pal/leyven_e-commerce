import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { Rating } from "flowbite-react";

export default function CardTestimonial({ testimonial }: any) {
  return (
    <li className="relative h-full w-[32rem] rounded-lg border p-4">
      <article className="flex h-full flex-col justify-between gap-y-2">
        <blockquote className="max-w-prose text-sm/relaxed italic text-slate-700 lg:text-base/relaxed">
          &quot;{testimonial.quote}&quot;
        </blockquote>
        <div className="mt-6 flex items-center">
          <div className="flex flex-col gap-2">
            <cite>
              <h3 className="lg:text-md mb-0.5 not-italic">
                {testimonial.name}
              </h3>
            </cite>
            <div className="flex items-center gap-5">
              <div className="flex items-center justify-center gap-1 text-xs text-slate-400 lg:text-sm">
                <CalendarMonthIcon color="action" fontSize="small" />
                <div>{testimonial.date}</div>
              </div>
              <Rating>
                <Rating.Star />
                <Rating.Star />
                <Rating.Star />
                <Rating.Star />
                <Rating.Star />
              </Rating>
            </div>
          </div>
        </div>
      </article>
    </li>
  );
}
