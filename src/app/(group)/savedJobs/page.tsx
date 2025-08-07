"use client";
import Job from "@/components/Job";
import { SavedJobsContext } from "@/components/ThemeContext";
import React, { useContext, useEffect, useState } from "react";

function Page() {
  const { savedJobs } = useContext(SavedJobsContext);
  console.log(savedJobs);

  // const [job, setJob] = useState([]);

  // useEffect(() => {
  //   const storedItems = localStorage.getItem("job");
  //   setJob(storedItems ? JSON.parse(storedItems) : []);
  // }, []);

  return (
    <div className="flex flex-wrap">
      {savedJobs?.map((val) => {
        return <Job job={val} key={val.id} />;
      })}
    </div>
  );
}

export default Page;
