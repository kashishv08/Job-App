import { getUserFromCookies } from "@/helper";
import prismaClient from "@/services/prisma";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (_: any, { params }: { params: { id: string } }) => {
  const job_id = params.id;
  const user = await getUserFromCookies();

  if (!user) {
    return NextResponse.json({
      success: false,
      data: {
        message: "user not found",
      },
    });
  }
  try {
    const apply = await prismaClient.application.create({
      data: {
        jobId: job_id,
        userId: user.id,
      },
      include: {
        user: true,
      },
    });
    return NextResponse.json({
      success: true,
      data: apply,
    });
  } catch (e: any) {
    console.log(e.message);
    return NextResponse.json({
      success: false,
      data: {
        message: "something went wrong",
      },
    });
  }
};

export const DELETE = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  const { id } = await params;
  const user = await getUserFromCookies();
  if (!user) {
    return NextResponse.json({
      success: false,
      message: "user not authenticated",
    });
  }
  try {
    const delApply = await prismaClient.application.deleteMany({
      where: {
        userId: user.id,
        jobId: id,
      },
    });
    return NextResponse.json({
      success: true,
      message: "deleted",
    });
  } catch (e: any) {
    return NextResponse.json({
      success: false,
      message: ":/",
    });
  }
};
