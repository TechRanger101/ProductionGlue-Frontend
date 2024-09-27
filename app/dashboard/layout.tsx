import Sidebar from "@/components/dashboard/Sidebar";
import React from "react";
import Image from "next/image";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { cookies } from "next/headers";
import { cn } from "@/lib/utils";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const cookieStore = cookies();
  const isAdmin = cookieStore.get("userRole");
  let isAdminV: boolean = isAdmin === undefined ? false : isAdmin.value === "admin";
  return (
    <>
      <div
        className={cn("bg-[#ffffff99] relative", isAdminV ? "block" : "hidden")}
      >
        <Image
          src="/bgimages/dashboard-bg2.png"
          layout="fill"
          objectFit="cover"
          objectPosition="center"
          className="absolute h-full w-full object-cover object-center opacity-60 inset-0"
          alt=""
        />
        <DashboardHeader isAdminV={isAdminV} />
        <main>
          <div className="flex relative ">
            <div className="lg:w-1/5  hidden overscroll-y-none lg:h-screen relative  lg:block">
              <Sidebar />
            </div>
            <div className="pl-10 w-4/5  lg:overflow-y-scroll pr-16 py-5 max-lg:w-full  max-md:px-5 max-lg:px-10">
              {children}
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default DashboardLayout;
