import { getUserFromCookies } from "@/helper";
import prismaClient from "@/services/prisma";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const body = await req.json();
  const user = await getUserFromCookies();

  const review = await prismaClient.review.create({
    data: {
      ...body,
      userId: user.id,
    },
  });

  return NextResponse.json({
    success: true,
    review: review,
  });
};
