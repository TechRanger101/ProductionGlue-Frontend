"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

const SearchSmallVenueCard = ({ searchDataItem,setHovered ,hovered}: { searchDataItem?: any,
  setHovered: (id: string) => void , hovered: string
}) => {
  return (
    <>
      <Link
        href={`/profile/${searchDataItem?.eventEntityId}?type=${searchDataItem?.type}`}
        className={
          cn("border w-full cursor-pointer border-solid rounded-md border-gray-600   sm:px-4 px-2 py-1 sm:py-2 flex justify-between items-center",
          searchDataItem?.eventEntityId === hovered ? "bg-blue-100/50" : "bg-white")
        }
        target="_blank"
    rel="noopener noreferrer"
        onMouseEnter={() => setHovered(searchDataItem?.eventEntityId)}
        onMouseLeave={() => setHovered("")}
      >
        <div className="flex md:gap-5 gap-2 items-center">
          <div>
            {searchDataItem?.images && searchDataItem?.images?.length>0 ? (
            
              <img src={searchDataItem?.images[0]} alt="Venue" className="rounded-md sm:w-20 sm:h-20 w-10 h-10"/>
            ) : (
              <div className="rounded-md sm:w-20 sm:h-20 w-10 h-10 bg-gray-200"></div>
            )}
          </div>
          <div>
            <div className="text-slate-800 lg:text-2xl sm:text-xl text-sm font-semibold whitespace-nowrap">
            {searchDataItem?.name ? searchDataItem?.name : "Venue Name"}
            </div>
            <div className="items-stretch flex gap-1 mt-3 max-sm:mt-0 pr-2.5">
              {searchDataItem?.rating && searchDataItem?.rating > 0
                ? Array.from({ length: searchDataItem.rating }).map((_, i) => (
                    <React.Fragment key={i}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        className="max-sm:w-3"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M12.2877 7.60923H19.8969L13.7686 12.3261L9.97685 15.2185L3.82016 19.9385L6.15947 12.3261L-6.10352e-05 7.60923H7.60911L9.94842 0L12.2877 7.60923ZM14.2718 14.0892L9.94842 15.2523L16.0767 20L14.2718 14.0892Z"
                          fill="#2E6AB3"
                        />
                      </svg>
                    </React.Fragment>
                  ))
                : null}
              {searchDataItem?.rating && searchDataItem?.rating < 5
                ? Array.from({ length: 5 - searchDataItem.rating }).map(
                    (_, i) => (
                      <React.Fragment key={i}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="21"
                          height="20"
                          viewBox="0 0 21 20"
                          fill="none"
                          className="max-sm:w-3"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M12.8756 7.60923H20.4847L14.3565 12.3261L10.5647 15.2185L4.40799 19.9385L6.7473 12.3261L0.587769 7.60923H8.19694L10.5363 0L12.8756 7.60923ZM14.8596 14.0892L10.5363 15.2523L16.6645 20L14.8596 14.0892Z"
                            fill="#D9D9D9"
                          />
                        </svg>
                      </React.Fragment>
                    )
                  )
                : null}
            </div>
          </div>
        </div>
        <div className="max-sm:flex max-sm:flex-col-reverse">
          <div className="text-zinc-500 max-sm:text-[10px] text-base flex font-medium whitespace-nowrap justify-center items-stretch rounded bg-emerald-200 max-sm:mt-1 mt-2.5 px-1 py-0.5 max-sm:px-2.5 max-sm:py-0.5">
            {searchDataItem?.spaceName ? searchDataItem?.spaceName.slice(0, 12) : "Space Name"}
          </div>
          <div className="text-zinc-500 max-sm:mt-0 mt-2 max-sm:text-[10px] text-base font-medium leading-5 whitespace-nowrap">
            {searchDataItem?.address ? searchDataItem?.address.slice(0, 12) + "..." : "Address"}
          </div>
        </div>
      </Link>
    </>
  );
};

export default SearchSmallVenueCard;
