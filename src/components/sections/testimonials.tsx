import { testimonials } from "@/data/testimonials";
import CardTestimonial from "../cardTestimonial";

export default function Testimonials() {
  return (
    <div className="flex flex-col gap-7 px-7 py-5">
      <div className="text-2xl font-medium">Відгуки клієнтів</div>
      <div className="mask-inline-faded group flex w-full gap-3 overflow-x-hidden">
        <ul className="group-hover:play-state-paused motion-reduce:play-state-paused animate-marquee flex gap-3">
          {testimonials.map((testimonial) => (
            <CardTestimonial testimonial={testimonial} />
          ))}
        </ul>
        <ul
          aria-hidden="true"
          className="group-hover:play-state-paused motion-reduce:play-state-paused animate-marquee flex gap-3"
        >
          {testimonials.map((testimonial) => (
            <CardTestimonial testimonial={testimonial} />
          ))}
        </ul>
      </div>
    </div>
  );
}
