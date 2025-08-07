"use client";

import { logout } from "@/actions/authActions";
import { UserContext } from "@/app/(group)/layout";
import { DropdownMenu } from "@radix-ui/themes";
import { ChevronDown, LogOut, UserCircle2 } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useContext, useState } from "react";
import AddJob from "./AddJob";
import AddCompany from "./AddCompany";
import Link from "next/link";

function Profile() {
  const [showMenu, setShowMenu] = useState(false);
  const { user } = useContext(UserContext);
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.refresh();
  };

  return (
    <DropdownMenu.Root open={showMenu} onOpenChange={setShowMenu}>
      <DropdownMenu.Trigger>
        <button className="flex items-center gap-2 text-gray-700 hover:text-blue-700 focus:outline-none transition">
          <UserCircle2 size={22} />
          <ChevronDown size={16} />
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Content className="w-64">
        <DropdownMenu.Sub>
          <DropdownMenu.SubTrigger className="group px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-200">
            <div className="flex items-center text-left  justify-center">
              <span className="text-sm font-medium text-gray-900 group-hover:text-white truncate">
                {user?.email}
              </span>{" "}
              &nbsp; &nbsp;
              <span className="text-xs text-gray-500 group-hover:text-white">
                (Logged in)
              </span>
            </div>
          </DropdownMenu.SubTrigger>

          <DropdownMenu.SubContent>
            <DropdownMenu.Item asChild>
              <button disabled className="text-gray-400 cursor-not-allowed">
                Edit Profile
              </button>
            </DropdownMenu.Item>
          </DropdownMenu.SubContent>
        </DropdownMenu.Sub>

        <DropdownMenu.Separator />

        <DropdownMenu.Sub>
          <DropdownMenu.SubTrigger>Jobs</DropdownMenu.SubTrigger>
          <DropdownMenu.SubContent>
            {user?.company && (
              <DropdownMenu.Item asChild>
                <AddJob />
              </DropdownMenu.Item>
            )}
            <DropdownMenu.Item asChild>
              <Link href="/applied-jobs">Applied Jobs</Link>
            </DropdownMenu.Item>
            {user?.role === "user" && (
              <DropdownMenu.Item asChild>
                <Link href="/savedJobs">Saved Jobs</Link>
              </DropdownMenu.Item>
            )}
          </DropdownMenu.SubContent>
        </DropdownMenu.Sub>

        <DropdownMenu.Separator />

        <DropdownMenu.Sub>
          <DropdownMenu.SubTrigger>Company</DropdownMenu.SubTrigger>
          <DropdownMenu.SubContent>
            <DropdownMenu.Item asChild>
              <Link href="/company" className="lg:hidden">
                All Companies
              </Link>
            </DropdownMenu.Item>
            {user?.company ? (
              <DropdownMenu.Item asChild>
                <Link href={`/company/${user.company.id}`}>Your Company</Link>
              </DropdownMenu.Item>
            ) : (
              <DropdownMenu.Item asChild>
                <AddCompany />
              </DropdownMenu.Item>
            )}
          </DropdownMenu.SubContent>
        </DropdownMenu.Sub>

        <DropdownMenu.Separator />

        {/* 🚪 Logout */}
        <DropdownMenu.Item asChild>
          <button
            onClick={handleLogout}
            className="w-full text-left text-red-600 hover:bg-gray-100 flex items-center gap-2 px-2 py-2"
          >
            <LogOut size={16} />
            Logout
          </button>
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}

export default Profile;
