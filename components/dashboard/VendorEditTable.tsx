"use client";
import { DataTable } from "@/components/data-table/vendor-table";
import React, { useState, useEffect } from "react";
import { columns, Vendors } from "@/app/dashboard/edit/vendor/columns";
import axios from "axios";
import { useVendorTablePageStore } from "@/store/vendorTablePage";
const VendorEditTable = () => {
  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState({
    limit: 50,
    lastEventEntityId: "",
    currentItemsCount: 0,
    totalItemsCount: 0,
  });
  const [perPage, setPerPage] = useState(10);
  const {vendorTablePage } = useVendorTablePageStore();

  const getVendors = async () => {
    const res = await axios.get(`/api/vendors`, {
      params: {
        limit: 150,
        currentItemsCount: pagination?.currentItemsCount,
        totalItemsCount: pagination.totalItemsCount,
      },
    });
    const vendors = await res.data;
    setPagination(vendors.pagination);
    setData(vendors.vendors);
  };

  const loadMoreVendors = async () => {
    if (pagination.lastEventEntityId === null) {
      return;
    } 
    const res = await axios.get(`/api/vendors`, {
      params: {
        limit: 100,
        lastEventEntityId: pagination?.lastEventEntityId,
        currentItemsCount: pagination?.currentItemsCount,
        totalItemsCount: pagination.totalItemsCount,
      },
    });
    const vendors = await res.data;
    setPagination(vendors.pagination);
    // @ts-ignore
    setData((prevData) => [...prevData, ...vendors.vendors]);
  };


  useEffect(() => {
    getVendors();
  }, []);


  return (
    <>
      <div>
        <div className="md:flex gap-5 w-fit items-end">
          <div className="text-zinc-900 3xl:text-5xl text-3xl max-md:text-xl font-medium grow whitespace-nowrap">
          Vendor
          </div>
          <div className="bordered-text 2xl:px-8 3xl:text-xl  max-md:px-2 max-md:py-1 max-md:text-xs text-sm font-normal">
            {" "}
            List of vendors registered
          </div>
        </div>
        <div className="bg-[#B2C2D9] h-[1px] w-full my-10" />
        <div>
          <DataTable
            columns={columns}
            data={data}
            pageSize={pagination.limit}
            setPerPage={setPerPage}
            getVendors={loadMoreVendors}
            totalItemsCount={pagination.totalItemsCount}
          />
        </div>
      </div>
    </>
  );
};

export default VendorEditTable;

