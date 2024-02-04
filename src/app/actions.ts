"use server";

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
