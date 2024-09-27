"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Bookmark, Filter } from "lucide-react";
import { useCycle } from "framer-motion";
import MobileMenu from "@/components/MobileMenu";
import ScrollLink from "@/components/ScrollLink";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import axios from "axios";
import toast from "react-hot-toast";
import Footer from "@/components/home/Footer";
import UserPrivateCards from "@/components/user-private/UserPrivateCards";
import SavedTable from "@/components/user-private/SavedTable";
import { useParams } from "next/navigation";
import { NewLogo } from "@/components/home/Header";

const SharedEntityDetails = () => {
  const [gridType, setGridType] = useState<"grid" | "list">("grid");
  const [isOpen, toggleOpen] = useCycle(false, true);
  const { sharedId } = useParams();

  const [userVenueorVendorList, setUserVenueList] = useState([]);
  const [paginatedData, setPaginatedData] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 10;

  const getUserPrivateVenuesId = async () => {
    if (!localStorage.getItem("email")) {
      // toast.error("Please Login Again");
      return;
    }
    try {
      const res = await axios.get(
        `/api/user-private-venues-vendors-list-id?EntityListNameId=${sharedId}`
      );
      setUserVenueList(res.data?.data);
      console.log(res.data?.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserPrivateVenuesId();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    <>
      <section>
        <div className="flex-col overflow-hidden relative flex min-h-[600px] 3xl:min-h-[680px] max-lg:min-h-[340px] w-full items-center  pt-5  max-md:max-w-full max-md:px-5">
          <Image
            src="/admin/bgadminven.svg"
            height={600}
            width={1920}
            className="absolute top-0 left-0 z-[-1] max-lg:h-[45vh] max-lg:w-full max-lg:object-cover xl:w-full"
            alt="hero"
          />

          <div className="relative 2xl:h-[70vh] h-[60vh] max-h-[48vh] flex w-full max-w-[93%] flex-col max-md:max-w-full">
            <div className="md:fixed xl:right-[3%] xl:w-[94%] md:w-[91%] md:right-[5%] z-[1000] justify-between items-center border backdrop-blur-[5px] bg-[#4545451a] bg-opacity-10 self-stretch hidden md:flex gap-5 px-10 py-2.5 rounded-[40px] border-solid border-white/60 border-opacity-60 max-md:max-w-full max-md:flex-wrap max-md:px-5">
            <Link href="/">
            <NewLogo
              width={190}
              height={36}
              className="h-9 3xl:aspect-[3/1] 3xl:h-14"
              // color="#a6a8ab"
            />
          </Link>
          <div className="flex space-x-14 items-center">
          <Link
              href="/"
              className="text-white hover:opacity-60   font-semibold 2xl:font-bold 2xl:text-lg hidden md:flex md:justify-center md:flex-row"
            >
              Home
            </Link>
            <Link
              href="/user"
              className="text-white hover:opacity-60   font-semibold 2xl:font-bold 2xl:text-lg hidden md:flex md:justify-center md:flex-row"
            >
              Dashboard
            </Link>
            <Link
              href="/user/profile"
              className="text-white    font-semibold 2xl:font-bold 2xl:text-lg hidden md:flex md:justify-center md:flex-row"
            >
              Profile
            </Link>
            <Link
              href="/user/saved"
              className="text-white    font-semibold 2xl:font-bold 2xl:text-lg hidden md:flex md:justify-center md:flex-row"
            >
              Saved
            </Link>
          </div>
            </div>
            <div className="py-3 lg:hidden justify-between items-center self-stretch  flex gap-5  max-md:max-w-full max-md:flex-wrap max-md:px-5">
              <Link href="/">
                <Image
                  src="/logo-white.svg"
                  width={190}
                  height={40}
                  alt="logo "
                  className="max-md:w-36 max-h-8"
                />
              </Link>
              <div>
                <button onClick={() => toggleOpen()}>
                  <svg width="23" height="23" viewBox="0 0 23 23">
                    <path
                      fill="transparent"
                      strokeWidth="3"
                      stroke="#FFFFFF"
                      strokeLinecap="round"
                      d="M 2 2.5 L 12 2.5"
                    ></path>
                    <path
                      fill="transparent"
                      strokeWidth="3"
                      stroke="#FFFFFF"
                      strokeLinecap="round"
                      d="M 2 9.423 L 20 9.423"
                      opacity="1"
                    ></path>
                    <path
                      fill="transparent"
                      strokeWidth="3"
                      stroke="#FFFFFF"
                      strokeLinecap="round"
                      d="M 10 16.346 L 20 16.346"
                    ></path>
                  </svg>
                </button>
              </div>
            </div>

            <MobileMenu
              pageName="Users"
              isOpen={isOpen}
              toggleOpen={toggleOpen}
            />
            <div className="absolute w-full max-lg:bottom-0 max-md:top-32 top-56 left-0 items-stretch flex max-w-full flex-col pl-1 pr-4 max-md:mt-10">
              <div className="text-[#818181] max-md:text-[10px] text-base 2xl:text-xl font-medium leading-6 whitespace-nowrap items-stretch border border-[color:var(--gray-200,#E4E4E7)] backdrop-blur-[7px] bg-white w-fit px-3.5 2xl:px-5 2xl:py-4 py-2 max-md:px-2 max-md:py-0.5 rounded-[60px] border-solid">
                View saved venue & vendor
              </div>
              <div className="flex justify-between w-full items-end">
                <div>
                  <div className="text-white text-6xl 2xl:text-7xl leading-normal font-extrabold mt-10 max-md:mt-5 max-md:max-w-full max-md:text-4xl">
                    Saved Details{" "}
                  </div>
                </div>
                <div className="hover:scale-125 max-md:hidden transform transition-all duration-300 ease-in-out cursor-pointer">
                  <ScrollLink href="#userSavedDetails">
                    <Image
                      src="/ArrowDown.svg"
                      width={110}
                      height={110}
                      alt="down"
                    />
                  </ScrollLink>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          id="userSavedDetails"
          className=" md:max-w-[93%] md:mx-auto max-md:px-5 max-md:mt-0 mt-10 mb-20"
        >
          <div>
            <div className="relative justify-between pt-14 lg:pt-0 items-stretch self-stretch  w-full gap-5  max-md:max-w-full max-md:flex-wrap max-md:pr-0">
              <div className="text-gray-900 text-3xl max-md:text-base md:text-4xl font-medium grow whitespace-nowrap">
                View your saved venue and vendor
              </div>
              <div className="flex max-md:items-start max-md:flex-col justify-between max-md:text-sm items-center gap-2.5">
                <div className="text-gray-900 text-base max-md:text-sm font-medium leading-6 grow whitespace-nowrap">
                  View as
                </div>
                <div
                  className="bordered-text grow-0 cursor-pointer"
                  onClick={() =>
                    setGridType(
                      gridType === "grid"
                        ? "list"
                        : "grid" || gridType === "list"
                        ? "grid"
                        : "list"
                    )
                  }
                >
                  Tiles <Filter size={16} className="inline-flex ml-3" />
                </div>
              </div>
            </div> 
          </div>
          <div className="transition-all duration-300 ease-in-out">
            {gridType === "grid" ? (
              <UserPrivateCards data={paginatedData} />
            ) : (
              <SavedTable data={paginatedData} />
            
            )}
          </div>
          <Pagination className="pt-4">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                 //  href="#"
                  onClick={() =>
                    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1))
                  }
                  className={currentPage === 1 ? "opacity-50" : ""}
                />
              </PaginationItem>

              {Array.from({
                length: Math.ceil(userVenueorVendorList?.length / itemsPerPage),
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
                    endIndex >= userVenueorVendorList.length ? "opacity-50" : ""
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
         
        </div>
        <div className="mt-10">
     <Footer bgColor="bg-[#2E6AB3]" />
      </div>
      </section>
    </>
  );
};

export default SharedEntityDetails;
