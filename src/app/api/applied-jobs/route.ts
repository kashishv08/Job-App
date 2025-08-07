import { getUserFromCookies } from "@/helper";
import prismaClient from "@/services/prisma";
import { NextResponse } from "next/server";

export const GET = async () => {
  const user = await getUserFromCookies();

  if (!user) {
    return NextResponse.json({
      success: false,
      message: "user not authenticated",
    });
  }

  try {
    const job = await prismaClient.application.findMany({
      where: {
        userId: user.id,
      },
      include: {
        jobs: true,
      },
    });
    return NextResponse.json({
      success: true,
      appliedJobs: job,
    });
  } catch (e: any) {
    console.log(e.message);
    return NextResponse.json({
      success: false,
      message: ":/",
    });
  }
};
