import Job, { openingWithCompany } from "@/components/Job";
import Sidebar from "@/components/Sidebar";

export type searchType = {
  query: string;
  jt: string;
  et: string;
  loc: string;
  ms: string;
};

async function page({ searchParams }: { searchParams: searchType }) {
  const search = await searchParams;

  const query = search.query || "";
  const jt = search.jt || "remote";
  const et = search.et ? search.et.split(",") : ["fulltime"];
  const loc = search.loc || "";
  const ms = search.ms ? Number.parseInt(search.ms) : 0;

  const req = await fetch(
    `http://localhost:3000/api/search?query=${query}&jt=${jt}&et=${et}&loc=${loc}&ms=${ms}`
  );
  const data = await req.json();
  const jobs = data.job;

  return (
    <main className="flex w-full p-[10px] ">
      {/* Filters Sidebar */}
      <aside className="md:w-[30%] w-0">
        <h2 className="text-lg font-semibold text-gray-700 mb-4 border-b pb-2 hidden md:block">
          🔍 Filters
        </h2>
        <Sidebar />
      </aside>

      {/* Job List Section */}
      <section className="lg:w-[70%] mr-[10px] md:w-full sm:w-full">
        <h2 className="text-lg font-semibold text-gray-700 mb-4  pb-2">
          💼 Job Listings
        </h2>

        <div className="">
          {jobs.length > 0 ? (
            jobs.map((val: openingWithCompany) => (
              <Job job={val} compact={false} key={val.id} />
            ))
          ) : (
            <p className="text-gray-500 text-sm mt-4">
              No jobs found. Try different filters.
            </p>
          )}
        </div>
      </section>
    </main>
  );
}

export default page;

// const url = `https://jsearch.p.rapidapi.com/search?query=${search}%20jobs%20in%20chicago&page=1&num_pages=1&country=us&date_posted=all`;
// const options = {
//   method: "GET",
//   headers: {
// "x-rapidapi-key": "80592fc81dmsh36e591707119be0p139c2cjsnd89e8c84a780",
// "x-rapidapi-host": "jsearch.p.rapidapi.com",
//   },
// };

// const response = await fetch(url, options);
// const result = await response.json();
// //   console.log(result.data);
// const data = result.data;
