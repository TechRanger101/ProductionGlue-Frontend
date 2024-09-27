"use client";
import { Eye } from "lucide-react";
import React, { Fragment } from "react";
import Link from "next/link";

const SharedVenueVendorsList = ({ data }: { data?: any }) => {
  return (
    <div className="relative">
      <div className="flex flex-col gap-6 pt-16 w-full">
        <div className="bg-[#E2EFFF] rounded-md px-5 py-6 max-md:py-3 flex justify-between gap-3 w-4/5 max-md:w-full">
          <h3 className="text-gray-900 max-md:text-sm max-md:w-1/4  font-medium">
            ID
          </h3>
          <h3 className="text-gray-900 max-md:text-sm max-md:w-1/4  font-medium">
            
          </h3>
          <h3 className="text-gray-900 max-md:text-sm max-md:w-1/4  font-medium">
            Items
          </h3>
          <div className="max-md:w-1/4 hidden max-md:block" />
        </div>
        {data &&
          Object.entries(data) &&
          Object.entries(data).length > 0 &&
          Object.entries(data).map((venue: any, i: number) => (
            // console.log(venue, " venue ", i),
            <Fragment key={i}>
              <div className="flex gap-x-10 max-md:gap-0">
                <div className="rounded-md px-5 py-4 flex justify-between max-md:items-center gap-3 w-4/5 max-md:w-full ">
                  <h3 className="text-gray-900 max-md:text-sm max-md:w-1/4 font-medium">
                    {venue ? venue?.[0]?.slice(0, 17) : "Venue Name"}
                  </h3>
                  <h3 className="text-gray-900 max-md:text-sm max-md:w-1/4 font-medium">
                    {venue ? venue?.[1]?.[0]?.type : "Vendor Name"}
                  </h3>
                  <h3 className="text-gray-900 max-md:text-sm max-md:w-1/4 font-medium">
                    <span className="bg-[#ABF8CE] px-3 max-md:px-1 max-md:py-0.5 rounded py-1.5">
                      {venue?.[1]?.length}
                    </span>
                  </h3>
                  <div className="max-md:w-1/4 max-md:block hidden">
                    <Link
                      href={`/user/saved/${venue?.EntityListNameId}`}
                      className="flex justify-center max-md:text-xs text-sm rounded-md items-center bg-[#2E6AB3] py-4 px-20 max-md:py-1.5 max-md:px-3 max-2xl:px-14 hover:opacity-80 text-white gap-3"
                    >
                      View <Eye className="text-white max-md:w-4" />
                    </Link>
                  </div>
                </div>
                <div className="max-md:hidden block">
                  <Link
                    href={`/user/saved/${venue?.[0]}`}
                    className="flex justify-center text-sm rounded-md items-center bg-[#2E6AB3] py-4 px-20 max-xl:px-6 max-2xl:px-14 hover:opacity-80 text-white gap-3"
                  >
                    View <Eye className="text-white" />
                  </Link>
                </div>
              </div>
            </Fragment>
          ))}
      </div>
    </div>
  );
};

export default SharedVenueVendorsList;
