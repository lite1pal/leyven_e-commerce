"use client";

import { useState } from "react";

export default function Tabs() {
  const [tab, setTab] = useState<"Виконані" | "В процесі" | "Не визначені">(
    "Виконані",
  );

  return (
    <ul role="tablist" className="tabs tabs-lifted w-fit">
      <li role="tab" className="tab tab-active font-light text-white">
        Не визначені
      </li>
      <li role="tab" className="tab font-medium text-slate-900">
        В процесі
      </li>
      <li role="tab" className="tab font-medium text-slate-900">
        Виконані
      </li>
    </ul>
  );
}
