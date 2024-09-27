"use client";
import { Bookmark } from "lucide-react";
import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { useCycle } from "framer-motion";
import MobileMenu from "../MobileMenu";
import ScrollLink from "../ScrollLink";
import { MotionDiv } from "../MotionDiv";
import { NewLogo } from "../home/Header";

export default function UserHero() {
  const [isOpen, toggleOpen] = useCycle(false, true);
  return (
    <div className="flex-col overflow-hidden relative flex min-h-[900px] w-full items-center  pt-5 max-md:max-w-full max-md:px-5">
      <Image
        src="/AdminHero-lower.png"
        layout="fill"
        alt="hero"
        className="3xl:aspect-[3/1] 3xl:h-14 object-cover object-center"
      />

      <div className="relative max-xl:h-[90vh] h-screen flex w-full max-w-[93%] flex-col max-md:max-w-full">
        <MotionDiv
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8, ease: "easeInOut" }}
          className="md:fixed xl:right-[3%] xl:w-[94%] md:w-[91%] md:right-[5%] z-[1000] justify-between items-center backdrop-blur-[5px] bg-[#2E6AB3]/25  self-stretch hidden md:flex gap-5 px-10 py-2.5 3xl:py-3.5 rounded-[40px]  max-md:max-w-full max-md:flex-wrap max-md:px-5"
        >
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
        </MotionDiv>
        <div className="py-3 md:hidden justify-between items-center self-stretch  flex gap-5  max-md:max-w-full max-md:flex-wrap max-md:px-5">
          <Link href="/">
            <Image src="/logo-white.svg" width={190} height={40} alt="logo" />
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

        <MobileMenu pageName="Users" isOpen={isOpen} toggleOpen={toggleOpen} />

        <div className="absolute w-full max-lg:bottom-28  max-md:bottom-20  bottom-28 left-0 items-stretch flex max-w-full flex-col pl-1 pr-4 max-md:mt-10">
          <div className="max-md:flex justify-center">
            <MotionDiv
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5, ease: "easeInOut" }}
              className="text-[#818181] 3xl:text-3xl text-base max-md:text-[10px] 2xl:text-xl font-medium leading-6 whitespace-nowrap items-stretch border border-[color:var(--gray-200,#E4E4E7)] backdrop-blur-[7px] bg-white w-fit px-3.5 2xl:px-5 2xl:py-4 py-2 rounded-[60px] border-solid"
            >
              Your Guide to Local Vendors and Venues
            </MotionDiv>
          </div>
          <div className="flex md:flex-row flex-col justify-between w-full items-end">
            <div className="max-md:text-center">
              <MotionDiv
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.8, ease: "easeInOut" }}
                className="text-white 3xl:text-8xl text-6xl max-md:text-3xl 2xl:text-7xl leading-normal font-extrabold mt-10 max-md:max-w-full "
              >
                Uncover the{" "}
                <span className="relative">
                  Best
                  <Image
                    src="/line-2.svg"
                    width={304}
                    height={8}
                    alt="logo"
                    className="absolute -bottom-2 left-0 "
                    quality={90}
                  />
                </span>{" "}
                Vendors <br />
                <h1 className="2xl:mt-3.5">and Venues Nearby</h1>
              </MotionDiv>
              <MotionDiv
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 1.2, ease: "easeInOut" }}
                className="text-white 3xl:max-w-[1120px] 3xl:text-3xl text-lg max-md:text-sm 2xl:text-2xl leading-7 2xl:max-w-[900px] max-w-[572px] mt-8 max-md:max-w-full"
              >
                Experience the pinnacle of local excellence with productionglue,
                linking you to premier vendors and breathtaking venues right in
                your neighborhood.
              </MotionDiv>
            </div>
            <div className="max-md:flex max-md:w-full justify-center">
              <MotionDiv
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.8, ease: "easeInOut" }}
              >
                <div className="hover:scale-125 max-md:relative top-20 max-md:-mr-6 transform transition-all duration-300 ease-in-out cursor-pointer">
                  <ScrollLink href="#AdminVenueVendors">
                    <Image
                      src="/ArrowDown.svg"
                      width={110}
                      height={110}
                      alt="down"
                      className="3xl:w-48"
                    />
                  </ScrollLink>
                </div>
              </MotionDiv>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
