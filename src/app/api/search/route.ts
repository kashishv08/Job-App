import prismaClient from "@/services/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const msString = searchParams.get("ms");

  const q = searchParams.get("query") || "";
  const ms = msString ? Number.parseInt(msString) : 0;
  const jt = searchParams.get("jt") || "remote";
  const et = searchParams.get("et")?.split(",") || [];
  const location = searchParams.get("loc") || "";

  try {
    const data = await prismaClient.openings.findMany({
      where: {
        OR: [
          {
            title: {
              contains: q,
              mode: "insensitive",
            },
          },
          {
            company: {
              title: {
                contains: q,
                mode: "insensitive",
              },
            },
          },
        ],
        job_type: jt,
        employment_type: {
          in: et.length ? et : ["fulltime"],
        },
        salary: {
          gte: ms,
        },
        ...(location && {
          location: {
            contains: location,
            mode: "insensitive",
          },
        }),
      },
      include: {
        company: true,
      },
    });

    return NextResponse.json({
      success: true,
      job: data,
    });
  } catch (e) {
    console.log(e);
  }
}
