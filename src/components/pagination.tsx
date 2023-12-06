"use client";

import { Pagination } from "flowbite-react";
import { useState } from "react";

export default function PaginationComponent() {
  const [currentPage, setCurrentPage] = useState(1);

  const onPageChange = (page: number) => setCurrentPage(page);
  return (
    <div className="w-fit mx-auto mb-10">
      <Pagination
        currentPage={currentPage}
        totalPages={100}
        onPageChange={onPageChange}
        showIcons
        previousLabel="Назад"
        nextLabel="Вперед"
      />
    </div>
  );
}
