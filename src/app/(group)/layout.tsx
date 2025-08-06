//@ts-nocheck
"use client";
import Header from "@/components/Header";
import ThemeContext from "@/components/ThemeContext";
import { createContext, useEffect, useState } from "react";
import { Company, User } from "../../../generated/prisma";

export const UserContext = createContext<{
  user?: (User & { company: Company }) | null;
  setUser?: (value: User & { company: Company }) => void;
}>({});

export default function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [user, setUser] = useState<(User & { company: Company }) | null>(null);

  useEffect(() => {
    const handleUser = async () => {
      const res = await fetch("http://localhost:3000/api/isLoggedIn");
      const data = await res.json();

      if (data.success) {
        setUser(data.user);
      }
    };
    handleUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <ThemeContext>
        <Header />
        {children} {/* children -> refer all routes in the grp. */}
      </ThemeContext>
    </UserContext.Provider>
  );
}
