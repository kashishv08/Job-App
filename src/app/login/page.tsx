"use client";
import React, { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { login } from "@/actions/authActions";
import { X } from "lucide-react";

export default function SignUpPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleloginSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const userObj = {
      email,
      password,
    };

    const response = await fetch("http://localhost:3000/api/login", {
      method: "POST",
      body: JSON.stringify(userObj),
      credentials: "include",
    });
    const res = await response.json();
    console.log(res);

    if (res.redirect) {
      window.location.href = res.url;
      return;
    }

    if (res?.success === false) {
      setError(res.message);
    }
  };
  return (
    <div className="fixed w-full  h-full top-0 left-0 z-50 flex flex-col items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
      <div className="bg-white w-[400px] p-6 rounded-md shadow-sm border items-center justify-center">
        <h3 className="text-lg font-semibold mb-4 justify-between flex">
          <div>Login</div>
          <div>
            <button onClick={() => router.back()}>
              {" "}
              <X className="cursor-pointer" />
            </button>
          </div>
        </h3>

        <form onSubmit={handleloginSubmit} method="POST">
          <label className=" text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            className="border border-gray-400 rounded-sm w-full px-3 py-2 mb-4 text-sm"
            required
            name="email"
            onChange={(e) => setEmail(e.target.value)}
          />

          <label className=" text-sm font-medium mb-1">Password</label>
          <input
            type="password"
            className="border border-gray-400 rounded-sm w-full px-3 py-2 mb-4 text-sm"
            required
            name="password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="submit"
            className="bg-blue-400 hover:bg-blue-300 w-full py-2 rounded-md font-semibold text-sm"
          >
            Submit
          </button>
          {error && <p>{error}</p>}
        </form>
      </div>
    </div>
  );
}
