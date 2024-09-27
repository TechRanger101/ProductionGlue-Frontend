"use client";
import React from "react";
import Link from "next/link";
import {
  ChevronDown,
  Home,
  HomeIcon,
  Lock,
  LogOut,
  MapPin,
  PenSquare,
  Plus,
  Store,
  User,
} from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const Sidebar = () => {
  const pathname = usePathname();
  return (
    <>
      <aside className="pl-16 fixed max-xl:pl-6 md:overflow-y-auto md:scrollbar-hide 2xl:overflow-y-hidden h-full pr-10 max-xl:pr-4 py-5 2xl:py-10 max-md:w-full max-md:px-5 border-r border-[#B2C2D9] border-solid">
       <div className="relative h-[95vh] md:h-auto 2xl:h-[95vh]">
       <h4 className="font-light mb-7 2xl:text-xl 3xl:text-2xl  2xl:mb-10">
          Dashboard{" "}
          <ChevronDown className="ml-4 inline-flex " strokeWidth={1} />
        </h4>
        <ul className="mb-8 2xl:mb-12">
          <li
            className={cn(
              " font-light py-2 hover:bg-[#D7E9FF] px-5 rounded-full mb-2 2xl:text-lg",

              pathname === "/dashboard" && "bg-[#D7E9FF]"
            )}
          >
            <Link href="/dashboard">
              <p>
                <Home className="mr-4 inline-flex " strokeWidth={2} /> Overview
              </p>
            </Link>
          </li>
          <li
            className={cn(
              " font-light py-2 hover:bg-[#D7E9FF] px-5 rounded-full mb-2 2xl:text-lg",

              pathname === "/dashboard/venue" && "bg-[#D7E9FF]"
            )}
          >
            <Link href="/dashboard/venue">
              <p>
                <MapPin className="mr-4 inline-flex " strokeWidth={2} /> Venue
              </p>
            </Link>
          </li>
          <li
            className={cn(
              " font-light py-2 hover:bg-[#D7E9FF] px-5 rounded-full mb-2 2xl:text-lg",

              pathname === "/dashboard/vendors" && "bg-[#D7E9FF]"
            )}
          >
            <Link href="/dashboard/vendors">
              <p>
                <Store className="mr-4 inline-flex " strokeWidth={2} /> Vendors
              </p>
            </Link>
          </li>
          <li
            className={cn(
              " font-light py-2 hover:bg-[#D7E9FF] px-5 rounded-full mb-2 2xl:text-lg",

              pathname === "/dashboard/users" && "bg-[#D7E9FF]",
              pathname ===  "/dashboard/users/edit" && "bg-[#D7E9FF]"
            )}
          >
            <Link href="/dashboard/users">
              <p>
                <User className="mr-4 inline-flex " strokeWidth={2} /> Users
              </p>
            </Link>
          </li>
        </ul>
        <h4 className="font-light mb-7 2xl:text-xl 3xl:text-2xl 2xl:mb-10">
          Data Management{" "}
          <ChevronDown className="ml-4 inline-flex " strokeWidth={1} />
        </h4>
        <ul className="mb-7">
          <li
            className={cn(
              " font-light py-2 hover:bg-[#D7E9FF] px-5 rounded-full mb-2 2xl:text-lg",

              pathname === "/dashboard/add" && "bg-[#D7E9FF]",
              pathname === "/dashboard/add/venue" && "bg-[#D7E9FF]",
              pathname === "/dashboard/add/vendor" && "bg-[#D7E9FF]"
            )}
          >
            <Link href="/dashboard/add">
              <p>
                <Plus className="mr-4 inline-flex " strokeWidth={2} /> Add
              </p>
            </Link>
          </li>
          <li
            className={cn(
              " font-light py-2 hover:bg-[#D7E9FF] px-5 rounded-full mb-2 2xl:text-lg",

              pathname === "/dashboard/edit" && "bg-[#D7E9FF]",
              pathname === "/dashboard/edit/venue" && "bg-[#D7E9FF]",
              pathname === "/dashboard/edit/vendor" && "bg-[#D7E9FF]"
            )}
          >
            <Link href="/dashboard/edit">
              <p>
                <PenSquare className="mr-4 inline-flex " strokeWidth={2} /> Edit
              </p>
            </Link>
          </li>
        </ul>

        <div className="2xl:absolute md:relative md:pb-12 2xl:pb-5 2xl:bottom-24 md:bottom-0 left-0 right-0 ">
        <div
            className={cn(
              "text-sm w-full font-light py-2.5 hover:opacity-70 px-5 rounded-full mb-4 bg-[#D7E9FF]"
            )}
          >
            <Link href="/admin">
              <p className="w-max">
                <Lock className="mr-4 inline-flex " strokeWidth={2} /> Go to
                Admin
              </p>
            </Link>
          </div>
          <div
            className={cn(
              "text-sm w-full font-light py-2.5 hover:opacity-70 px-5 rounded-full mb-2 bg-[#D7E9FF]"
            )}
          >
            <Link href="/">
              <p className="w-max">
                <HomeIcon className="mr-4 inline-flex " strokeWidth={2} /> Go to
                Website
              </p>
            </Link>
          </div>
        </div>
       </div>
      </aside>
    </>
  );
};

export default Sidebar;
