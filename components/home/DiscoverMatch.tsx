"use client";
import { MoveRight } from "lucide-react";
import React, { useRef } from "react";
import Link from "next/link";
import { MotionDiv } from "../MotionDiv";
import Image from "next/image";
import { useInView } from "framer-motion";

export default function DiscoverMatch({ isAdmin }: { isAdmin?: boolean }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  return (
    <>
      <div className="flex-col bg-primary items-center overflow-hidden relative flex min-h-[395px] justify-center ">
        <Image
          src="/bgimages/discover-bg.svg"
          layout="fill"
          alt="Discover Background"
          className="absolute h-full w-full object-cover object-center inset-0"
        />
        <div className="relative max-md:m-0 mx-auto w-[93%] max-md:px-5 mt-12 mb-12 max-md:max-w-full max-md:my-10">
          <div className="gap-5 flex max-lg:flex-col max-md:items-stretch max-md:gap-0">
            <div className="flex flex-col items-stretch w-1/5 max-lg:w-full max-md:ml-0">
              <Image
                src="/discover-in.png"
                className=" relative flex w-[200px] shrink-0 h-[200px] flex-col mx-auto rounded-xl max-md:mt-10 max-sm:w-full max-sm:h-full"
                width={200}
                height={200}
                alt="Discover In"

              />
            </div>
            <div className="flex flex-col items-stretch w-4/5 ml-5 max-md:w-full max-md:ml-0">
              <div className="justify-center xl:w-3/4 relative flex flex-col my-auto items-start max-md:max-w-full max-md:mt-10">
                <div className="text-white text-3xl max-sm:text-xl font-bold self-stretch max-md:max-w-full">
                  Discover Unmatched Venues and Top-Tier Vendors
                </div>
                <div className="text-white text-xl max-sm:text-base max-sm:my-5 self-stretch mt-5 max-md:max-w-full">
                  Explore exclusive venues and connect with top-tier vendors to
                  craft your perfect occasion. Elevate your event planning
                  experience starting now!
                </div>
                <div className="max-lg:w-full max-lg:flex max-lg:justify-center">
                  <div className="justify-center items-stretch bg-white hover:opacity-70 cursor-pointer flex w-[190px] max-w-full flex-col mt-5 px-7 py-3 rounded-[60px] border-[1.5px] border-solid border-white max-md:px-5">
                    <span className="justify-between items-stretch flex gap-2.5">
                      <div className="text-primary text-right text-sm font-bold leading-5 grow whitespace-nowrap">
                        Invite Someone
                      </div>

                      <div className="flex-grow">
                        <MoveRight size={24} className="text-primary" />
                      </div>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
