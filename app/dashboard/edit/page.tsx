"use client";
import React from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";

const EditLayout = () => {
  return (
    <>
      <div>
        <div className="md:flex gap-5 w-fit items-end pb-6">
        <div className="text-zinc-900 3xl:text-5xl text-3xl max-md:text-xl font-medium grow whitespace-nowrap">
            Edit
          </div>
          <div className="bordered-text 2xl:px-8 3xl:text-xl max-md:px-2 max-md:py-1 max-md:text-[10px] text-sm font-normal">
            {" "}
            Make changes to registered Venue/Vendors in the database
          </div>
        </div>
        <div className="flex gap-6 items-center py-6 border-solid border-y w-full border-[#B2C2D9]">
          <Link
            href="/dashboard/edit/venue"
            className={cn(
              "bordered-text grow-0 px-14 cursor-pointer transition-all duration-200 ease-in-out text-sm font-medium rounded-md hover:bg-[#2E6AB3] hover:text-white 2xl:text-xl"
            )}
          >
            Venue
          </Link>
          <Link
            href="/dashboard/edit/vendor"
            className={cn(
              "bordered-text grow-0 px-14 cursor-pointer transition-all duration-200 ease-in-out text-sm font-medium rounded-md hover:bg-[#2E6AB3] hover:text-white 2xl:text-xl"
            )}
          >
            Vendor
          </Link>
        </div>
      </div>
    </>
  );
};

export default EditLayout;
