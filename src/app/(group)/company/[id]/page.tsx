import DeleteCompany from "@/components/DeleteCompany";
import Job from "@/components/Job";
import JobListAndReviews from "@/components/JobListAndReviews";
import { getUserFromCookies } from "@/helper";
import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";

type search = Promise<{
  id: string;
}>;
async function page({ params }: { params: search }) {
  const param = await params;

  const user = await getUserFromCookies();

  const id = param.id;
  const res = await fetch(`http://localhost:3000/api/company/${id}`);
  const data = await res.json();
  const comp = data?.company;
  // console.log(comp[0]);

  if (!data.company) return notFound();
  let reviews;
  try {
    const reviewRes = await fetch(`http://localhost:3000/api/review/${id}`);
    const dataReview = await reviewRes.json();
    reviews = dataReview?.review;
    console.log(dataReview);
  } catch (e) {
    console.log("review error: ", e);
  }

  console.log(reviews);

  return (
    <div className="w-full max-w-5xl mx-auto p-4">
      {comp.length > 0 ? (
        <div className="bg-white border rounded-xl p-6 mb-6 shadow-md hover:shadow-lg transition-all w-full">
          <div className="flex justify-between items-start gap-4">
            <div className="flex flex-col gap-1 w-full">
              <h2 className="text-xl font-semibold text-gray-800 truncate">
                {comp[0]?.title}
              </h2>
              <p className="text-sm text-gray-500 line-clamp-3">
                {comp[0]?.desc}
              </p>
              <p className="text-sm text-gray-600 mt-2">
                <span className="font-medium text-gray-700">Owner:</span>{" "}
                {comp[0]?.owner.name}
              </p>
            </div>

            {user?.id == comp[0].ownerId && <DeleteCompany id={id} />}
          </div>
        </div>
      ) : (
        <div className="text-center text-red-500 font-medium text-lg mb-6">
          Company not found
        </div>
      )}

      <div className="bg-white border rounded-xl p-6 shadow-sm">
        <JobListAndReviews comp={comp[0]} reviews={reviews} />
      </div>
    </div>
  );
}

export default page;
