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
    <div className="min-h-screen w-full mx-auto p-5">
      <div className="flex justify-between items-start flex-wrap">
        <div className="flex items-start gap-4">
          {/* {job.employer_logo && (
            <img
              src={job.employer_logo}
              alt="logo"
              className="w-16 h-16 object-contain"
            />
          )} */}
          <div>
            <h4 className="text-2xl font-semibold">{job.title}</h4>
            <p className="text-gray-600">{job.job_type}</p>
          </div>
        </div>

        <div className="mt-2 text-sm text-gray-700">
          📍 {job.location} <br /> 💼 [{job.employment_type}]
        </div>
      </div>

      <div className="mt-6 text-gray-800">
        <h5 className="text-lg font-medium mb-2">Job Description:</h5>
        <pre className="whitespace-pre-wrap text-sm bg-gray-50 p-4 rounded border">
          {job.desc}
        </pre>
      </div>

      <div className="mt-8 flex justify-end">
        <JobApply job={job} />
      </div>
      <EditDelJob job={job} />
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
