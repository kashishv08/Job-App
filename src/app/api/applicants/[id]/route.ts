import prismaClient from "@/services/prisma";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  const id = params.id;
  const currapplicant = await prismaClient.application.findMany({
    where: {
      jobId: id,
    },
    include: {
      user: true,
    },
  });
  return NextResponse.json({
    success: true,
    data: currapplicant,
  });
};

export const DELETE = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  const { id } = await params;

  try {
    const delApplicants = await prismaClient.application.delete({
      where: {
        id: id,
      },
    });
    return NextResponse.json({
      success: true,
      message: "Applocants Deleted",
    });
  } catch (e: any) {
    return NextResponse.json({
      success: false,
      message: ":/",
    });
  }
};
