"use client";

import SectionHeader from "@/components/section-header";
import { type Product } from "@/types";
import { useState } from "react";
import parse from "html-react-parser";
import ReactQuill from "react-quill";

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

  // const isHTML = (str: string) => {
  //   // const doc = new DOMParser().parseFromString(str, "text/html");
  //   // return Array.from(doc.body.childNodes).some((node) => node.nodeType === 1);
  //   // Regular expression to match HTML tags
  //   const htmlRegex = /<([A-Za-z][A-Za-z0-9]*)\b[^>]*>(.*?)<\/\1>/;
  //   // Check if the string matches the HTML pattern
  //   return htmlRegex.test(str);
  // };

  const isHTML = (str: string) => {
    const doc = new DOMParser().parseFromString(str, "text/html");
    return Array.from(doc.body.childNodes).some((node) => node.nodeType === 1);
  };

  return (
    <div className="prose flex w-full flex-col gap-5 rounded-lg bg-white px-7 py-5 text-sm text-slate-900 prose-headings:text-slate-900 prose-p:text-slate-900 prose-strong:text-slate-900 prose-em:text-slate-900 lg:w-1/2">
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
