"use client";
import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import Link from "next/link";
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
import LoadSmall from "../LoadSmall";

const RecentlyAdded = () => {
  const [data, setData] = useState<any[]>([]);
  const [paginatedData, setPaginatedData] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);
  const itemsPerPage = 10;

  useEffect(() => {
    axios.get("/api/recently-added").then((res) => {
      // console.log(res.data?.data);
      setData(res.data?.data);
      setLoading(false);
    });
  }, []);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;


  useEffect (() => {
    if(data?.length > 0){
    setPaginatedData(data.slice(startIndex, endIndex));
    console.log(paginatedData , "paginatedData");
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, currentPage])

  if (loading) return <LoadSmall />;

   
  return (
    <>
      <div className="2xl:mt-10">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-gray-900 2xl:text-2xl 2xl:font-semibold max-md:text-sm">
                Name
              </TableHead>
              <TableHead className="text-gray-900 2xl:text-2xl 2xl:font-semibold max-md:text-sm">
                Space Name
              </TableHead>
              <TableHead className="text-gray-900 2xl:text-2xl 2xl:font-semibold max-md:text-sm">
                Status
              </TableHead>
              <TableHead className="text-gray-900 pt-3 2xl:text-2xl 2xl:font-semibold max-md:hidden block">
                Address
              </TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.length > 0 &&
              paginatedData.map((venueItem, i) => (
                <TableRow key={i}>
                  <TableCell className="font-medium">
                    <div className="flex items-center">
                      <div className="rounded-full max-md:w-6 max-md:h-6 bg-[#F0F5FF] flex items-center justify-center">
                        <Image
                          src={venueItem?.images ? venueItem?.images[0] : "/arroundbg.png"}
                          width={40}
                          height={40}
                          alt="avatar"
                          className="rounded-full aspect-square"
                        />
                      </div>
                      <span className="pl-4 w-max max-md:text-xs 2xl:text-xl">
                        {venueItem?.name}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="bg-[#ABF8CE] 2xl:text-xl break-words max-md:text-xs max-md:px-1.5 max-md:py-1 px-3 rounded py-1.5">
                      {venueItem?.spaceName ? venueItem?.spaceName : venueItem?.serviceCategory ? venueItem?.serviceCategory : "N/A"}
                    </span>
                  </TableCell>
                  <TableCell className="max-md:text-xs 2xl:text-xl">
                    {venueItem?.status}
                  </TableCell>
                  <TableCell className="max-md:hidden block 2xl:text-xl">
                    {venueItem?.city + ", " + venueItem?.country}
                  </TableCell>
                  <TableCell className="w-44">
                    <Link href={`/dashboard-${venueItem?.type}/${venueItem?.eventEntityId}`}>
                      <div className="bg-[#2E6AB3] 2xl:text-xl max-md:text-xs max-md:px-2 max-md:py-1 cursor-pointer hover:opacity-90 px-6 w-fit py-2 rounded text-white">
                        View
                      </div>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <Pagination className="pt-4">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
              //  href="#"
                onClick={() => setCurrentPage((prevPage) => Math.max(prevPage - 1, 1))}
              className={currentPage === 1 ? "opacity-50" : ""}
              />
            </PaginationItem>
  
            {Array.from({ length: Math.ceil(data?.length / itemsPerPage) }).map((_, index) => (
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
              className={endIndex >= data?.length ? "opacity-50" : ""}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </>
  );
};

export default RecentlyAdded;
