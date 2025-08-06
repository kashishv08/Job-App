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
  });
  return NextResponse.json({
    success: true,
    data: currapplicant,
  });
};
