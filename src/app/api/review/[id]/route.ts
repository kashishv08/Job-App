//@ts-nocheck
import prismaClient from "@/services/prisma";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  const company_id = params.id;

  try {
    const review = await prismaClient.review.findMany({
      where: {
        companyId: company_id,
      },
      include: {
        user: true,
      },
    });
    return NextResponse.json({
      success: true,
      review,
    });
  } catch (e) {
    console.log(e.message);
    // return NextResponse.json({
    //   success: false,
    //   message: ":/",
    // });
  }
};
