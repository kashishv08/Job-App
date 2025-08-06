import React from "react";
import { Company, User } from "../../../../generated/prisma";
import Link from "next/link";

type companyWithOwner = Company & { owner: User };

async function page() {
  const response = await fetch("http://localhost:3000/api/company");
  const res = await response.json();
  let company;
  if (res.success) {
    company = res.companies;
  } else {
    console.log(":/");
  }
  console.log(company);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white py-12 px-4 sm:px-8">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-14 tracking-tight">
        🌐 Our Registered Companies
      </h1>

      <div className="flex flex-wrap justify-start gap-8">
        {company.length > 0 ? (
          company.map((val: companyWithOwner) => (
            <Link
              key={val.id}
              href={`/company/${val.id}`}
              className="w-full sm:w-[48%] lg:w-[31%] max-w-sm"
            >
              <div
                className="relative bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 flex flex-col gap-4 
    w-full cursor-pointer pb-8"
              >
                <div className="flex justify-between items-start">
                  <h2 className="text-xl font-semibold text-gray-800 max-w-[70%]">
                    {val.title}
                  </h2>
                  {val.logo ? (
                    <img
                      src={val.logo}
                      alt={`${val.title} logo`}
                      className="w-12 h-12 object-contain rounded-md border border-gray-200"
                    />
                  ) : (
                    <div className="w-12 h-12 flex items-center justify-center bg-gray-100 text-gray-400 text-xs rounded-md border border-gray-200">
                      No Logo
                    </div>
                  )}
                </div>

                <p className="text-gray-700 text-sm mt-2 line-clamp-4 overflow-hidden">
                  {val.desc || "No description provided."}
                </p>

                <div className="mt-auto text-xs text-gray-500 self-end">
                  <span className="font-medium text-gray-600">Owner:</span>{" "}
                  {val.owner?.name ?? "N/A"}
                </div>
              </div>
            </Link>
          ))
        ) : (
          <p className="text-center text-red-500 w-full text-lg font-medium">
            No companies found.
          </p>
        )}
      </div>
    </div>
  );
}

export default page;
