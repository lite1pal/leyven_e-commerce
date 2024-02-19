import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../auth/[...nextauth]/auth";
import { isValidApiKey } from "@/libs/utils";

export async function POST(req: NextRequest) {
  try {
    if (!isValidApiKey(req)) {
      return new NextResponse(
        JSON.stringify("Unauthorized. Provide an API key"),
        {
          status: 401,
        },
      );
    }

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
