//@ts-nocheck
import { searchType } from "@/app/(group)/page";
import { getUserFromCookies } from "@/helper";
import prismaClient from "@/services/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;

  const param = searchParams.get("page") || "1";

  const page = Number.parseInt(param);

  const limit = 10;

  const data = await prismaClient.openings.findMany({
    include: {
      company: true,
    },
    take: limit,
    skip: (page - 1) * limit,
  });

  return NextResponse.json({
    success: true,
    job: data,
  });
}

export const POST = async (req: NextRequest) => {
  const body = await req.json();
  const user = await getUserFromCookies();

  console.log(body);

  // try {
  const job = await prismaClient.openings.create({
    data: {
      ...body,
      posted: "just now",
      companyId: user?.company.id,
    },
  });
  console.log(job);
  return NextResponse.json({
    success: true,
    job: job,
  });
  // } catch (e) {
  //   return NextResponse.json({
  //     success: false,
  //     message: "Something went wrong",
  //   });
  // }
};
