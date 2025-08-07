import { getUserFromCookies } from "@/helper";
import prismaClient from "@/services/prisma";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  const id = params.id;

  const user = await getUserFromCookies();

  const job = await prismaClient.openings.findUnique({
    where: {
      id: id,
    },
    include: {
      company: true,
    },
  });

  if (job) {
    return NextResponse.json({
      success: true,
      data: {
        ...job,
      },
    });
  } else {
    return NextResponse.json({
      success: false,
      message: ":/",
    });
  }
};

export const DELETE = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  const id = params.id;
  const delJob = await prismaClient.openings.delete({
    where: {
      id,
    },
  });
  return NextResponse.json({
    success: true,
    message: "job deleted",
  });
};

export const POST = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  const id = params.id;
  const body = await req.json();

  try {
    const editJob = await prismaClient.openings.update({
      where: {
        id: id,
      },
      data: body,
    });
    return NextResponse.json({
      success: true,
      message: "Job Updated",
    });
  } catch (err: any) {
    console.log(err.message);
    return NextResponse.json({
      success: false,
      message: "Job Updation failed",
    });
  }
};
