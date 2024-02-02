"use client";

import SectionHeader from "@/components/base/SectionHeader";
import Warning from "./warning";
import { type Product } from "@/types";
import { useState } from "react";

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

      <p className="font-medium text-slate-600">
        {showMore
          ? formatDescription(data.description)
          : formatDescription(data.description.slice(0, 450))}
        {showMore ? " " : "... "}
        {data.breadcrumbs.includes("Ветеринарія") && showMore && <Warning />}
        <span
          className="cursor-pointer text-blue-600 hover:underline"
          onClick={handleShowMore}
        >
          читати {showMore ? "менше" : "повністю"}
        </span>
      </p>
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
