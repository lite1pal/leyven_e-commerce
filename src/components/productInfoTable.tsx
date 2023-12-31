"use client";

import { Table } from "flowbite-react";

export default function ProductInfoTable({ data }: any) {
  return (
    <div className="overflow-x-auto mt-5">
      <Table>
        <Table.Body className="divide-y">
          {data.info.map((info: any, i: number) => {
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
