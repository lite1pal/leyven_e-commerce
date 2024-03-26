"use client";

import SectionHeader from "@/components/section-header";
import { type Product } from "@/types";
import { useState } from "react";

export default function Description({ data }: { data: Product }) {
  const [showMore, setShowMore] = useState(false);

  console.log(data.description);

  const handleShowMore = () => {
    if (showMore) {
      setShowMore(false);
    } else {
      setShowMore(true);
    }
  };

  const paragraphs = data.description.split("\n");

  const isHTML = (str: string): boolean => {
    const htmlRegex = /<([A-Za-z][A-Za-z0-9]*)\b[^>]*>(.*?)<\/\1>/;
    return htmlRegex.test(str);
  };

  return (
    <div className="prose flex max-w-full flex-1 flex-col gap-5 rounded-lg bg-white px-7 py-5 text-sm text-slate-900 prose-headings:text-slate-900 prose-p:text-slate-900 prose-strong:text-slate-900 prose-em:text-slate-900">
      <SectionHeader>Опис</SectionHeader>

      {isHTML(data.description) ? (
        <div dangerouslySetInnerHTML={{ __html: data.description }}></div>
      ) : (
        paragraphs.map((paragraph, i) => (
          <>
            <p key={i}>{paragraph}</p>

            <br />
          </>
        ))
      )}
    </div>
  );
}
