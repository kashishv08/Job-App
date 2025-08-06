//@ts-nocheck
"use client";
import { Button, Dialog } from "@radix-ui/themes";
import React, { useEffect, useState } from "react";

function Applicants({ job }) {
  const [applicants, setApplicants] = useState("");

  useEffect(() => {
    const handleApplicants = async () => {
      const res = await fetch(`/api/applicants/${job.id}`);
      const data = await res.json();
      const applicants = data?.data;
    };
    handleApplicants();
  });

  return (
    <div>
      <Dialog.Root>
        <Dialog.Trigger>
          <Button>View Applicants profile</Button>
        </Dialog.Trigger>

        <Dialog.Content maxWidth="450px">
          <Dialog.Title>Edit profile</Dialog.Title>
          <Dialog.Description size="2" mb="4">
            Make changes to your profile.
          </Dialog.Description>
        </Dialog.Content>
      </Dialog.Root>
    </div>
  );
}

export default Applicants;
