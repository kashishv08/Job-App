"use client";
import { Box, Button, Tabs, Text, TextArea } from "@radix-ui/themes";
import React, { useState } from "react";
import Job, { openingWithCompany } from "./Job";
import { Company, Openings, Review, User } from "../../generated/prisma";

function JobListAndReviews({
  comp,
  reviews,
}: {
  comp: Company & { jobs: openingWithCompany[] };
  reviews: (Review & { user: User })[];
}) {
  const [review, setReview] = useState("");

  const handleReview = async () => {
    const res = await fetch("/api/review", {
      method: "POST",
      body: JSON.stringify({
        content: review,
        companyId: comp.id,
      }),
    });
    const data = await res.json();
    if (data.success) {
      alert("review created");
      setReview("");
    } else {
      alert(":/");
    }
  };

  return (
    <Tabs.Root defaultValue="allJobs" className="w-full max-w-4xl mx-auto mt-6">
      <Tabs.List className="flex gap-4 border-b pb-2 mb-4">
        <Tabs.Trigger
          value="allJobs"
          className="px-4 py-2 text-sm font-medium rounded-t-md data-[state=active]:border-b-2 data-[state=active]:text-blue-600 data-[state=active]:border-blue-600"
        >
          All Jobs
        </Tabs.Trigger>
        <Tabs.Trigger
          value="reviews"
          className="px-4 py-2 text-sm font-medium rounded-t-md data-[state=active]:border-b-2 data-[state=active]:text-blue-600 data-[state=active]:border-blue-600"
        >
          Reviews
        </Tabs.Trigger>
      </Tabs.List>

      <Box pt="2">
        <Tabs.Content value="allJobs">
          <div className="space-y-4">
            {comp?.jobs?.length > 0 ? (
              comp.jobs.map((val, ind) => (
                <Job job={val} key={ind} compact={false} />
              ))
            ) : (
              <p className="text-gray-500">No jobs found.</p>
            )}
          </div>
        </Tabs.Content>

        <Tabs.Content value="reviews">
          <div className="flex flex-col gap-6">
            <div className="flex w-full items-start gap-4">
              <TextArea
                placeholder="Write a review..."
                value={review}
                onChange={(e) => setReview(e.target.value)}
                className="w-full"
              />
              <Button onClick={handleReview} className="shrink-0 h-[45px] mt-1">
                Add Review
              </Button>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">All Reviews:</h3>
              <div className="space-y-3">
                {reviews?.length > 0 ? (
                  reviews.map((val, idx) => (
                    <div
                      key={idx}
                      className="p-4 border rounded-md bg-gray-50 hover:bg-white transition"
                    >
                      <p className="text-gray-800">{val.content}</p>
                      <p className="text-sm text-gray-500 mt-1">
                        by {val.user?.name || "Anonymous"}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500">No reviews yet.</p>
                )}
              </div>
            </div>
          </div>
        </Tabs.Content>
      </Box>
    </Tabs.Root>
  );
}

export default JobListAndReviews;
