"use client";
import Job, { openingWithCompany } from "@/components/Job";
import React, { useEffect, useState } from "react";
import { Application, Openings } from "../../../../generated/prisma";

type applicantsWithJob = Application & { jobs: Openings };
function page() {
  const [applied, setApplied] = useState<applicantsWithJob[]>([]);

  useEffect(() => {
    const handleApply = async () => {
      const response = await fetch("http://localhost:3000/api/applied-jobs");
      const res = await response.json();
      //   console.log(res.appliedJobs[0]);
      if (res.success) {
        setApplied(res.appliedJobs);
      } else {
        console.log(":/");
      }
    };
    handleApply();
  }, []);
  return (
    <div>
      {applied?.map((val) => {
        return <Job job={val.jobs} key={val.id} />;
      })}
    </div>
  );
}

export default page;
