"use server";

import { API_KEY, API_URL } from "@/config/api";
import { prisma } from "./api/auth/[...nextauth]/auth";

export const getProducts = async (input: string) => {
  const products = await prisma.product.findMany({
    where: {
      title: { contains: input, mode: "insensitive" },
      img: { not: "miss" },
    },
    orderBy: { updatedAt: "desc" },
    take: 5,
  });
  return { products };
};

export const import1CProducts = async (xmlText: string) => {
  try {
    const res = await fetch(`${API_URL}/products1C`, {
      method: "POST",
      body: JSON.stringify({ xmlText }),
      headers: {
        "api-key": API_KEY,
      },
      cache: "no-store",
    });
    const parsedRes = await res.json();

    if (!res.ok) {
      throw new Error(parsedRes);
    }

    return { message: parsedRes };
  } catch (err: any) {
    return { error: err.message };
  }
};
