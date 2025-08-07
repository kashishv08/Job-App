"use client";
import React, { useState } from "react";
import JobApply from "./JobApply";
import { Openings } from "../../generated/prisma";
import { Button } from "@radix-ui/themes";

function ApplyDeleteToggle({
  userHasApplied,
  job,
}: {
  userHasApplied: Boolean;
  job: Openings;
}) {
  const [isApplied, setIsApplied] = useState<Boolean>(userHasApplied);

  const handleDelete = async () => {
    const response = await fetch(`/api/job-details/apply/${job?.id}`, {
      method: "DELETE",
    });
    const res = await response.json();
    if (res.success) {
      //   alert("deleted");
      setIsApplied(false);
    } else {
      alert(":/");
    }
  };

  return (
    <div>
      {!isApplied ? (
        <JobApply job={job} setIsApplied={setIsApplied} isApplied={isApplied} />
      ) : (
        <Button onClick={handleDelete}>Delete</Button>
      )}
    </div>
  );
}

export default ApplyDeleteToggle;
