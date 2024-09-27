"use client";
import { DataTable } from "@/components/data-table/venue-table";
import React, { useState, useEffect } from "react";
import { columns, Venues } from "./columns";
import { useVenueTablePageStore } from "@/store/venueTablePage";
import axios from "axios";
const VenuePage = () => {
  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState({
    limit: 50,
    lastEventEntityId: "",
    currentItemsCount: 0,
    totalItemsCount: 0,
  });
  const [perPage, setPerPage] = useState(10);
  const {venueTablePage } = useVenueTablePageStore();
  console.log(venueTablePage, "venueTablePage");

  const getVenues = async () => {
    const res = await axios.get(`/api/venues`, {
      params: {
        limit: 150,
        currentItemsCount: pagination?.currentItemsCount,
        totalItemsCount: pagination.totalItemsCount,
      },
    });
    const venues = await res.data;
    setPagination(venues.pagination);
    setData(venues.venues);
  };

  const loadMoreVenues = async () => {
    if (pagination.lastEventEntityId === null) {
      return;
    }
    const res = await axios.get(`/api/venues`, {
      params: {
        limit: 100,
        lastEventEntityId: pagination?.lastEventEntityId,
        currentItemsCount: pagination?.currentItemsCount,
        totalItemsCount: pagination.totalItemsCount,
      },
    });
    const venues = await res.data;
    setPagination(venues.pagination);
    // @ts-ignore
    setData((prevData) => [...prevData, ...venues.venues]);
  };

  // console.log(data, "data");

  // const checkCondition = (currentPage: any, pagination: any) => {
  //   const totalPages = Math.ceil(pagination.currentItemsCount / perPage) - 1;
  //   if (totalPages > 0 && currentPage >= totalPages) {
  //     loadMoreVenues();
  //   } else {
  //     return;
  //   }
  // };

  useEffect(() => {
    getVenues();
  }, []);

  // useEffect(() => {
  //   checkCondition(venueTablePage, pagination);
  // }, [venueTablePage]);

  return (
    <>
      <div>
        <div className="md:flex gap-5 w-fit items-end">
          <div className="text-zinc-900 3xl:text-5xl text-3xl max-md:text-xl font-medium grow whitespace-nowrap">
            Venue
          </div>
          <div className="bordered-text 2xl:px-8 3xl:text-xl  max-md:px-2 max-md:py-1 max-md:text-xs text-sm font-normal">
            {" "}
            List of venue registered
          </div>
        </div>
        <div className="bg-[#B2C2D9] h-[1px] w-full my-10" />
        <div>
          <DataTable
            columns={columns}
            data={data}
            // currentPage={currentPage}
            pageSize={pagination.limit}
            // setCurrentPage={setCurrentPage}
            setPerPage={setPerPage}
            getVenues={loadMoreVenues}
            totalItemsCount={pagination.totalItemsCount}
          />
        </div>
      </div>
    </>
  );
};

export default VenuePage;
