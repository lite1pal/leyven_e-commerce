"use client";

import { Banner } from "flowbite-react";
import { MdPercent } from "react-icons/md";

export default function BannerPromo() {
  return (
    <Banner>
      <div className="flex w-full mt-5 justify-between  bg-gray-50 p-4 dark:border-gray-600 dark:bg-gray-700">
        <div className="mx-auto flex items-center">
          <p className="flex items-center text-sm font-normal text-gray-500 dark:text-gray-400">
            <span className="mr-3 inline-flex h-6 w-6 items-center justify-center rounded-full bg-gray-200 p-1 dark:bg-gray-600">
              <MdPercent className="h-4 w-4" />
            </span>
            <span className="[&_p]:inline">
              Отримай 5% знижку ввівши промокод -&nbsp;
              <div
                // href="https://flowbite.com"
                className="ml-0 flex cursor-pointer items-center text-sm font-medium text-cyan-600 hover:underline dark:text-cyan-500 md:ml-1 md:inline-flex"
              >
                GOODTHINGS
                {/* <HiArrowRight className="ml-2" /> */}
              </div>
            </span>
          </p>
        </div>
        {/* <Banner.CollapseButton
          color="gray"
          className="border-0 bg-transparent text-gray-500 dark:text-gray-400"
        >
          <HiX className="h-4 w-4" />
        </Banner.CollapseButton> */}
      </div>
    </Banner>
  );
}
