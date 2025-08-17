"use client";
import React, { useEffect, useState } from "react";
import Job, { openingWithCompany } from "./Job";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Openings } from "../../generated/prisma";

function JobPage({ jobs }: { jobs: openingWithCompany[] }) {
  const searchParams = useSearchParams();

  const param = searchParams.get("page") || "1";

  const currpage = Number.parseInt(param);
  const router = useRouter();

  const [compact, setCompact] = useState(false);

  return (
    <div className="flex flex-col items-center gap-6 py-8">
      <div className="flex flex-wrap gap-4 justify-center">
        {jobs.map((val) => (
          <Job job={val} key={val.id} compact={true} />
        ))}
      </div>

      <div className="flex items-center gap-4 mt-8">
        {currpage == 1 ? (
          <button className="px-4 py-2 rounded-md border text-sm font-medium bg-gray-200 text-gray-400 cursor-not-allowed">
            {"<<"}
          </button>
        ) : (
          <Link
            href={`/?page=${currpage - 1}`}
            className={`px-4 py-2 rounded-md border text-sm font-medium ${
              currpage == 1
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-white text-blue-600 hover:bg-blue-100 border-blue-400"
            }`}
          >
            {"<<"}
          </Link>
        )}
        <span className="text-sm font-semibold text-gray-700">
          Page {currpage}
        </span>
        {jobs.length < 10 ? (
          <button className="px-4 py-2 rounded-md border text-sm font-medium bg-gray-200 text-gray-400 cursor-not-allowed">
            {">>"}
          </button>
        ) : (
          <Link
            href={`/?page=${currpage + 1}`}
            className="px-4 py-2 rounded-md border bg-white text-blue-600 hover:bg-blue-100 border-blue-400 text-sm font-medium"
          >
            {">>"}
          </Link>
        )}
      </div>
    </div>
  );
}

export default JobPage;
