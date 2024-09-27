"use client";
import React, { Fragment, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Send } from "lucide-react";
import { useCycle } from "framer-motion";
import MobileMenu from "@/components/MobileMenu";
import ScrollLink from "@/components/ScrollLink";
import { MotionDiv } from "@/components/MotionDiv";
import { v4 as uuidv4 } from "uuid";
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
import LoadSmall from "@/components/LoadSmall";
import { useVendorShareStore } from "@/store/vendorShare";
import toast from "react-hot-toast";
import Footer from "@/components/home/Footer";
import { useRouter } from "next/navigation";

const VendorAdmin = () => {
  const [isOpen, toggleOpen] = useCycle(false, true);
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const { vendorShared,reset } = useVendorShareStore();
  const [paginatedData, setPaginatedData] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [sending, setSending] = useState<boolean>(false);
  const itemsPerPage = 10;

  useEffect(() => {
    setLoading(true);
    axios
      .get("/api/users")
      .then((res) => {
        // console.log(res.data?.data);
        setData(res.data?.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const router = useRouter();

  useEffect(() => {
    if (data?.length > 0) {
      setPaginatedData(data.slice(startIndex, endIndex));
      // console.log(paginatedData, "paginatedData");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, currentPage]);

  const handleSend = async(Email: string) => {
    const EntityListNameId = generateId() + "vendor";
    let state: any = false;
    setSending(true);
    for (let i = 0; i < vendorShared.length; i++) {
      console.log(i, " i");
      state = await sendVendorsToUser(vendorShared[i], Email, EntityListNameId);
    }
    if (state) {
      toast.success("Vendors shared successfully");
      reset();
      setSending(false);
      router.push("/admin/vendor");
    }
    if(!state){
      toast.error("Not able to send the venues to the user");
      reset();
      setSending(false);
    }
  };

  return (
    <>
      <div>
        <div className="flex-col overflow-hidden relative flex min-h-[600px] 3xl:min-h-[680px] max-lg:min-h-[340px] w-full items-center  pt-5  max-md:max-w-full max-md:px-5">
          <Image
            src="/admin/bgadminven.svg"
            height={600}
            width={1920}
            className="absolute top-0 left-0 z-[-1] max-lg:h-[45vh] lg:min-h-[550px] max-lg:w-full object-cover 2xl:w-full"
            alt="hero"
          />

          <div className="relative 2xl:h-[70vh] h-[60vh] max-h-[48vh] flex w-full max-w-[93%] flex-col max-md:max-w-full">
            <div className="md:fixed xl:right-[3%] xl:w-[94%] md:w-[91%] md:right-[5%] z-[1000] justify-between items-center border backdrop-blur-[5px] bg-[#4545451a] bg-opacity-10 self-stretch hidden md:flex gap-5 px-10 py-2.5 rounded-[40px] border-solid border-white/60 border-opacity-60 max-md:max-w-full max-md:flex-wrap max-md:px-5">
              <Link href="/">
                <Image
                  src="/logo-white.svg"
                  width={190}
                  height={40}
                  alt="logo"
                  className="3xl:aspect-[3/1] 3xl:h-14"
                />
              </Link>
              <div className="justify-center items-stretch bg-white  self-stretch flex flex-col px-9 3xl:px-24 hover:opacity-80 py-1 rounded-xl">
                <Link href="/admin">
                  <div className="justify-between items-stretch flex gap-2.5">
                    <div className="text-[#2E6AB3] text-xs md:text-base font-medium leading-6 grow whitespace-nowrap">
                      Admin
                    </div>
                  </div>
                </Link>
              </div>
            </div>
            <div className="py-3 md:hidden justify-between items-center self-stretch  flex gap-5  max-md:max-w-full max-md:flex-wrap max-md:px-5">
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
              pageName="Admin"
              isOpen={isOpen}
              toggleOpen={toggleOpen}
            />
            <div className="absolute w-full max-lg:bottom-0 max-md:top-32 top-56 left-0 items-stretch flex max-w-full flex-col pl-1 pr-4 max-md:mt-10">
              <MotionDiv
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, delay: 0.3 }}
                className="text-[#818181] max-md:text-[10px] 3xl:text-3xl text-base 2xl:text-xl font-medium leading-6 whitespace-nowrap items-stretch border border-[color:var(--gray-200,#E4E4E7)] backdrop-blur-[7px] bg-white w-fit px-3.5 2xl:px-5 2xl:py-4 py-2 max-md:px-2 max-md:py-0.5 rounded-[60px] border-solid"
              >
                Send details to the users
              </MotionDiv>
              <div className="flex justify-between w-full items-end">
                <div>
                  <MotionDiv
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="text-white text-6xl 2xl:text-7xl 3xl:text-9xl leading-normal font-extrabold mt-10 max-md:mt-5 max-md:max-w-full max-md:text-4xl"
                  >
                    Users{" "}
                  </MotionDiv>
                </div>
                <MotionDiv
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 1, delay: 0.4 }}
                >
                  <div className="hover:scale-125 max-lg:hidden transform transition-all duration-300 ease-in-out cursor-pointer">
                    <ScrollLink href="#AdminUsers">
                      <Image
                        src="/ArrowDown.svg"
                        width={110}
                        height={110}
                        alt="down"
                        className="3xl:w-36"
                      />
                    </ScrollLink>
                  </div>
                </MotionDiv>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Edit and add */}

      <div
        id="AdminUsers"
        className=" md:max-w-[93%] md:mx-auto max-md:px-5 2xl:mt-12"
      >
        <div>
          <h2 className="text-3xl md:text-3xl 3xl:text-5xl xxs:text-lg sm:text-base  text-gray-900 font-semibold">
            Select User
          </h2>
          <p className="text-base md:text-base sm:text-sm xxs:text-xs 3xl:text-2xl 3xl:mt-8 text-gray-500 mt-3">
            Select the user to receive the information{"'"}s
          </p>
        </div>
        <div className="flex gap-20 items-start mt-10 mb-20">
          <div className="flex flex-col gap-6 xl:w-3/4 2xl:w-2/3 w-full ">
            <div className="bg-[#E2EFFF] rounded-md px-5 py-6 max-md:py-3 flex justify-between gap-3 max-xs:gap-0.5 w-4/5 max-md:w-full">
              <h3 className="text-gray-900 max-md:text-sm 3xl:text-2xl max-md:w-1/4  font-medium">
                Name
              </h3>
              <h3 className="text-gray-900 max-md:text-sm 3xl:text-2xl max-md:w-1/4 font-medium">
                Email
              </h3>
              <h3 className="text-gray-900 max-md:text-sm 3xl:text-2xl sm:block hidden max-md:w-1/4 font-medium pr-12">
                Address
              </h3>
              <div className="max-md:w-1/4 hidden max-md:block" />
            </div>
            {loading ? (
              <>
                <LoadSmall />
              </>
            ) : (
              <>
                <div className="flex flex-col gap-6 max-xs:gap-1">
                  {data?.length > 0 &&
                    paginatedData.map((user, i) => (
                      <Fragment key={i}>
                        <div className="flex max-md:gap-0">
                          <div className=" rounded-md px-5 py-4 flex justify-between max-md:items-center gap-3 max-xs:gap-0.5 w-4/5 max-md:w-full ">
                            <h3 className="text-gray-900 3xl:text-xl max-xs:text-[10px] max-md:text-sm max-md:w-1/4 font-medium">
                              {user?.name || "User Name"}
                            </h3>
                            <h3 className="text-gray-900 3xl:text-xl max-md:break-words max-xs:text-[10px] max-md:text-sm max-md:w-1/4 font-medium">
                              {user?.email || "User Email"}
                            </h3>
                            <h3 className="text-gray-900 3xl:text-xl max-md:text-sm hidden sm:block max-md:w-1/4 font-medium pr-12 max-md:pr-0">
                            {user?.address ? user?.address.slice(0, 15)+"..." : "Address"}
                            </h3>
                            <div className="max-md:w-1/4 max-md:block hidden">
                              <button
                                onClick={() => handleSend(user?.email)}
                                disabled={sending}
                                className="flex 2xl:text-xl justify-center max-md:text-xs text-sm rounded-md items-center bg-[#2E6AB3] py-4 max-xs:py-0.5 max-xs:px-3 px-20 max-md:py-1.5 max-md:px-3 max-2xl:px-14 hover:opacity-80 text-white gap-3 disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none"
                              >
                                Send{" "}
                                <Send className="text-white max-md:w-4 max-xs:w-2" />
                              </button>
                            </div>
                          </div>
                          <div className="max-md:hidden block">
                            <button
                              onClick={() => handleSend(user?.email)}
                              className="flex justify-center max-md:text-xs text-sm rounded-md items-center bg-[#2E6AB3] py-4 px-20 max-md:py-1.5 max-md:px-3 max-xl:px-6 max-2xl:px-14 hover:opacity-80 text-white gap-3"
                            >
                              Send <Send className="text-white max-md:w-4" />
                            </button>
                          </div>
                        </div>
                      </Fragment>
                    ))}
                </div>
              </>
            )}

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
                  length: Math.ceil(data?.length / itemsPerPage),
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
                    className={endIndex >= data.length ? "opacity-50" : ""}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </div>
      </div>
      <div className="mt-10">
        <Footer bgColor="bg-[#2E6AB3]" />
      </div>
    </>
  );
};

export default VendorAdmin;

async function sendVendorsToUser(
  Vendor: any,
  userEmail: string,
  EntityListNameId: string
) {
  try {
    const res = await axios.post("/api/admin-share-vendors", {
      Vendor,
      userEmail, 
      EntityListNameId,  
    });
    // console.log(res.data);
    if (res.data?.status === 200) {
      // toast.success(res.data?.message);
      return true;
    }
  } catch (err) {
    console.log(err);
    // toast.error("Not able to send the vendors to the user");
    return false;
  }
}

const generateId = () => {
  return uuidv4().split("-").join("") + Date.now();
};
