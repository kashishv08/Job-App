import { generateToken } from "@/services/jwt";
import prismaClient from "@/services/prisma";
import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const body = await req.json();

  const isUser = await prismaClient.user.findUnique({
    where: {
      username: body.username,
      email: body.email,
    },
  });
  try {
    if (!isUser) {
      const user = await prismaClient.user.create({
        data: body,
      });

      const token = generateToken({
        id: user.id,
      });

      // const response = NextResponse.json(
      //   {
      //     success: true,
      //     data: user,
      //     message: "Successfully registered :)",
      //   },
      //   { status: 201 }
      // );

      const response = NextResponse.redirect("http://localhost:3000");
      response.cookies.set("jobToken", token);
      return response;
    } else {
      return NextResponse.json(
        {
          success: false,
          message: "User already Exist",
        },
        { status: 500 }
      );
    }
  } catch (err: any) {
    console.log(err.message);
  }
};
