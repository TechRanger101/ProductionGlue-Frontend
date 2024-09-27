"use client";

import { Filter } from "lucide-react";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import UserPrivateCards from "./UserPrivateCards";
import SavedTable from "./SavedTable";
import axios from "axios";
import toast from "react-hot-toast";
import NoVenueVendors from "../NoVenueVendors";
import { cn } from "@/lib/utils";

export default function ViewYourVenue() {
  const [gridType, setGridType] = useState<"grid" | "list">("grid");
  const [userVenueorVendorList, setUserVenueList] = useState([]);
  const [paginatedData, setPaginatedData] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [notFound, setNotFound] = useState<boolean>(true);
  const itemsPerPage = 9;

  const getUserPrivateVenuesId = async () => {
    if (!localStorage.getItem("email")) {
      // toast.error("Please Login Again");
      return;
    }
    try {
      const res = await axios.get(
        `/api/user-private-venues-vendors?userEmail=${localStorage.getItem(
          "email"
        )}`
      );
      setUserVenueList(res.data?.data);
      console.log(res.data?.data);
      if (res.data?.data?.length >0) {
        setNotFound(false);
      }
    } catch (error) {
      console.log(error);
      setNotFound(true);
    }
  };

  useEffect(() => {
    getUserPrivateVenuesId();
  }, []);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  useEffect(() => {
    if (userVenueorVendorList?.length > 0) {
      setPaginatedData(userVenueorVendorList.slice(startIndex, endIndex));
      console.log(paginatedData, "paginatedData");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userVenueorVendorList, currentPage]);

  return (
    <div
      id="AdminVenueVendors"
      className={cn(
        "flex-col justify-center items-center overflow-hidden relative flex min-h-[1277px] pt-20 max-md:pt-0 pb-32  max-md:max-w-full ",
        notFound ? "min-h-[500px]" : ""
      )}
    >
      <Image
        src="/vendorbg.png"
        layout="fill"
        className="absolute h-full w-full object-cover object-center inset-0"
        alt=""
      />

      {notFound ? (
        <>
          <div className="relative w-[93%] mx-auto justify-between pt-14 lg:pt-10 items-stretch self-stretch  gap-5  max-md:max-w-full max-md:flex-wrap">
            <div className="text-gray-900 max-md:text-base text-3xl md:text-4xl 3xl:text-6xl font-semibold grow whitespace-nowrap">
              View your venue and vendor
            </div>
            <div className="flex max-md:flex-col max-md:items-start justify-between items-center gap-2.5">
              <h3 className="text-gray-500 max-md:text-base max-xs:text-sm text-lg 2xl:text-xl max-md:pt-3 pt-3">
                Select the venue and vendor of choice 
              </h3>
            </div>
          </div>
          <div className="relative  md:max-w-[93%] md:mx-auto max-md:px-5 max-md:mt-8 mt-16 mb-6">
            <NoVenueVendors />
          </div>
        </>
      ) : (
        <>
          <div className="relative w-[93%] mx-auto justify-between pt-14 lg:pt-0 items-stretch self-stretch  gap-5  max-md:max-w-full max-md:flex-wrap">
            <div className="text-gray-900 max-md:text-base text-3xl md:text-4xl 3xl:text-6xl font-semibold grow whitespace-nowrap">
              View your venue and vendor
            </div>
            <div className="flex max-md:flex-col max-md:items-start justify-between items-center gap-2.5">
              <h3 className="text-gray-500 max-md:text-sm 2xl:text-xl text-base max-md:pt-3">
                Select the venue and vendor of choice
              </h3>
              <div
                onClick={() =>
                  setGridType(
                    gridType === "grid"
                      ? "list"
                      : "grid" || gridType === "list"
                      ? "grid"
                      : "list"
                  )
                }
                className="bordered-text grow-0 cursor-pointer"
              >
                Tiles <Filter size={16} className="inline-flex ml-3" />
              </div>
            </div>
          </div>
          <div className="transition-all w-full duration-300 ease-in-out">
            {gridType === "grid" ? (
              <UserPrivateCards data={paginatedData} />
            ) : (
              <>
                <div className="relative  md:max-w-[93%] md:mx-auto max-md:px-5 max-md:mt-0 mt-10 mb-20">
                  <SavedTable data={paginatedData} />
                </div>
              </>
            )}
          </div>

          <div className="w-[93%] relative mx-auto mt-16 max-md:mt-10">
            <Pagination className="pt-4">
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                   //  href="#"
                    onClick={() =>
                      setCurrentPage((prevPage) => Math.max(prevPage - 1, 1))
                    }
                    className={currentPage === 1 ? "opacity-50 pointer-events-none" : ""}
                  />
                </PaginationItem>

                {Array.from({
                  length: Math.ceil(
                    userVenueorVendorList?.length / itemsPerPage
                  ),
                }).map((_, index) => (
                  <PaginationItem key={index + 1}>
                    <PaginationLink
                     //  href="#"
                      isActive={index + 1 === currentPage}
                      onClick={() => setCurrentPage(index + 1)}
                    >
                      {index + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                {
                  //    <PaginationItem>
                  //    <PaginationEllipsis />
                  //  </PaginationItem>
                }
                <PaginationItem>
                  <PaginationNext
                   //  href="#"
                    onClick={() => setCurrentPage((prevPage) => prevPage + 1)}
                    className={
                      endIndex >= userVenueorVendorList?.length
                        ? "opacity-50 pointer-events-none"
                        : ""
                    }
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </>
      )}
    </div>
  );
}
