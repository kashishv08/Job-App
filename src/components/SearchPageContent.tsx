import { useState } from "react";
import Job, { openingWithCompany } from "./Job";
import Sidebar from "./Sidebar";

export function SearchPageContent({ jobs }: { jobs: openingWithCompany[] }) {
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <div className="flex flex-col md:flex-row m-[20px]">
      <div className="md:hidden mb-4">
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded-md"
          onClick={() => setShowSidebar(!showSidebar)}
        >
          {showSidebar ? "Close Filters" : "Show Filters"}
        </button>
      </div>

      {showSidebar && (
        <div className="fixed top-0 left-0 z-20 w-[70%] h-full bg-white p-4 shadow-lg overflow-auto md:hidden">
          <button
            className="mb-4 text-gray-700 hover:text-gray-900"
            onClick={() => setShowSidebar(false)}
          >
            ← Close
          </button>
          <Sidebar />
        </div>
      )}

      <div className="hidden md:block md:mr-4">
        <Sidebar />
      </div>

      <div className="flex-1">
        {jobs.map((val) => (
          <Job job={val} compact={false} key={val.id} />
        ))}
      </div>
    </div>
  );
}
