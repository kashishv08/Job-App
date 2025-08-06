//@ts-nocheck
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { verifyToken } from "./services/jwt";
import prismaClient from "./services/prisma";

export const getUserFromCookies = async () => {
  const cookie = await cookies();
  const token = cookie.get("jobToken")?.value;
  if (token) {
    const data = verifyToken(token); //it will give object of payload(data we attached in the token)
    if (!data) {
      return null;
    }

    const user = await prismaClient.user.findUnique({
      where: {
        id: data.id,
      },
      include: {
        company: true,
      },
      // omit: {
      //   password: true,
      // },
    });
    if (user) return user;
    else return null;
  } else {
    return null;
  }
};
