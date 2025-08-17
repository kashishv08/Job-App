"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export default function LandingPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-50 bg-gradient-to-r from-blue-600 to-indigo-600 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
          <Link href="/" className="text-white text-2xl font-bold">
            JobFinder
          </Link>

          <nav className="hidden md:flex items-center gap-4 sm:gap-6">
            <Link
              href="#features"
              className="text-white hover:text-gray-200 transition"
            >
              Features
            </Link>
            <Link
              href="/job"
              className="text-white hover:text-gray-200 transition"
            >
              Jobs
            </Link>
            <Link
              href="/login"
              className="px-4 py-2 bg-white text-blue-600 font-semibold rounded-md hover:bg-gray-100 transition"
            >
              Login
            </Link>
            <Link
              href="/signup"
              className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-700 transition"
            >
              Signup
            </Link>
          </nav>

          <button
            className="md:hidden text-white"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-4 space-y-3">
            <Link
              href="#features"
              className="block text-white hover:text-gray-200 transition"
              onClick={() => setMenuOpen(false)}
            >
              Features
            </Link>
            <Link
              href="/job"
              className="block text-white hover:text-gray-200 transition"
              onClick={() => setMenuOpen(false)}
            >
              Jobs
            </Link>
            <Link
              href="/login"
              className="block px-4 py-2 bg-white text-blue-600 font-semibold rounded-md hover:bg-gray-100 transition"
              onClick={() => setMenuOpen(false)}
            >
              Login
            </Link>
            <Link
              href="/signup"
              className="block px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-700 transition"
              onClick={() => setMenuOpen(false)}
            >
              Signup
            </Link>
          </div>
        )}
      </header>

      <main className="flex-1 bg-gray-50">
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20 flex flex-col md:flex-row items-center gap-10">
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 leading-tight mb-4 sm:mb-6">
              Find Your Dream Job Faster
            </h2>
            <p className="text-gray-600 mb-6 text-base sm:text-lg">
              Search thousands of job openings across multiple industries,
              filter by location, salary, and job type, and get notified when
              new jobs match your profile.
            </p>
            <Link
              href="/job"
              className="inline-block px-6 py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition text-sm sm:text-base"
            >
              Browse Jobs
            </Link>
          </div>
          <div className="flex-1 flex justify-center md:justify-end">
            <img
              src="/job-search.jpg"
              alt="Job Search Illustration"
              className="w-full max-w-xs sm:max-w-md md:max-w-lg"
            />
          </div>
        </section>

        <section id="features" className="py-16 md:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-12">
              Why Choose JobFinder?
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-10">
              <div className="p-6 border rounded-lg shadow hover:shadow-lg transition">
                <h4 className="text-xl font-semibold mb-2">Easy to Search</h4>
                <p className="text-gray-600 text-sm sm:text-base">
                  Filter jobs by type, location, and salary to find exactly what
                  fits your career goals.
                </p>
              </div>
              <div className="p-6 border rounded-lg shadow hover:shadow-lg transition">
                <h4 className="text-xl font-semibold mb-2">
                  Up-to-date Listings
                </h4>
                <p className="text-gray-600 text-sm sm:text-base">
                  New jobs added daily so you never miss an opportunity.
                </p>
              </div>
              <div className="p-6 border rounded-lg shadow hover:shadow-lg transition">
                <h4 className="text-xl font-semibold mb-2">
                  Professional Guidance
                </h4>
                <p className="text-gray-600 text-sm sm:text-base">
                  Get tips and insights to improve your resume and interview
                  skills.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-20 bg-gray-50 text-center px-4 sm:px-6 lg:px-8">
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Ready to Take Your Career to the Next Level?
          </h3>
          <p className="text-gray-600 mb-6 text-base sm:text-lg">
            Start exploring jobs today and land your dream role faster.
          </p>
          <Link
            href="/job"
            className="px-6 sm:px-8 py-3 sm:py-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition text-sm sm:text-base"
          >
            Get Started
          </Link>
        </section>
      </main>

      <footer className="bg-gray-900 text-white py-8 md:py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 md:gap-0">
          <p className="text-sm sm:text-base">
            &copy; {new Date().getFullYear()} JobFinder. All rights reserved.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 text-sm sm:text-base">
            <Link href="#" className="hover:text-blue-400">
              Privacy
            </Link>
            <Link href="#" className="hover:text-blue-400">
              Terms
            </Link>
            <Link href="#contact" className="hover:text-blue-400">
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
