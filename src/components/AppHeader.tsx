"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import vtappLogo from "@vtapp/assets/vtapp-logo.png";

export default function AppHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header>
      <nav className="w-full bg-black z-10">
        <div className="max-w-7xl mx-auto px-6 md:px-12 xl:px-6">
          <div className="flex flex-wrap items-center justify-between py-2 gap-6 md:py-4 md:gap-0 relative">
            <input
              aria-hidden="true"
              type="checkbox"
              name="toggle_nav"
              id="toggle_nav"
              className="hidden peer"
              checked={isMenuOpen}
              onChange={() => setIsMenuOpen(!isMenuOpen)}
            />
            <div className="relative z-40 w-full flex justify-between lg:w-max md:px-0">
              <Link
                href="/"
                aria-label="logo"
                className="flex space-x-2 items-center"
              >
                <Image
                  src={vtappLogo}
                  alt="VTAPP logo"
                  className="max-h-8 w-auto"
                />
              </Link>

              <div className="relative flex items-center lg:hidden max-h-10">
                <label
                  role="button"
                  htmlFor="toggle_nav"
                  aria-label="humburger"
                  id="hamburger"
                  className="relative p-6 -mr-6"
                >
                  <div
                    aria-hidden="true"
                    id="line"
                    className="m-auto h-0.5 w-5 rounded bg-gray-300 transition duration-300"
                    style={{
                      transform: isMenuOpen
                        ? "rotate(45deg) translate(0, 0.45rem)"
                        : "",
                    }}
                  ></div>
                  <div
                    aria-hidden="true"
                    id="line2"
                    className="m-auto mt-2 h-0.5 w-5 rounded bg-gray-300 transition duration-300"
                    style={{
                      transform: isMenuOpen
                        ? "rotate(-45deg) translate(0, -0.45rem )"
                        : "",
                    }}
                  ></div>
                </label>
              </div>
            </div>
            <div
              aria-hidden="true"
              className="fixed z-20 inset-0 h-screen w-screen bg-white/70 backdrop-blur-2xl origin-bottom scale-y-0 transition duration-500 peer-checked:origin-top peer-checked:scale-y-100 lg:hidden dark:bg-gray-900/70"
            ></div>
            <div
              className="flex-col z-20 flex-wrap gap-6 p-8 rounded-3xl border border-gray-100 bg-white shadow-2xl shadow-gray-600/10 justify-end w-full invisible opacity-0 translate-y-1  absolute top-full left-0 transition-all duration-300 scale-95 origin-top 
                            lg:relative lg:scale-100 lg:peer-checked:translate-y-0 lg:translate-y-0 lg:flex lg:flex-row lg:items-center lg:gap-0 lg:p-0 lg:bg-transparent lg:w-7/12 lg:visible lg:opacity-100 lg:border-none
                            peer-checked:scale-100 peer-checked:opacity-100 peer-checked:visible lg:shadow-none 
                            dark:shadow-none dark:bg-gray-800 dark:border-gray-700"
            >
              <div className="text-white lg:pr-4 lg:w-auto w-full lg:pt-0">
                <ul className="tracking-wide font-medium lg:text-sm flex-col flex lg:flex-row gap-6 lg:gap-0">
                  <li>
                    <span className="block md:px-4 transition hover:text-primary">
                      <Link href="/">Home</Link>
                    </span>
                  </li>
                  <li>
                    <span className="block md:px-4 transition hover:text-primary">
                      <Link href="/#about">About</Link>
                    </span>
                  </li>
                  <li>
                    <span className="block md:px-4 transition hover:text-primary">
                      <Link href="/events">Events</Link>
                    </span>
                  </li>
                  <li>
                    <span className="block md:px-4 transition hover:text-primary">
                      <Link href="/schedule">Schedule</Link>
                    </span>
                  </li>
                  <li>
                    <span className="block md:px-4 transition hover:text-primary">
                      <Link href="/team">Team</Link>
                    </span>
                  </li>
                  <li>
                    <span className="block md:px-4 transition hover:text-primary">
                      <Link href="sponsors">Sponsors</Link>
                    </span>
                  </li>
                </ul>
              </div>

              <div className="mt-12 lg:mt-0 ">
                <Link
                  className="cursor-not-allowed hover:cursor-not-allowed relative flex h-9 w-full items-center justify-center px-4 before:absolute before:inset-0 before:rounded-full before:bg-primary before:transition before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95 sm:w-max"
                  href=""
                >
                  <span className="relative text-sm font-semibold text-gray-800 ">
                    Register Now
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
