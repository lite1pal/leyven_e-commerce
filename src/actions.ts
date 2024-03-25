"use server";

import { API_KEY, API_URL } from "@/config/api";
import { auth, prisma } from "./app/api/auth/[...nextauth]/auth";
import { unauthorizedResponse } from "./libs/utils";

export const getProductsAction = async (input: string) => {
  const products = await prisma.product.findMany({
    where: {
      title: { contains: input, mode: "insensitive" },
      img: { not: "miss" },
    },
    orderBy: { updatedAt: "desc" },
    take: 5,
    select: {
      id: true,
      title: true,
      price: true,
      availability: true,
      quantity: true,
      img: true,
      images: true,
    },
  });
  return { products };
};

export const import1CAction = async (
  data: any,
  updateQuantity: boolean,
  updatePrice: boolean,
  createNew: boolean,
) => {
  const session = await auth();

  if (!session) {
    throw new Error("Unauthorized attempt to call a Server action");
  }

  if (!API_URL || !API_KEY) {
    throw new Error("Both API_URL and API_KEY are required");
  }

  const res = await fetch(`${API_URL}/products1C`, {
    method: "POST",
    headers: {
      "api-key": API_KEY,
    },
    body: JSON.stringify({
      data,
      updateQuantity,
      updatePrice,
      createNew,
    }),
  });

  if (!res.ok) {
    throw new Error("Error importing from 1C");
  }

  return res.json();
};

export const importPromExcelAction = async (dataExcel: any) => {
  const session = await auth();

  if (!session) {
    throw new Error("Unauthorized attempt to call a Server action");
  }

  if (!API_URL || !API_KEY) {
    throw new Error("Both API_URL and API_KEY are required");
  }

  const res = await fetch(`${API_URL}/productsXLSX`, {
    method: "POST",
    body: JSON.stringify({
      dataExcel,
    }),
  });

  if (!res.ok) {
    throw new Error("Error importing from Prom excel file");
  }

  return res.json();
};
