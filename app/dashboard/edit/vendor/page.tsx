"use client"
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import Link from "next/link";
import VendorEditTable from "@/components/dashboard/VendorEditTable";

const VendorEditPage = () => {
  const pathname = usePathname()
  return ( 
    <>
     <div> 
        <div className="md:flex gap-5 w-fit items-end pb-6 ">
        <div className="text-zinc-900 3xl:text-5xl text-3xl max-md:text-xl font-medium grow whitespace-nowrap">
            Edit
          </div>
          <div className="bordered-text 2xl:px-8 3xl:text-xl max-md:px-2 max-md:py-1 max-md:text-[10px] text-sm font-normal">
            {" "}
            Make changes to registered Venue/Vendors in the database
          </div>
        </div>
        <div className="flex gap-6 items-center py-6 border-solid border-y w-full border-[#B2C2D9]">
          <Link href="/dashboard/edit/venue"
            className={cn(
              "bordered-text text-sm 2xl:text-xl font-medium rounded-md grow-0 px-14 cursor-pointer transition-all duration-200 ease-in-out",
              pathname === "/dashboard/edit/venue" && "bg-[#2E6AB3] text-white"
            )} 
          >
            Venue
          </Link>
          <Link 
          href="/dashboard/edit/vendor"
          className={cn(
              "bordered-text text-sm 2xl:text-xl font-medium rounded-md grow-0 px-14 cursor-pointer transition-all duration-200 ease-in-out",
              pathname === "/dashboard/edit/vendor" && "bg-[#2E6AB3] text-white"
            )}>
            Vendor
          </Link>
        </div>
        <div className="mt-10">
        <VendorEditTable />

        </div>
       
      </div>
    </>
  )
}

export default VendorEditPage