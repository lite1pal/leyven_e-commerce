"use client";

import { type Product } from "@/types";
import { Table } from "flowbite-react";
import SectionHeader from "./base/SectionHeader";

export default function ProductInfoTable({ data }: { data: Product }) {
  return (
    <div className="flex w-full flex-col gap-5 rounded-lg bg-white px-7 py-5">
      <SectionHeader>Характеристики</SectionHeader>

      <div className="overflow-x-hidden">
        <Table>
          <Table.Body className="divide-y">
            {data?.info?.map((info: any, i: number) => {
              return (
                <Table.Row key={i} className="">
                  <Table.Cell className="w-1/2 whitespace-nowrap p-0 font-medium text-slate-900">
                    {info["g:attribute_name"]._text}
                  </Table.Cell>
                  <Table.Cell className="w-1/2">
                    {info["g:attribute_value"]._text}
                  </Table.Cell>
                </Table.Row>
              );
            })}
          </Table.Body>
        </Table>
      </div>
    </div>
  );
}
