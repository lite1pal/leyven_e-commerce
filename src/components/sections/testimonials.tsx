"use client";

import { testimonials } from "@/data/testimonials";
import CardTestimonial from "../cards/card-testimonial";
import SectionHeader from "../section-header";

export default function Testimonials() {
  return (
    <div className="mask-inline-faded group flex w-full gap-3 overflow-x-hidden">
      <ul className="group-hover:play-state-paused motion-reduce:play-state-paused animate-marquee flex gap-3">
        {testimonials.map((testimonial, i) => (
          <CardTestimonial key={i} testimonial={testimonial} />
        ))}
      </ul>
    </div>
  );
}
