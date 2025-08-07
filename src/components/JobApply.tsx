"use client";
import React, { useContext } from "react";
import Applicants from "./Applicants";
import { getUserFromCookies } from "@/helper";
import { UserContext } from "@/app/(group)/layout";
import { Openings } from "../../generated/prisma";
import { openingWithCompany } from "./Job";

function JobApply({
  job,
  setIsApplied,
  isApplied,
}: {
  job: openingWithCompany;
  setIsApplied: (value: Boolean) => void;
  isApplied: Boolean;
}) {
  // console.log(job);
  const { user } = useContext(UserContext);

  const handleApply = async () => {
    const res = await fetch(`/api/job-details/apply/${job?.id}`);
    const data = await res.json();
    if (data.success) {
      console.log("applied :)");
      setIsApplied(!isApplied);
    } else {
      alert(":/");
    }
  };
  return (
    <div>
      {user?.id !== job.company?.ownerId && (
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-md"
          onClick={handleApply}
        >
          Apply
        </button>
      )}
    </div>
  );
}

export default JobApply;
