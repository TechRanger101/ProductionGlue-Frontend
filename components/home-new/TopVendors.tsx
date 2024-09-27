"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import Link from "next/link";
import axios from "axios";

const categories = [
  "All",
  "New",
  "Trending",
  "Nearby",
  "Popular",
  "Top Rated",
  "Most Reviewed",
  "Booked",
];

const TopVendors = () => {
  const [vendor, setVendor] = useState([]);
  const [category, setCategory] = useState("All");

  useEffect(() => {
    axios
      .get("/api/vendors-by-rating")
      .then((res) => {
        setVendor(res.data?.vendors);
        // console.log(res.data?.vendors);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <>
      <div className="flex-col justify-center items-center overflow-hidden relative flex  max-md:max-w-full lg:py-28">
        <Image
          src="/bgimages/top-venue.png"
          layout="fill"
          className="absolute h-full w-full object-cover object-center inset-0 opacity-50"
          alt=""
        />

        <div className="relative w-[93%] mx-auto  pt-14 lg:pt-0 max-md:max-w-full ">
          <div className="w-fit md:items-center flex gap-5 max-md:max-w-full ">
            <div className="text-gray-900 text-3xl md:text-4xl font-medium grow whitespace-nowrap">
              Top Vendor
            </div>
            <div className="text-gray-900 text-center text-sm md:text-base font-medium leading-6 whitespace-nowrap justify-center items-stretch border border-[color:var(--gray-200,#E4E4E7)] backdrop-blur-[7px] bg-white bg-opacity-60 grow mt-3 px-3.5 py-2 rounded-[60px] border-solid self-start">
              Discover top vendor around you
            </div>
          </div>
          <div className="py-14 flex overflow-x-auto scrollbar-hide gap-14">
            {categories.map((item, index) => (
              <h4
                key={index}
                className={cn(
                  "h-10 min-w-[8rem] flex justify-center items-center px-2 font-light rounded-full cursor-pointer",
                  category === item
                    ? "bg-gray-950 text-white"
                    : "border border-solid border-gray-950 text-gray-950"
                )}
                onClick={() => setCategory(item)}
              >
                {item}
              </h4>
            ))}
          </div>
          {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-md:max-w-full"> */}
          <div className="lg:flex grid grid-cols-1 gap-10 max-md:max-w-full justify-between">
            {vendor?.map((item:any, index) => (
              <Link href={`/profile/${item?.eventEntityId}?type=vendor`} key={index}
              target="_blank"
              rel="noopener noreferrer"
              >
                <VendorCard data={item} />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default TopVendors;

const VendorCard = ({ data }: { data: any }) => {
  return (
    <>
      <div className="flex-col overflow-hidden relative flex  3xl:w-[500px] 3xl:hover:w-[660px] xl:w-[400px] xl:hover:w-[560px]  lg:w-[340px] lg:hover:w-[450px]  flex-shrink-0 px-8 py-8 items-start  transition-all duration-500 ease-in-out">
        {data?.images?.length > 1 ? (
          <Image
            // src="/venue/venue-new.jpeg"
            src={data?.images[0]}
            loading="lazy"
            alt="Vendor"
            width={400}
            height={540}
            className="absolute rounded-xl h-full w-full object-cover object-center inset-0 aspect-[4/5]"
          />
        ) : (
          <div className="absolute rounded-xl h-full w-full object-cover object-center inset-0 aspect-[4/5] bg-gray-950"></div>
        )}

        <div
          className="relative text-zinc-900 text-base font-medium whitespace-nowrap justify-center items-stretch bg-white px-2.5 py-1.5 rounded-xl"
          aria-label="Category"
        >
          {data?.category || "Category"}
        </div>

        <button
          className="relative w-fit text-white text-xl font-medium justify-center items-stretch border self-stretch mt-64 px-5 py-2 rounded-3xl border-solid border-white"
          aria-label="Vendor Name"
        >
          {data?.name ? data?.name?.slice(0, 12) : "Vendor Name"}
        </button>

        <div className="relative justify-between items-stretch self-stretch flex gap-5 mt-8">
          <div className="items-stretch flex flex-col">
            <div className="items-stretch flex gap-1 pr-2.5">
              {/* <Image
                src="/venue/star-fill.svg"
                className="aspect-square object-contain object-center w-5 fill-blue-800 overflow-hidden shrink-0 max-w-full"
                alt="Star"
                width={20}
                height={20}
              />
             */}
              {data?.rating && data?.rating > 0
                ? Array.from({ length: data.rating }).map((_, i) => (
                    <React.Fragment key={i}>
                      <Image
                        src="/venue/star-fill.svg"
                        className="aspect-square object-contain object-center w-5 fill-blue-800 overflow-hidden shrink-0 max-w-full"
                        alt="Star"
                        width={20}
                        height={20}
                      />
                    </React.Fragment>
                  ))
                : null}
              {data?.rating && data?.rating < 5
                ? Array.from({ length: 5 - data.rating }).map((_, i) => (
                    <React.Fragment key={i}>
                      <Image
                        src="/venue/star-white.svg"
                        className="aspect-[0.95] object-contain object-center w-[19px] fill-white overflow-hidden shrink-0 max-w-full"
                        alt="Star "
                        width={20}
                        height={20}
                      />
                    </React.Fragment>
                  ))
                : null}
            </div>
            <div
              className="text-white text-right text-base font-medium whitespace-nowrap mt-2.5"
              aria-label="Reviews"
            >
              {data?.rating || 0} (160 reviews)
            </div>
          </div>

          <div
            className="text-white text-base font-medium leading-5 mt-8 self-end"
            aria-label="Location"
          >
            {data?.address ? data?.address?.slice(0, 12) : "Address"}
          </div>
        </div>
      </div>
    </>
  );
};
