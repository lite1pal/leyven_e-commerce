"use client";

import { Spinner } from "flowbite-react";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

export default function LoadMore() {
  //   const [beers, setBeers] = useState<Beer[]>([]);
  //   const [page, setPage] = useState(1);

  const { ref, inView } = useInView();

  const delay = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  const loadMoreBeers = async () => {
    // Once the page 8 is reached repeat the process all over again.
    // await delay(2000);
    // const nextPage = (page % 7) + 1;
    // const newProducts = (await fetchBeers(nextPage)) ?? [];
    // setBeers((prevProducts: Beer[]) => [...prevProducts, ...newProducts]);
    // setPage(nextPage);
  };

  useEffect(() => {
    if (inView) {
      loadMoreBeers();
      console.log("scroll to the bottom");
    }
  }, [inView]);

  return (
    <>
      <div
        className="flex justify-center items-center pt-4 pb-14 col-span-1 sm:col-span-2 md:col-span-3"
        ref={ref}
      >
        <Spinner />
      </div>
    </>
  );
}
