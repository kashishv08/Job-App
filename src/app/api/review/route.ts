import { getUserFromCookies } from "@/helper";
import prismaClient from "@/services/prisma";
import { NextRequest, NextResponse } from "next/server";
import { User } from "../../../../generated/prisma";

export const POST = async (req: NextRequest) => {
  const body = await req.json();
  const user = await getUserFromCookies();

  if (!user) {
    return NextResponse.json({ success: false, message: "Unauthorized" });
  }

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
