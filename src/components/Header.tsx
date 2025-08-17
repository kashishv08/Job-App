"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import {
  Bookmark,
  Search,
  UserCircle2,
  ChevronDown,
  LogOut,
  Menu,
} from "lucide-react";
import { isLoggedIn, logout } from "@/actions/authActions";
import AddJob from "./AddJob";
import { UserContext } from "@/app/(group)/layout";
import AddCompany from "./AddCompany";
import { Openings } from "../../generated/prisma";
import { Button } from "@radix-ui/themes";
import Profile from "./Profile";
import Sidebar from "./Sidebar";

export default function Header() {
  const [search, setSearch] = useState("");
  const { user } = useContext(UserContext);
  const [sugg, setSugg] = useState<Openings[]>([]);

  const router = useRouter();
  const handleKeyDown = (e: any) => {
    if (e.key === "Enter") {
      router.push(`/search?query=${search}`);
    }
  };

  const handleLogout = async () => {
    await logout();
    router.refresh();
  };

  useEffect(() => {
    async function getSugg() {
      const response = await fetch(
        `http://localhost:3000/api/search/suggestions?q=${search}`
      );
      const res = await response.json();

      if (res.success) {
        setSugg(res.suggestions);
      }
    }

    let x: NodeJS.Timeout;
    if (search) {
      x = setTimeout(() => {
        getSugg();
      }, 1000);
    } else {
      setSugg([]);
    }

    return () => {
      if (x) clearInterval(x);
    };
  }, [search]);

  // console.log(user);

  return (
    <>
      <nav className="w-full bg-white border-b shadow-sm px-6 py-3 flex items-center justify-between text-sm sticky top-0 z-20">
        <Link href="/" className="text-blue-700 text-2xl font-bold">
          JobFinder
        </Link>

        <div className="flex items-center gap-5">
          <Link
            href="/company"
            className="text-sm text-gray-800 hover:text-blue-700 font-medium hidden lg:block"
          >
            All Companies
          </Link>
          {user?.email ? (
            <>
              {user?.role == "user" && (
                <Link
                  href="/savedJobs"
                  className="text-sm text-gray-800 hover:text-blue-700 font-medium hidden lg-block"
                >
                  Saved Jobs
                </Link>
              )}
              <Profile />
            </>
          ) : (
            <div>
              <Link
                href="/login"
                className="text-sm text-blue-800 font-medium mr-[10px]"
              >
                Sign In
              </Link>
              <Link
                href="/signup"
                className="text-sm text-gray-800 font-medium"
              >
                SignUp
              </Link>
            </div>
          )}
        </div>
      </nav>

      <section className="w-full bg-gray-50 py-6 px-2 flex justify-center items-center relative">
        <form
          className="bg-white shadow-md rounded-lg flex md:flex-row gap-1 items-center px-6 py-4 w-[350px] justify-between relative"
          action={`/search?query=${search}`}
        >
          <div className="w-full">
            <div className="flex justify-between items-center w-full">
              <div className="flex items-center border rounded-md px-3 py-2 sm:w-[50%] md:w-full lg:w-full ml-[30px] md:ml-0">
                <Search className="text-gray-400 mr-1" />
                <input
                  type="text"
                  name="query"
                  value={search}
                  onKeyDown={handleKeyDown}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search jobs..."
                  className="lg:w-full outline-none text-sm  "
                />
              </div>
            </div>

            {sugg.length > 0 && (
              <div className="absolute top-full left-0 mt-1 bg-white border rounded-md shadow-md w-full z-10">
                {sugg.map((val) => {
                  return (
                    <p
                      key={val.id}
                      className="px-3 py-2 text-sm hover:bg-gray-100 cursor-pointer truncate"
                    >
                      <Link href={`/job-details/${val.id}`}>{val?.title}</Link>
                    </p>
                  );
                })}
              </div>
            )}
          </div>

          <div>
            <button
              type="submit"
              className="hidden md:block display-none bg-blue-600 text-white px-5 py-0.5 rounded-md hover:bg-blue-700 text-sm "
            >
              Find jobs
            </button>
          </div>
        </form>
      </section>
    </>
  );
}
