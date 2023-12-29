"use client";

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Divider,
} from "@mui/joy";
import { Card } from "flowbite-react";

export default function CardOrder({ data }: any) {
  return (
    <Card className="flex flex-col gap-4">
      <div className="text-sm font-medium italic text-blue-600">
        {new Date(data.createdAt).toLocaleDateString("uk-UA", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        }) +
          " - " +
          new Date(data.createdAt).toLocaleTimeString()}
      </div>
      <Divider />
      <InfoItem label="Номер замовлення" value={data.id} />
      <InfoItem label="Замовник" value={data.firstName + " " + data.lastName} />
      <InfoItem label="Номер телефону" value={data.phone} />
      {data.email && <InfoItem label="Email" value={data.email} />}
      <InfoItem
        label="Місто"
        value={data.city.charAt(0).toUpperCase() + data.city.slice(1)}
      />
      <InfoItem label="Відділення нової пошти" value={data.warehouse} />
      <Divider />
      <Accordion
        sx={{ padding: "1rem", borderRadius: "0.625rem", gap: "1rem" }}
      >
        <AccordionSummary>Товари</AccordionSummary>
        <AccordionDetails>
          <div className="flex flex-col gap-3">
            {data?.orderProducts.map((orderProduct: any) => {
              return (
                <Card
                  key={orderProduct.id}
                  className="flex w-full flex-col gap-3 lg:w-3/4"
                >
                  <div className="m-1 h-16 w-16">
                    <img
                      className="h-full w-full object-contain"
                      src={orderProduct.product.img}
                    />
                  </div>
                  <div className="font-medium">
                    {orderProduct.product.title}
                  </div>
                  <div>{orderProduct.quantity} шт.</div>
                  <div className="flex gap-5">
                    <div>
                      Ціна за шт. -{" "}
                      <span className="rounded-lg border p-2 text-lg font-medium">
                        {orderProduct.product.price} грн
                      </span>
                    </div>
                    <div>
                      Загальна ціна -{" "}
                      <span className="rounded-lg border p-2 text-lg font-medium">
                        {orderProduct.itemTotal} грн
                      </span>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </AccordionDetails>
      </Accordion>
    </Card>
  );
}

function InfoItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex gap-10">
      <div className="w-1/2 font-medium">{label}</div>
      <div className="w-1/2 italic">{value}</div>
    </div>
  );
}
