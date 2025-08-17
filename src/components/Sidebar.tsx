"use client";
import { useRouter, useSearchParams } from "next/navigation";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { ChangeEvent, useState } from "react";
import { ChevronLeft } from "lucide-react";
import { GiHamburgerMenu } from "react-icons/gi";

export default function Sidebar() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [sidebar, setSidebar] = useState<boolean>(false);

  const jt = searchParams.get("jt");
  const et = searchParams.get("et");
  const query = searchParams.get("query");
  const ms = searchParams.get("ms");
  const location = searchParams.get("loc");

  const [type, setType] = useState(et ? et.split(",") : []);
  const [jobtype, setJobtype] = useState(jt || "remote");
  const [loc, setLoc] = useState(location || "");
  const [salary, setSalary] = useState<number | number[]>(
    ms ? Number.parseInt(ms) : 0
  );

  const handleTypeChange = (e: ChangeEvent<HTMLInputElement>) => {
    const currtype = e.target.value;
    const checked = e.target.checked;

    if (checked) setType([...type, currtype]);
    else setType((prev) => prev.filter((val) => val != currtype));
  };

  const applyFilter = () => {
    const url = `/search?query=${query}&jt=${jobtype}&et=${type.join(
      ","
    )}&loc=${loc}&ms=${salary}`;
    router.push(url);
  };

  return (
    <>
      <div className="block md:hidden z-50" onClick={() => setSidebar(true)}>
        <div className="absolute top-27 ">
          <GiHamburgerMenu size={20} />
        </div>
      </div>

      <aside
        className={`
           h-full bg-white p-4 rounded-lg shadow border z-40
          ${
            sidebar
              ? "block w-[80%] fixed top-0 left-0"
              : " hidden md:block w-full "
          } 
        `}
      >
        <div className="inline-flex gap-2 justify-start md:hidden mb-4 items-center">
          <button onClick={() => setSidebar(false)}>
            <ChevronLeft size={24} />
          </button>
          <h2 className="text-lg font-semibold">Filter Jobs</h2>
        </div>

        {/* Location */}
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

        {/* Salary Slider */}
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

        {/* Employment Type */}
        <div className="mb-5">
          <label className="block text-sm font-medium mb-2">
            Employment Type
          </label>
          <div className="space-y-2 text-sm">
            {["fulltime", "parttime", "contractor"].map((val) => (
              <label className="flex items-center gap-2" key={val}>
                <input
                  type="checkbox"
                  value={val}
                  checked={type.includes(val)}
                  onChange={handleTypeChange}
                />
                {val.charAt(0).toUpperCase() +
                  val.slice(1).replace("time", "-Time")}
              </label>
            ))}
          </div>
        </div>

        {/* Job Type */}
        <div className="mb-5">
          <label className="block text-sm font-medium mb-2">Job Type</label>
          <div className="flex flex-col gap-2 text-sm">
            {["remote", "onsite"].map((val) => (
              <label className="flex items-center gap-2" key={val}>
                <input
                  type="radio"
                  name="jobType"
                  value={val}
                  checked={jobtype === val}
                  onChange={(e) => setJobtype(e.target.value)}
                />
                {val.charAt(0).toUpperCase() + val.slice(1)}
              </label>
            ))}
          </div>
        </div>

        <button
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 text-sm"
          onClick={applyFilter}
        >
          Apply Filters
        </button>
      </aside>
    </>
  );
}
