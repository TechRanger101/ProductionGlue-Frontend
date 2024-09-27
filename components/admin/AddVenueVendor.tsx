"use client";
import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { MotionDiv } from "../MotionDiv";

const AddVenueVendor = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  return (
    <>
      <section>
        <div
          ref={ref}
          id="AdminVenueVendors"
          className=" relative w-full   pt-8 pb-20 px-16 max-md:max-w-full max-md:px-5"
        >
          <Image
            src="/admin/adminbgsec.png"
            layout="fill"
            objectFit="cover"
            objectPosition="center"
            className="absolute h-full w-full object-cover object-center inset-0"
            alt=""
          />

          <div className="relative text-center mt-10 mb-48">
            <motion.h2
              initial={{ y: 100, opacity: 0 }}
              animate={isInView ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 1 }}
              className="text-3xl text-gray-900 font-semibold 2xl:text-4xl 3xl:text-5xl"
            >
              Let{"'"}s add venues and vendors
            </motion.h2>
            <motion.p
              initial={{ y: 100, opacity: 0 }}
              animate={isInView ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 1 }}
              className="mt-3 3xl:text-2xl 3xl:mt-8 text-gray-500 mb-24 3xl:mb-40"
            >
              Select the appropriate box of need
            </motion.p>
            <div className="flex lg:flex-row flex-col gap-24 items-center justify-center">
             <MotionDiv
             initial={{ x: -100, opacity: 0 }}
              animate={isInView ? { x: 0, opacity: 1 } : {}}
              transition={{ duration: 1 , delay: 0.5 }}
             >
             <Link
                href="/admin/venue"
                className="cursor-pointer hover:scale-105 transition-all duration-300 ease-in-out"
              >
                <Image
                  src="/admin/adminVenue.svg"
                  width={470}
                  height={400}
                  alt="Venue"
                  className="3xl:w-[500px]"
                />
              </Link>
             </MotionDiv>
           <MotionDiv
           initial={{ x: 100, opacity: 0 }}
              animate={isInView ? { x: 0, opacity: 1 } : {}}
              transition={{ duration: 1 , delay: 0.5 }}
           >
           <Link
                href="/admin/vendor"
                className="cursor-pointer hover:scale-105 transition-all duration-300 ease-in-out"
              >
                <Image
                  src="/admin/adminVendor.svg"
                  width={470}
                  height={400}
                  alt="Vendor"
                  className="3xl:w-[500px]"
                />
              </Link>
           </MotionDiv>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AddVenueVendor;
