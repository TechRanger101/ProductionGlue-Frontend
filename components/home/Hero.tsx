"use client";

import * as React from "react";
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import { useCycle } from "framer-motion";
import MobileMenu from "../MobileMenu";
import Notification from "../Notification";
import { MotionDiv } from "../MotionDiv";

import HeroSlider from "./HeroSlider";
import Header from "./Header";
import HeroSearch from "./HeroSearch";

export default function Hero({ isAdmin }: { isAdmin: boolean }) {
  const [isOpen, toggleOpen] = useCycle(false, true);

  return (
    <div className="flex-col overflow-hidden relative flex min-h-[900px] w-full items-center max-md:max-w-full  ">
      <div className="hidden md:block">
        <Header isAdmin={isAdmin} />
      </div>

      <HeroSlider>
        <div className="z-50 relative flex w-full max-w-[1240px] flex-col items-center max-md:max-w-full">
          <div className="py-3 md:hidden justify-between items-center self-stretch  flex gap-5  max-md:max-w-full max-md:flex-wrap max-md:px-5">
            <Link href="/">
              <Image
                src="/logo-full-svg.svg"
                width={190}
                height={36}
                alt="logo"
                className="h-9 max-sm:h-7 max-sm:w-28"
              />
            </Link>
            <div className="flex gap-6">
              <Notification color="text-white" />
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
            pageName="LandingPage"
            isOpen={isOpen}
            toggleOpen={toggleOpen}
            isAdmin={isAdmin}
          />
          <div className="items-stretch flex w-[693px] max-w-full flex-col mt-28 pl-1 pr-4 max-md:mt-10">
            <MotionDiv
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.8, ease: "easeInOut" }}
              className="text-gray-500 text-center text-sm md:text-base font-medium leading-6 whitespace-nowrap justify-center items-stretch border border-[color:var(--gray-200,#E4E4E7)] backdrop-blur-[7px] bg-white self-center px-3.5 py-2 rounded-[60px] border-solid"
            >
              Create your dream event with productionglue
            </MotionDiv>
            <MotionDiv
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.9, ease: "easeInOut" }}
              className="text-white text-center text-6xl leading-normal font-extrabold mt-10 max-md:max-w-full max-md:text-4xl"
            >
              Discover{" "}
              <span className="relative">
                Vendors
                <Image
                  src="/vendor-vec.png"
                  width={254}
                  height={8}
                  alt="logo"
                  className="absolute -bottom-2 left-0 "
                  quality={90}
                />
              </span>{" "}
              and <br />
              Venues in Your Area
            </MotionDiv>
            <MotionDiv
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.1, ease: "easeInOut" }}
              className="text-white text-center text-base leading-7 self-center max-w-[572px] mt-8 max-md:max-w-full"
            >
              Uncover local excellence with productionglue, connecting you to
              top-tier vendors and stunning venues right in your neighborhood.
            </MotionDiv>
          </div>
          <MotionDiv
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.3, ease: "easeInOut" }}
            className="justify-center border backdrop-blur-[5px] bg-gray-900 bg-opacity-40 self-stretch flex flex-col mt-28 mx-6 pl-8 py-6 rounded-[40px_40px_0px_0px] border-solid border-[#3e3d3ddb] items-end max-md:max-w-full max-md:mr-2.5 max-md:mt-10 max-md:pl-5 border-b-0"
          >
            <HeroSearch />
          </MotionDiv>
        </div>
      </HeroSlider>
    </div>
  );
}
