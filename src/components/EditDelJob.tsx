//@ts-nocheck
"use client";
import { UserContext } from "@/app/(group)/layout";
import { Button } from "@radix-ui/themes";
import React, { useContext } from "react";
import EditJob from "./EditJob";

function EditDelJob({ job }) {
  const { user } = useContext(UserContext);
  const handleDel = async () => {
    const response = await fetch(`/api/job-details/${job.id}`, {
      method: "DELETE",
    });
    if (response.success) {
      alert("job deleted");
    } else {
      alert(":/");
    }
  };
  return (
    <div>
      {user?.id == job.company.ownerId && (
        <div>
          <Button onClick={handleDel}>Delete</Button>
          <EditJob job={job} />
        </div>
      )}
    </div>
  );
}

export default EditDelJob;
