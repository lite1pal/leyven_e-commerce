"use client";

import { type Product } from "@/types";
// import { Table } from "flowbite-react";
import SectionHeader from "../../../../../components/section-header";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";

export default function InfoTable({ data }: { data: Product }) {
  console.log(data.info);
  return (
    <div className="flex h-fit w-full flex-col gap-5 rounded-lg bg-white px-7 py-5 lg:w-1/2">
      <SectionHeader>Характеристики</SectionHeader>

      <div className="overflow-x-hidden">
        {/* <Table>
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
        </Table> */}

        <Table>
          <TableBody>
            {data?.info?.map((info: any, i: number) => {
              return (
                <TableRow key={i}>
                  <TableCell className="py-5 font-medium">
                    {info["g:attribute_name"]._text}
                  </TableCell>
                  <TableCell>{info["g:attribute_value"]._text}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
