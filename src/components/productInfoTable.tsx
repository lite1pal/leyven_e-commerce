"use client";

import { type Product } from "@/types";
import { Table } from "flowbite-react";

export default function ProductInfoTable({ data }: { data: Product }) {
  return (
    <div className="mt-5 overflow-x-auto">
      <Table>
        <Table.Body className="divide-y">
          {data?.info?.map((info: any, i: number) => {
            return (
              <Table.Row key={i}>
                <Table.Cell className="whitespace-nowrap p-0 font-bold text-slate-600">
                  {info["g:attribute_name"]._text}
                </Table.Cell>
                <Table.Cell>{info["g:attribute_value"]._text}</Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
    </div>
  );
}
