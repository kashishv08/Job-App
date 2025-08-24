"use server";
import { generateToken, verifyToken } from "@/services/jwt";
import prismaClient from "@/services/prisma";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const signup = async (userObj: any) => {
  const isUser = await prismaClient.user.findUnique({
    where: {
      username: userObj.username,
      email: userObj.email,
    },
  });
  try {
    if (!isUser) {
      const user = await prismaClient.user.create({
        data: userObj,
      });

      const token = generateToken({
        id: user.id,
      });

      const cookie = await cookies();
      cookie.set("jobToken", token);

      redirect("/");

      // return {
      //   success: true,
      //   // data: user,
      //   message: "Successfully registered :)",
      // };
    } else {
      return {
        success: false,
        message: "User already Exist",
      };
    }
  } catch (err: any) {
    console.log(err.message);
  }
};

export const login = async (userObj: any) => {
  const isUser = await prismaClient.user.findUnique({
    where: {
      email: userObj.email,
    },
  });

  if (isUser) {
    if (isUser.password == userObj.password && isUser.email == userObj.email) {
      const token = generateToken({
        id: isUser.id,
      });

      const cookie = await cookies();
      cookie.set("jobToken", token);
      return {
        success: true,
        message: "Successfully Login :)",
      };
    } else {
      return {
        success: false,
        message: "Invalid Creds",
      };
    }
  } else {
    redirect("/signup");
    // return {
    //   success: false,
    //   message: "user not found",
    // };
  }
};

export const logout = async () => {
  const cookie = await cookies();
  const token = cookie.get("jobToken")?.value;
  if (!token) redirect("/");
  else {
    cookie.delete("jobToken");
    return true;
  }
};

export const isLoggedIn = async () => {
  const cookie = await cookies();
  const token = cookie.get("jobToken")?.value;
  if (token) {
    const data = verifyToken(token); //it will give object of payload(data we attached in the token)

    const user = await prismaClient.user.findUnique({
      where: {
        id: data.id,
      },
      omit: {
        password: true,
      },
    });
    return {
      success: true,
      user: user,
    };
  } else {
    return {
      success: false,
    };
  }
};
