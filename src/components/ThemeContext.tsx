//@ts-nocheck
"use client";
import Header from "@/components/Header";
import { Theme } from "@radix-ui/themes";
import { createContext, useEffect, useState } from "react";
import { Openings } from "../../generated/prisma";

export const SavedJobsContext = createContext<{
  savedJobs?: Openings[];
  setSavedJobs?: (value: Openings[]) => void;
}>({});

export default function ThemeContext({ children }) {
  const [savedJobs, setSavedJobs] = useState<Openings[] | []>([]);

  console.log(savedJobs);
  return (
    <div>
      <SavedJobsContext.Provider
        value={{
          savedJobs,
          setSavedJobs,
        }}
      >
        {children}
      </SavedJobsContext.Provider>
    </div>
  );
}
