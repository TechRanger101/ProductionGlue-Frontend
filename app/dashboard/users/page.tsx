"use client";
import React, { useState, useEffect } from "react";
import { DataTable } from "@/components/data-table/data-table";
import { User, columns } from "./columns";
// import { BaseUrl } from "@/utils/constant";
import axios from "axios";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";

const UsersPage = () => {
  const [data, setData] = useState<User[]>([]);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(`/api/users`);
      setData(result.data.data);
      console.log(result.data.data);
      router.refresh();

      // console.log(pathname);
    };
    fetchData();
  }, [pathname, router]);

  return (
    <>
      <div>
        <div className="flex justify-between">
          <div className="md:flex gap-5 w-fit items-end">
            <div className="text-zinc-900 3xl:text-5xl text-3xl max-md:text-xl font-medium grow whitespace-nowrap">
              Users
            </div>
            <div className="bordered-text 2xl:px-8 3xl:text-xl max-md:px-2 max-md:py-1 max-md:text-xs text-sm font-normal">
              {" "}
              People that use Production glue
            </div>
          </div>
          <div>
            <Link href="/dashboard/users/create">
              <p
                className="bg-primary text-white rounded-md px-6 py-2
              hover:opacity-70 cursor-pointer max-md:px-3 max-md:py-1 max-md:text-xs text-sm font-normal
              "
              >
                Create User
              </p>
            </Link>
          </div>
        </div>
        <div className="bg-[#B2C2D9] h-[1px] w-full my-10" />
        <div>
          <DataTable columns={columns} data={data} />
        </div>
      </div>
    </>
  );
};

export default UsersPage;
