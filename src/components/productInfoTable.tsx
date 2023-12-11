"use client";

import { Table } from "flowbite-react";

export default function ProductInfoTable() {
  return (
    <div className="overflow-x-auto mt-5">
      <Table>
        <Table.Body className="divide-y">
          <Table.Row>
            <Table.Cell className="whitespace-nowrap p-0 font-bold text-slate-600">
              Тип
            </Table.Cell>
            <Table.Cell>Корм</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell className="whitespace-nowrap p-0 font-bold text-slate-600">
              Тварина
            </Table.Cell>
            <Table.Cell>Собака</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell className="whitespace-nowrap p-0 font-bold text-slate-600">
              Опис
            </Table.Cell>
            <Table.Cell>
              Сухий повнораціонний корм для дорослих собак
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </div>
  );
}
