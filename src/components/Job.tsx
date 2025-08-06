"use client";
import React, { useContext, useState } from "react";
import { SavedJobsContext } from "./ThemeContext";
import Link from "next/link";
import { IoBookmark } from "react-icons/io5";
import { IoBookmarkOutline } from "react-icons/io5";
import { MapPin } from "lucide-react";
import JobApply from "./JobApply";
import { Company, Openings } from "../../generated/prisma";

export type openingWithCompany = Openings & { company: Company };

export default function Job({
  job,
  compact = true,
}: {
  job: openingWithCompany;
  compact?: boolean;
}) {
  const { savedJobs, setSavedJobs } = useContext(SavedJobsContext);
  // console.log(loc);
  // console.log(savedJobs);

  const prevJob = savedJobs?.find((val) => {
    if (val.id == job?.id) {
      return true;
    }
  });
  const handleSaveJob = () => {
    if (prevJob) {
      const updatedJobs = savedJobs.filter((val) => val.id !== job.id);
      setSavedJobs(updatedJobs);
    } else {
      setSavedJobs([...savedJobs, job]);
    }
  };

  return (
    <div
      style={
        compact
          ? { width: "350px", height: "250px" }
          : { width: "600px", maxWidth: "768px" }
      }
      className="bg-white border rounded-md p-6 mb-4 shadow-sm hover:shadow-md transition m-[10px]"
    >
      <div className="flex justify-between items-start gap-3">
        <div className="flex gap-3 items-center min-w-0">
          {/* {job?.employer_logo && (
            <img
              src={job?.employer_logo}
              alt="Logo"
              className="w-12 h-12 object-contain shrink-0"
            />
          )} */}
          <div className="min-w-0">
            <h3 className="text-md font-semibold text-gray-900 truncate w-[180px]">
              {job?.title}
            </h3>
            <p className="text-sm text-gray-600 truncate w-[180px]">
              {job?.salary} LPA
            </p>
          </div>
        </div>

        <button onClick={handleSaveJob}>
          {prevJob ? (
            <IoBookmark className="text-blue-600" size={20} />
          ) : (
            <IoBookmarkOutline className="text-blue-500" size={20} />
          )}
        </button>
      </div>

      <div className="flex flex-wrap gap-2 text-xs mt-3">
        {job?.employment_type}
        <span className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded-full">
          {job?.job_type ? "Remote" : "On-Site"}
        </span>
        <span className="inline-flex items-center gap-1 text-gray-600">
          <MapPin size={12} />
          {job?.location}
        </span>
      </div>

      <p className="text-sm text-gray-700 mt-3 line-clamp-3">
        {job?.desc?.slice(0, 80)}…
      </p>

      <div className="flex justify-between items-center mt-4 text-sm">
        <div className="text-gray-500">
          {job?.posted && `Posted: ${job?.posted} `}
        </div>

        <div className="flex gap-3 items-center">
          <Link
            href={`/job-details/${job.id}`}
            className="text-blue-600 hover:underline"
          >
            See details
          </Link>
        </div>
      </div>
      {job.company?.title && (
        <div className="items-end flex flex-row-reverse mt-[25px]">
          <span>
            <i>
              <Link href={`/company/${job.companyId}`}>
                <img src={job.company.logo} alt="" height={100} width={100} />
              </Link>
            </i>
          </span>
        </div>
      )}
    </div>
  );
}
