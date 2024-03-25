import {
  errorResponse,
  isValidApiKey,
  successResponse,
  unauthorizedResponse,
} from "@/libs/utils";
import { NextRequest } from "next/server";
import { prisma } from "../auth/[...nextauth]/auth";

export async function POST(req: NextRequest) {
  try {
    if (!isValidApiKey(req)) {
      return unauthorizedResponse();
    }

    const body = await req.json();

    const { session } = body;

    if (!session) {
      return unauthorizedResponse();
    }

    const user = await prisma.user.findFirst({
      where: { email: session.user.email, admin: { equals: true } },
    });

    if (!user) {
      return unauthorizedResponse();
    }

    return successResponse("Access is granted");
  } catch (err) {
    return errorResponse("Error occured while giving an admin permission");
  }
}
