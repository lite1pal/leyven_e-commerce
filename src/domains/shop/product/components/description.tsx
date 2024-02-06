"use client";

import SectionHeader from "@/components/base/SectionHeader";
import Warning from "./warning";
import { type Product } from "@/types";
import { useState } from "react";
import { Textarea } from "flowbite-react";

// function insertLineBreaks(text, maxLength) {
//   let result = "";
//   let i = 0;

//   while (i < text.length) {
//     result += text.slice(i, i + maxLength) + "\n";
//     i += maxLength;
//   }

//   return result;
// }

export default function Description({ data }: { data: Product }) {
  const [showMore, setShowMore] = useState(false);

  const handleShowMore = () => {
    if (showMore) {
      setShowMore(false);
    } else {
      setShowMore(true);
    }
  };
  return (
    <div className="flex w-full flex-col gap-5 px-7 py-5 lg:w-1/2">
      <SectionHeader>Опис</SectionHeader>

      {/* <Textarea
        defaultValue={data.description}
        className="overflow-y-scroll border-none p-0 text-base text-slate-900 focus:pointer-events-none"
        rows={5}
      /> */}

      {/* <p>{insertLineBreaks(data.description, 100)}</p> */}

      <p className="prose font-medium text-slate-600">
        {showMore
          ? formatDescription(data.description)
          : formatDescription(data.description.slice(0, 500))}
        {/* {!showMore && data.description.length > 450 && "... "} */}
        {data.breadcrumbs.includes("Ветеринарія") && showMore && <Warning />}
      </p>
      {data.description.length >= 500 && (
        <div
          className="cursor-pointer text-lg text-blue-600"
          onClick={handleShowMore}
        >
          Читати {showMore ? "менше" : "повністю"}
        </div>
      )}
    </div>
  );
}

const formatDescription = (description: string) => {
  const strongParags = [
    "Протипоказання",
    "Дози та спосіб застосування",
    "Показання",
    "Фармакологічні властивості",
    "Склад",
    "Склад корму",
    "Опис",
    "Особливі вказівки",
    "Особливості застосування",
    "Призначення",
    "Побічні явища",
    "Умови зберігання",
    "Форма випуску",
    "Вид тварин",
    "Заходи особистої гігієни",
    "Застосування",
    "Дозування",
    "Чому варто купити?",
    "Як використовувати",
    "Склад",
    "Переваги",
  ];
  const paragraphs = description
    .split(/(?<=\s)(?=[\u0410-\u042F])/u)
    // .split("")
    .map((paragraph: string, index: number) => (
      <>
        {strongParags.includes(paragraph.trim()) && (
          <>
            <br />
            <br />
          </>
        )}
        <span
          className={`${
            strongParags.includes(paragraph.trim().replace(":", "")) &&
            "mb-5 mt-5 text-lg font-semibold text-slate-700"
          } mt-1.5`}
          key={index}
        >
          {paragraph}
        </span>
        {strongParags.includes(paragraph.trim()) && (
          <>
            <br />
            <br />
          </>
        )}
      </>
    ));

  return <div>{paragraphs}</div>;
};
