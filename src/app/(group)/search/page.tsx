import Job, { openingWithCompany } from "@/components/Job";
import Sidebar from "@/components/Sidebar";
import prismaClient from "@/services/prisma";
// import data from "@/data.js";

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
  const et = search.et ? search.et.split(",") : [];
  const loc = search.loc || "";
  const ms = search.ms ? Number.parseInt(search.ms) : 0;

  const req = await fetch(
    `http://localhost:3000/api/search?query=${query}&jt=${jt}&et=${et}&loc=${loc}&ms=${ms}`
  );
  const data = await req.json();
  const jobs = data.job;

  return (
    <div className="flex justify-between m-[20px]">
      <div>
        {jobs.map((val: openingWithCompany) => {
          return <Job job={val} compact={false} key={val.id} />;
        })}
      </div>

      <div className="mt-[10px]">
        <Sidebar />
      </div>
    </div>
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
