//@ts-nocheck
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
} from "lucide-react";
import { isLoggedIn, logout } from "@/actions/authActions";
import AddJob from "./AddJob";
import { UserContext } from "@/app/(group)/layout";
import AddCompany from "./AddCompany";

export default function Header() {
  const [search, setSearch] = useState("");
  const [showMenu, setShowMenu] = useState(false);
  const { user } = useContext(UserContext);
  const [sugg, setSugg] = useState([]);

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

    let x;
    if (search) {
      x = setTimeout(() => {
        getSugg();
      }, [1000]);
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
      <nav className="w-full bg-white border-b shadow-sm px-6 py-3 flex items-center justify-between text-sm">
        <Link href="/" className="text-blue-700 text-2xl font-bold">
          JobFinder
        </Link>

        <div className="flex items-center gap-5">
          <Link
            href="/company"
            className="text-sm text-gray-800 hover:text-blue-700 font-medium"
          >
            All Companies
          </Link>
          {user?.email ? (
            <>
              {user?.role == "user" && (
                <Link
                  href="/savedJobs"
                  className="text-sm text-gray-800 hover:text-blue-700 font-medium"
                >
                  Saved Jobs
                </Link>
              )}

              <div className="relative">
                <button
                  onClick={() => setShowMenu(!showMenu)}
                  className="flex items-center gap-2 text-gray-700 hover:text-blue-700 focus:outline-none transition"
                >
                  <UserCircle2 size={22} />
                  <ChevronDown size={16} />
                </button>

                {showMenu && (
                  <div className="absolute right-0 mt-3 bg-white border border-gray-200 rounded-xl shadow-lg z-20 w-64 overflow-hidden text-sm">
                    {/* Email Section */}
                    <div className="px-4 py-3 border-b bg-gray-50">
                      <p className="text-gray-800 font-medium truncate">
                        {user.email}
                      </p>
                      <p className="text-xs text-gray-500">Logged in</p>
                    </div>

                    {/* Company Section */}
                    {user?.company ? (
                      <div className="border-b px-4 py-3 space-y-2">
                        <AddJob />
                        <Link
                          href={`/company/${user.company.id}`}
                          className="block text-blue-600 hover:underline"
                        >
                          View Company Details
                        </Link>
                      </div>
                    ) : (
                      <div className="border-b px-4 py-3">
                        <AddCompany />
                      </div>
                    )}

                    {/* Logout */}
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-3 text-red-600 hover:bg-gray-100 flex items-center gap-2"
                    >
                      <LogOut size={16} />
                      Logout
                    </button>
                  </div>
                )}
              </div>
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

          {/* <Link href="/employers" className="ml-2 text-sm hover:text-blue-700"> */}
          {/* </Link> */}
        </div>
      </nav>

      <section className="w-full bg-gray-50 py-6 px-2 flex justify-center items-center">
        <form
          className="bg-white shadow-md rounded-lg flex md:flex-row gap-1 items-center px-6 py-4 w-[350px] justify-between relative"
          action={`/search?query=${search}`}
        >
          <div className="w-full relative">
            <div className="flex items-center w-full border rounded-md px-3 py-2">
              <Search className="text-gray-400 mr-1" />
              <input
                type="text"
                name="query"
                value={search}
                onKeyDown={handleKeyDown}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search jobs..."
                className="w-full outline-none text-sm"
              />
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
              className="bg-blue-600 text-white px-5 py-0.5 rounded-md hover:bg-blue-700 text-sm"
            >
              Find jobs
            </button>
          </div>
        </form>
      </section>
    </>
  );
}
