import data from "@/data";
import prismaClient from "@/services/prisma";
import React from "react";
import { Openings } from "../../../generated/prisma";

function page() {
  async function addData() {
    "use server";
    const newData = data.map((ele) => {
      return {
        title: ele.job_title,
        location: "Mumbai, India",
        desc: ele.job_description,
        salary: 10000,
        posted: ele.job_posted_human_readable,
        apply_link: ele.job_apply_link,
        job_type: "onsite",
        employment_type: "parttime",
      };
    });

    const job = await prismaClient.openings.createMany({
      data: newData as Openings[],
    });
  }
  return (
    <form action={addData}>
      <button className="border-4" type="submit">
        submit
      </button>
    </form>
  );
}

export default page;
