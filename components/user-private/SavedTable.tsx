import { Eye } from "lucide-react";
import React, { Fragment } from "react";
import Link from "next/link";

const SavedTable = ({ data }: { data?: any }) => {
  return (
    <div className="relative">
      <div className="flex flex-col gap-6 pt-16 w-full">
        <div className="bg-[#E2EFFF] rounded-md px-5 py-6 max-md:py-3 flex justify-between gap-3 w-4/5 max-md:w-full">
          <h3 className="text-gray-900 max-md:text-sm max-md:w-1/4 lg:min-w-[25%]  font-medium">
            Name
          </h3>
          <h3 className="text-gray-900 max-md:text-sm max-md:w-1/4 lg:min-w-[25%]  font-medium">
            Space Name
          </h3>
          <h3 className="text-gray-900 max-md:hidden font-medium">Status</h3>
          <h3 className="text-gray-900 max-md:text-sm max-md:w-1/4 lg:min-w-[25%] font-medium pr-12 text-end">
            Address
          </h3>
          <div className="max-md:w-1/4 lg:min-w-[25%] hidden max-md:block" />
        </div>
        {data &&
          data.length > 0 &&
          data.map((venue: any, i: number) => (
            <Fragment key={i}>
              <div className="flex gap-x-10 max-md:gap-0">
                <div className="rounded-md px-5 py-4 flex justify-between max-md:items-center gap-3 w-4/5 max-md:w-full ">
                  <h3 className="text-gray-900 max-md:text-sm max-md:w-1/4 lg:min-w-[25%]  font-medium">
                    {venue?.name ? venue?.name?.slice(0, 17) : "Venue Name"}
                  </h3>
                  <h3 className="text-gray-900 max-md:text-sm max-md:w-1/4 lg:min-w-[25%] font-medium">
                    <span className="bg-[#ABF8CE] px-3 max-md:px-1 max-md:py-0.5 rounded py-1.5">
                      {venue?.spaceName || "Space Name"}
                    </span>
                  </h3>
                  <h3 className="text-gray-900 font-medium max-md:hidden block">
                    {venue?.status || "Status"}
                  </h3>
                  <h3 className="text-gray-900 max-md:text-sm max-md:w-1/4 lg:min-w-[25%] font-medium pr-12 max-md:pr-0 text-end">
                    {venue?.address
                      ? venue?.address.slice(
                          venue?.address.length - 12,
                          venue?.address.length
                        )
                      : "Address"}
                  </h3>
                  <div className="max-md:w-1/4 lg:min-w-[25%]  max-md:block hidden">
                    <Link
                      href={`/user/sharedVenueVendor/${venue?.[0]?.sharedVenueVendorId}`}
                      className="flex justify-center max-md:text-xs text-sm rounded-md items-center bg-[#2E6AB3] py-4 px-20 max-md:py-1.5 max-md:px-3 max-2xl:px-14 hover:opacity-80 text-white gap-3"
                    >
                      View <Eye className="text-white max-md:w-4" />
                    </Link>
                  </div>
                </div>
                <div className="max-md:hidden block">
                  <Link
                    href={`/user/sharedVenueVendor/${venue?.[0]?.sharedVenueVendorId}`}
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

export default SavedTable;
