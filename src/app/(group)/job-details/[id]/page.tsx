import Applicants from "@/components/Applicants";
import EditDelJob from "@/components/EditDelJob";
import JobApply from "@/components/JobApply";
import data from "@/data";
import React from "react";

type search = Promise<{
  id: string;
}>;

export default async function Page({ params }: { params: search }) {
  const param = await params;
  let id = param.id;

  const res = await fetch(`http://localhost:3000/api/job-details/${id}`);
  const data = await res.json();
  const job = data.data;

  if (!job) return <p className="p-4 text-red-500">Job not found</p>;

  return (
    <div className="min-h-screen w-full max-w-5xl mx-auto p-8 bg-white shadow rounded">
      {/* Header */}
      <div className="flex justify-between items-center flex-wrap mb-8 border-b pb-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">{job.title}</h1>
          <div className="text-sm text-gray-600 mt-1">
            {job.job_type} | 📍 {job.location} | 💼 {job.employment_type}
          </div>
        </div>

        {/* View Applicants Button */}
        <div className="mt-4 sm:mt-0">
          <Applicants job={job} />
        </div>
      </div>

      <div className="mb-10">
        <h2 className="text-xl font-semibold text-gray-800 mb-3">
          Job Description:
        </h2>
        <pre className="whitespace-pre-wrap text-sm bg-gray-50 p-4 rounded border text-gray-700">
          {job.desc}
        </pre>
      </div>

      <div className="flex justify-end items-center gap-4">
        <JobApply job={job} />
        <EditDelJob job={job} />
      </div>
    </div>
  );
}

// const url = `https://jsearch.p.rapidapi.com/job-details?job_id=${id}&country=us`;
// const options = {
//   method: "GET",
//   headers: {
//     "x-rapidapi-key": "80592fc81dmsh36e591707119be0p139c2cjsnd89e8c84a780",
//     "x-rapidapi-host": "jsearch.p.rapidapi.com",
//   },
// };

// const response = await fetch(url, options);
// const result = await response.json();
// console.log(result);
// const job = result?.data[0];
// console.log(job);
