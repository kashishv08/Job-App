import { getUserFromCookies } from "@/helper";
import prismaClient from "@/services/prisma";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  const id = params.id;
  const comp = await prismaClient.company.findMany({
    where: {
      id: id,
    },
    include: {
      owner: true,
      jobs: true,
    },
  });
  // const owner = await prismaClient.user.findUnique({
  //   where: {
  //     id: comp[0]?.ownerId,
  //   },
  // });
  return NextResponse.json({
    success: true,
    company: comp,
  });
};

export const DELETE = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  const id = params.id;
  const currUser = await getUserFromCookies();
  //@ts-ignore
  if (currUser.company.id == id) {
    await prismaClient.company.delete({
      where: {
        id,
      },
    });
    return NextResponse.json({
      success: true,
      message: "Company delete",
    });
  } else {
    return NextResponse.json({
      success: false,
      message: "Not owner of company",
    });
  }
};
