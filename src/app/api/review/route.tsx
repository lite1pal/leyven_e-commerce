import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../auth/[...nextauth]/auth";
import { orderBy } from "lodash";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { text, rating, userEmail, productId } = body;

    const user = await prisma.user.findUnique({ where: { email: userEmail } });

    const review = await prisma.review.create({
      data: { text, rating: rating.toString(), userId: user?.id!, productId },
    });

    return new NextResponse(JSON.stringify(review), { status: 200 });
  } catch (err) {
    return new NextResponse(JSON.stringify(err), { status: 500 });
  }
}
