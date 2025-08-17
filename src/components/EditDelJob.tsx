"use client";
import { UserContext } from "@/app/(group)/layout";
import { Button } from "@radix-ui/themes";
import React, { useContext } from "react";
import EditJob from "./EditJob";
import { Openings } from "../../generated/prisma";
import { openingWithCompany } from "./Job";

function EditDelJob({ job }: { job: openingWithCompany }) {
  const { user } = useContext(UserContext);
  const handleDel = async () => {
    const response = await fetch(`/api/job-details/${job.id}`, {
      method: "DELETE",
    });
    const res = await response.json();
    if (res.success) {
      alert("job deleted");
    } else {
      alert(":/");
    }
  };
  return (
    <div>
      {user?.id == job.company?.ownerId && (
        <div className="flex gap-3">
          <Button onClick={handleDel}>Delete</Button>
          <EditJob job={job} />
        </div>
      )}
    </div>
  );
}

export default EditDelJob;
