"use client";
import { useSearchParams } from "next/navigation";
import React, { ChangeEvent, useState } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { useRouter } from "next/navigation";

export default function Sidebar() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const jt = searchParams.get("jt");
  const et = searchParams.get("et");
  const query = searchParams.get("query");
  const ms = searchParams.get("ms");
  const location = searchParams.get("loc");

  const [type, setType] = useState(et ? et.split(",") : []);
  const [jobtype, setJobtype] = useState(jt || "remote");
  const [loc, setLoc] = useState(location || "");
  const [salary, setSalary] = useState<number>(ms ? Number.parseInt(ms) : 0);

  const handleTypeChange = (e: ChangeEvent<HTMLInputElement>) => {
    const currtype = e.target.value;
    const checked = e.target.checked;

    if (checked) {
      setType([...type, currtype]);
    } else {
      setType((prev) => prev.filter((val) => val != currtype));
    }
  };

  const applyFilter = () => {
    const url = `/search?query=${query}&jt=${jobtype}&et=${type.join(
      ","
    )}&loc=${loc}&ms=${salary}`;
    router.push(url);
  };

  return (
    <aside className="w-full md:w-64 bg-white p-4 rounded-lg shadow border">
      <h2 className="text-lg font-semibold mb-4">Filter Jobs</h2>
      <div className="mb-5">
        <label className="block text-sm font-medium mb-1">Location</label>
        <input
          type="text"
          placeholder="Enter city or state"
          className="w-full px-3 py-2 border rounded-md text-sm"
          onChange={(e) => setLoc(e.target.value)}
          value={loc}
        />
      </div>

      <div className="mb-5">
        <label className="block text-sm font-medium mb-2">
          Salary Range (₹)
        </label>
        <div className="px-2">
          <Slider
            min={0}
            max={500000}
            step={10000}
            defaultValue={0}
            onChange={(value) => setSalary(value)}
          />
          <div className="flex justify-between mt-2 text-xs text-gray-600">
            <span>₹1k</span>
            <span>₹5L</span>
          </div>
        </div>
      </div>
      <div className="mb-5">
        <label className="block text-sm font-medium mb-2">
          Employment Type
        </label>
        <div className="space-y-2 text-sm">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              value="fulltime"
              checked={type.includes("fulltime")}
              onChange={handleTypeChange}
            />
            Full-Time
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              value="parttime"
              checked={type.includes("parttime")}
              onChange={handleTypeChange}
            />
            Part-Time
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              value="contractor"
              checked={type.includes("contractor")}
              onChange={handleTypeChange}
            />
            Contractor
          </label>
        </div>
      </div>
      <div className="mb-5">
        <label className="block text-sm font-medium mb-2">Job Type</label>
        <div className="flex flex-col gap-2 text-sm">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="jobType"
              value="remote"
              checked={jobtype === "remote"}
              onChange={(e) => setJobtype(e.target.value)}
            />
            Remote
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="jobType"
              value="onsite"
              checked={jobtype === "onsite"}
              onChange={(e) => setJobtype(e.target.value)}
            />
            Onsite
          </label>
        </div>
      </div>

      <div className="mb-5">
        <label className="block text-sm font-medium mb-2">Date Posted</label>
        <select className="w-full px-3 py-2 border rounded-md text-sm">
          <option value={"none"}>Any time</option>
          <option value={"24-hours"}>Last 24 hours</option>
          <option value={"3-days"}>Last 3 days</option>
          <option value={"7-days"}>Last 7 days</option>
          <option value={"30-days"}>Last 30 days</option>
        </select>
      </div>
      <button
        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 text-sm"
        onClick={applyFilter}
      >
        Apply Filters
      </button>
    </aside>
  );
}
