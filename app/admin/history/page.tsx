"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useCycle } from "framer-motion";
import MobileMenu from "@/components/MobileMenu";
import ScrollLink from "@/components/ScrollLink";
import { MotionDiv } from "@/components/MotionDiv";

import axios from "axios";
import Footer from "@/components/home/Footer";
import { DataTable } from "@/components/data-table/data-table";
import { columns } from "./columns";
import { NewLogo } from "@/components/home/Header";

const VenueAdmin = () => {
  const [isOpen, toggleOpen] = useCycle(false, true);
  const [data, setData] = React.useState([]);

    React.useEffect(() => {
        axios
        .get("/api/history")
        .then((res) => {
            setData(res.data.history);
            console.log(res.data);
        })
        .catch((err) => {
            console.log(err);
        });
    }, []);

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
            <div className="md:fixed xl:right-[3%] xl:w-[94%] md:w-[91%] md:right-[5%] z-[1000] justify-between items-center border backdrop-blur-[5px] bg-[#2E6AB3]/25 bg-opacity-10 self-stretch hidden md:flex gap-5 px-10 py-2.5 rounded-[40px] border-solid border-white/60 border-opacity-60 max-md:max-w-full max-md:flex-wrap max-md:px-5">
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
              href="/dashboard"
              className="text-white hover:opacity-60   font-semibold 2xl:font-bold 2xl:text-lg hidden md:flex md:justify-center md:flex-row"
            >
              Dashboard
            </Link>
            <Link
              href="/admin"
              className="text-white  hover:opacity-60   font-semibold 2xl:font-bold 2xl:text-lg hidden md:flex md:justify-center md:flex-row"
            >
              Admin
            </Link>
            <Link
              href="/admin/history"
              className="text-white  hover:opacity-60   font-semibold 2xl:font-bold 2xl:text-lg hidden md:flex md:justify-center md:flex-row"
            >
              History
            </Link>
            <Link
              href="/send-invite"
              className="text-white  hover:opacity-60   font-semibold 2xl:font-bold 2xl:text-lg hidden md:flex md:justify-center md:flex-row"
            >
              Send Invite
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
                History of the Send Data to Users
              </MotionDiv>
              <div className="flex justify-between w-full items-end">
                <div>
                  <MotionDiv
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="text-white text-6xl 2xl:text-7xl 3xl:text-9xl leading-normal font-extrabold mt-10 max-md:mt-5 max-md:max-w-full max-md:text-4xl"
                  >
                    History{" "}
                  </MotionDiv>
                </div>
                <MotionDiv
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 1, delay: 0.4 }}
                >
                  <div className="hover:scale-125 max-lg:hidden transform transition-all duration-300 ease-in-out cursor-pointer">
                    <ScrollLink href="#AdminHistory">
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
        id="AdminHistory"
        className=" md:max-w-[93%] md:mx-auto max-md:px-5 2xl:mt-12"
      >
        <div>
          <h2 className="text-3xl md:text-3xl 3xl:text-5xl xxs:text-lg sm:text-base  text-gray-900 font-semibold">
            History
          </h2>
          <p className="text-base md:text-base sm:text-sm xxs:text-xs 3xl:text-2xl 3xl:mt-8 text-gray-500 mt-3">
           See the history of the data sent to the users
          </p>
        </div>
        <div className="flex gap-20 items-start mt-10 mb-20">
        <div className="w-full">
          <DataTable columns={columns} data={data} />
        </div>
        </div>
      </div>
      <div className="mt-10">
        <Footer bgColor="bg-[#2E6AB3]" />
      </div>
    </>
  );
};

export default VenueAdmin;
