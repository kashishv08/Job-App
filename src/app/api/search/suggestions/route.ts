import prismaClient from "@/services/prisma";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  const searchParams = req.nextUrl.searchParams;
  const q = searchParams.get("q");

  if (!q) {
    return NextResponse.json({
      success: false,
      suggestions: [],
    });
  }

  const sugg = await prismaClient.openings.findMany({
    where: {
      title: {
        contains: q,
        mode: "insensitive",
      },
    },
    select: {
      id: true,
      title: true,
    },
    take: 5,
  });

  return NextResponse.json({
    success: true,
    suggestions: sugg,
  });
};
