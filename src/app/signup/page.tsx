"use client";
import React, { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signup } from "@/actions/authActions";
import { X } from "lucide-react";

export default function SignUpPage() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const userObj = {
      name,
      username,
      email,
      password,
      role,
    };

    const response = await fetch("/api/signup", {
      method: "POST",
      body: JSON.stringify(userObj),
    });
    const res = await response.json();
    if (!res.success) {
      console.log(res.message);
      setError(res.message);
    }
  };
  return (
    <div className="fixed w-full  h-full top-0 left-0 z-50 flex flex-col items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
      <div className="bg-white w-[400px] p-6 rounded-md shadow-sm border items-center justify-center">
        <h3 className="text-lg font-semibold mb-4 justify-between flex">
          <div>Sign up</div>
          <div>
            <button onClick={() => router.push("/")}>
              {" "}
              <X />
            </button>
          </div>
        </h3>

        <form onSubmit={handleSubmit} method="POST">
          <label className=" text-sm font-medium mb-1">Name</label>
          <input
            type="text"
            className="border border-gray-400 rounded-sm w-full px-3 py-2 mb-4 text-sm"
            required
            name="name"
            onChange={(e) => setName(e.target.value)}
          />
          <label className=" text-sm font-medium mb-1">Username</label>
          <input
            type="text"
            className="border border-gray-400 rounded-sm w-full px-3 py-2 mb-4 text-sm"
            required
            name="username"
            onChange={(e) => setUsername(e.target.value)}
          />
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
          <select name="role" id="" onChange={(e) => setRole(e.target.value)}>
            <option value="admin">Admin</option>
            <option value="user">User</option>
          </select>
          <button
            type="submit"
            className="bg-blue-400 hover:bg-blue-300 w-full py-2 rounded-md font-semibold text-sm"
          >
            Submit
          </button>
          already have an account <Link href="/login">login</Link>
          {error && <p>{error}</p>}
        </form>
      </div>
    </div>
  );
}
