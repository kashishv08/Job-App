import { generateToken, verifyToken } from "@/services/jwt";
import prismaClient from "@/services/prisma";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const body = await req.json();
  const isUser = await prismaClient.user.findUnique({
    where: {
      email: body.email,
    },
  });
  console.log(isUser);

  if (isUser) {
    if (isUser.password == body.password && isUser.email == body.email) {
      const token = generateToken({
        id: isUser.id,
      });

      const response = NextResponse.redirect("http://localhost:3000");

      response.cookies.set("jobToken", token);
      return response;
    } else {
      return NextResponse.json({
        success: false,
        message: "Invalid Creds",
      });
    }
  } else {
    return NextResponse.redirect("http://localhost:3000/signup");
  }
};
