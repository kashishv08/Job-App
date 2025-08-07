"use client";
import { UserContext } from "@/app/(group)/layout";
import { Button, Dialog } from "@radix-ui/themes";
import React, { useContext, useEffect, useState } from "react";
import { Application, Openings, User } from "../../generated/prisma";
import { openingWithCompany } from "./Job";

function Applicants({ job }: { job: openingWithCompany }) {
  const [applicants, setApplicants] = useState<
    (Application & { user: User })[]
  >([]);
  const { user } = useContext(UserContext);

  useEffect(() => {
    const handleApplicants = async () => {
      const res = await fetch(`/api/applicants/${job.id}`);
      const data = await res.json();
      const applicants = data?.data;
      setApplicants(applicants);
    };
    handleApplicants();
  }, []);

  const handleDelApplicants = async (id: string) => {
    const response = await fetch(`/api/applicants/${id}`, {
      method: "DELETE",
    });
    const res = await response.json();
    if (res.success) {
      const updatedApplicants = applicants.filter((val) => val.id !== id);
      setApplicants(updatedApplicants);
      alert("applicants deleted");
    } else {
      alert(":/");
    }
  };
  return (
    <div>
      {user?.id == job.company?.ownerId && (
        <Dialog.Root>
          <Dialog.Trigger>
            <Button>View Applicants profile</Button>
          </Dialog.Trigger>

          <Dialog.Content maxWidth="450px">
            <Dialog.Title>All Applicants</Dialog.Title>
            <Dialog.Description size="2" mb="4">
              {applicants.length > 0
                ? applicants?.map((val) => {
                    return (
                      <div className="flex justify-between">
                        <div>{val.user.name}</div>
                        <div>
                          <Button onClick={() => handleDelApplicants(val.id)}>
                            Delete
                          </Button>
                        </div>
                      </div>
                    );
                  })
                : "No user applied"}
            </Dialog.Description>
          </Dialog.Content>
        </Dialog.Root>
      )}
    </div>
  );
}

export default Applicants;
