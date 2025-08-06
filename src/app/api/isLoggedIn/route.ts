import { getUserFromCookies } from "@/helper";
import { verifyToken } from "@/services/jwt";
import prismaClient from "@/services/prisma";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export const GET = async () => {
  const currUser = await getUserFromCookies();
  if (!currUser) {
    return NextResponse.json({
      success: false,
      message: "User not found",
    });
  }
  // const data = await prismaClient.company.findMany({
  //   where: {
  //     ownerId: currUser.id,
  //   },
  // });
  console.log(currUser);
  return NextResponse.json({
    success: true,
    user: currUser,
  });
};
