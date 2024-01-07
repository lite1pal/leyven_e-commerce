import { testimonials } from "@/data/testimonials";
import CardTestimonial from "../cards/cardTestimonial";
import SectionHeader from "../base/SectionHeader";

export default function Testimonials() {
  return (
    <div className="flex flex-col gap-7 px-7 py-5">
      <SectionHeader>Відгуки клієнтів</SectionHeader>
      <div className="mask-inline-faded group flex w-full gap-3 overflow-x-hidden">
        <ul className="group-hover:play-state-paused motion-reduce:play-state-paused flex animate-marquee gap-3">
          {testimonials.map((testimonial, i) => (
            <CardTestimonial key={i} testimonial={testimonial} />
          ))}
        </ul>
        <ul
          aria-hidden="true"
          className="group-hover:play-state-paused motion-reduce:play-state-paused flex animate-marquee gap-3"
        >
          {testimonials.map((testimonial, i) => (
            <CardTestimonial key={i} testimonial={testimonial} />
          ))}
        </ul>
      </div>
    </div>
  );
}
