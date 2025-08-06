import { getUserFromCookies } from "@/helper";
import prismaClient from "@/services/prisma";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const body = await req.json();

  const isUser = await getUserFromCookies();
  let comp;
  if (isUser) {
    comp = await prismaClient.company.create({
      data: {
        ...body,
        ownerId: isUser.id,
      },
    });
    return NextResponse.json({
      success: true,
      company: comp,
    });
  } else {
    return NextResponse.json({
      success: false,
      message: "User not found",
    });
  }
};

export const GET = async () => {
  const companies = await prismaClient.company.findMany({
    include: {
      owner: true,
      jobs: true,
    },
  });
  return NextResponse.json({
    success: true,
    companies,
  });
};
