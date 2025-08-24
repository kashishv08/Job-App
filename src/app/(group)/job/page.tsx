import { openingWithCompany } from "@/components/Job";
import JobPage from "@/components/JobPage";

export type searchType = Promise<{
  page: string;
}>;

export default async function page({
  searchParams,
}: {
  searchParams: searchType;
}) {
  // const url =
  //   "https://jsearch.p.rapidapi.com/search?query=developer%20jobs%20in%20chicago&page=1&num_pages=1&country=us&date_posted=all";
  // const options = {
  //   method: "GET",
  // headers: {
  //   "x-rapidapi-key": "80592fc81dmsh36e591707119be0p139c2cjsnd89e8c84a780",
  //   "x-rapidapi-host": "jsearch.p.rapidapi.com",
  // },
  // };

  // try {
  //   const response = await fetch(url, options);
  //   const result = await response.json();
  //   const data = result?.data;
  // } catch (error) {
  //   console.error(error);
  // }
  // const jobs = await prismaClient.openings.findMany();

  const searched = await searchParams;

  const page = Number.parseInt(searched.page) || 1;

  const res = await fetch(`http://localhost:3000/api/jobs?page=${page}`);
  const data = await res.json();
  const jobs = data?.job as openingWithCompany[];

  return <JobPage jobs={jobs} />;
}
