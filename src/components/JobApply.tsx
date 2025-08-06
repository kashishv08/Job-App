//@ts-nocheck
"use client";
import React from "react";
import Applicants from "./Applicants";

function JobApply({ job }) {
  console.log(job);
  const handleApply = async () => {
    const res = await fetch(`/api/job-details/apply/${job?.id}`);
    const data = await res.json();
    if (data.success) {
      alert("applied :)");
    } else {
      alert(":/");
    }
  };
  return (
    <div>
      <Applicants job={job} />

      <button
        className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-md"
        onClick={handleApply}
      >
        Apply
      </button>
    </div>
  );
}

export default JobApply;
