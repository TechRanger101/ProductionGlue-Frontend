"use client";
import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { spaceTypes } from "@/utils/constant";

import { useRouter } from "next/navigation";

const HeroSearch = () => {
  const [tab, setTab] = useState("normal");
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [service, setService] = useState<string>("");
  const [radius, setRadius] = useState<string>("");
  const [nameReq, setNameReq] = useState<string>("");
  const [spaceType, setSpaceType] = useState<string>("");
  const [serviceType, setServiceType] = useState<string>("");

  console.log(service);

  const handleSearch = (e: any) => {
    e.preventDefault();
    if (service && radius) {
      router.push(
        `/search?service=${service}&radius=${radius}&search=${searchTerm}&spaceType=${spaceType}`
      );
    }
    if(serviceType && radius){
      router.push(
        `/search?service=${service}&radius=${radius}&search=${searchTerm}&serviceType=${serviceType}`
      );
    }

  };
  const handleAISearch = (e: any) => {
    e.preventDefault();
    if (nameReq) {
      router.push(
        `/search?nameReq=${nameReq}`
      );
    }
  }
  return (
    <>
      <div className="w-full">
        <div className="items-center flex gap-2.5 self-start w-full">
          <div className="w-5 h-5 bg-blue-500 rounded-full" />
          <div className="text-white text-2xl font-bold self-stretch grow shrink basis-auto">
            Start Exploring Now
          </div>
        </div>
        <div className="mt-10 pr-8 w-full">
         <div
         className="flex justify-center w-full"
         >
           <div className="flex gap-4 items-center  p-1 w-fit bg-white/10 rounded-full transition-all duration-300 ease-in-out">
            <div
              className={`flex items-center justify-center rounded-full w-72 max-md:w-32 h-14 max-md:h-10  cursor-pointer ${
                tab === "normal" ? "bg-primary " : " "
              }`}
              onClick={() => setTab("normal")}
            >
              <span className="text-white max-md:text-sm font-semibold">Normal</span>
            </div>
            <div
              className={`flex items-center justify-center max-md:w-32 w-72 rounded-full h-14 max-md:h-10 cursor-pointer ${
                tab === "advance" ? "bg-primary " : " "
              }`}
              onClick={() => setTab("advance")}
            >
              <span className={`text-white max-md:text-sm font-semibold`}>
                AI Search
              </span>
            </div>
          </div>

         </div>

          <div className="mt-16">
            {tab === "normal" ? (
              <>
                <div className="items-stretch flex justify-between gap-5 w-full self-start max-md:max-w-full max-lg:flex-col max-md:pr-5">
                  <div className="items-stretch flex grow basis-[0%] flex-col">
                    <div className="text-white text-center text-base font-medium">
                      Venues or Vendors
                    </div>

                    <div>
                      <Select onValueChange={(value) => setService(value)}>
                        <SelectTrigger className="text-zinc-500 text-base font-medium leading-6 border border-[color:var(--gray-200,#E4E4E7)] backdrop-blur-[7px] bg-white flex justify-between gap-5 mt-2.5 px-4 py-4 rounded-[30px] border-solid items-start h-14">
                          <SelectValue placeholder="Select Search Type"
                          
                          />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectItem value="venue">Venues</SelectItem>
                            <SelectItem value="vendor">Vendors</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  {service === "venue" && (
                    <div className="items-stretch flex grow basis-[0%] flex-col">
                      <div className="text-white text-center text-base font-medium">
                        Space Type
                      </div>
                      <div>
                        <Select onValueChange={(value) => setSpaceType(value)}>
                          <SelectTrigger className="text-zinc-500 text-base font-medium leading-6 border border-[color:var(--gray-200,#E4E4E7)] backdrop-blur-[7px] bg-white flex justify-between gap-5 mt-2.5 px-4 py-4 rounded-[30px] border-solid items-start h-14">
                            <SelectValue placeholder="Choose Space Category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              {spaceTypes.map((type) => (
                                <SelectItem key={type} value={type}>
                                  {type}
                                </SelectItem>
                              ))}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  )}
                  {service === "vendor" && (
                    <div className="items-stretch flex grow basis-[0%] flex-col">
                      <div className="text-white text-center text-base font-medium">
                        Service Type
                      </div>
                      <div>
                        <Select onValueChange={(value) => setServiceType(value)}>
                          <SelectTrigger className="text-zinc-500 text-base font-medium leading-6 border border-[color:var(--gray-200,#E4E4E7)] backdrop-blur-[7px] bg-white flex justify-between gap-5 mt-2.5 px-4 py-4 rounded-[30px] border-solid items-start h-14">
                            <SelectValue placeholder="Choose Service Type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              {/* <SelectItem value="catering">Catering</SelectItem> */}
                              {
                                servicesArray.map((service) => (
                                  <SelectItem key={service} value={service}>
                                    {service}
                                  </SelectItem>
                                ))
                              }
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  )}

                  <div className="items-stretch flex grow basis-[0%] flex-col">
                    <div className="text-white text-center text-base font-medium">
                      Zip-code/Address
                    </div>

                    <input
                      type="text"
                      className="text-zinc-500  text-base font-medium leading-6 whitespace-nowrap items-stretch border border-gray-200 backdrop-blur-7 bg-white mt-2.5 pl-4 pr-16 py-4 rounded-[30px] border-solid max-md:pr-6 active:ring-0 focus:ring-0 focus:outline-none"
                      placeholder="Find by ZIP or Address"
                      onChange={(e) => setSearchTerm(e.target.value)}
                      value={searchTerm}
                    />
                  </div>
                  <div className="items-stretch flex grow basis-[0%] flex-col">
                    <div className="text-white text-center text-base font-medium">
                      Search Radius (0.1 - 25 miles)
                    </div>
                    <input
                      type="number"
                      max={25}
                      min={0.1}
                      className="text-zinc-500  text-base font-medium leading-6 whitespace-nowrap items-stretch border border-gray-200 backdrop-blur-7 bg-white mt-2.5 pl-4 pr-16 py-4 rounded-[30px] border-solid max-md:pr-6 active:ring-0 focus:ring-0 focus:outline-none"
                      placeholder="Enter Radius (e.g., 2.4) miles"
                      value={radius}
                      onChange={
                        (e) => {
                          if (
                            Number(e.target.value) >= 0 &&
                            Number(e.target.value) <= 25
                          ) {
                            setRadius(e.target.value);
                          }
                        }
                        // setRadius(e.target.value)
                      }
                    />
                  </div>
                </div>
                <div className="relative max-w-full mr-2 md:mr-0 mt-5  w-full  items-start max-md:flex-wrap">
                  <div className="flex justify-center w-full">
                    <button
                      onClick={handleSearch}
                      disabled={!service || !radius || !searchTerm}
                      className="text-white w-[500px] text-center text-base font-medium leading-6 whitespace-nowrap justify-center items-center backdrop-blur-[7px] bg-primary px-16 py-4 rounded-[30px] max-md:max-w-full max-md:px-5 hover:opacity-80 transition-all duration-200 ease-linear disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Show Results
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="w-full">
                  <div className="items-stretch flex grow basis-[0%] flex-col w-full">
                    <div className="text-white text-center text-base font-medium">
                      Name/Requirement
                    </div>

                    <input
                      type="text"
                      className="text-zinc-500  text-base font-medium leading-6 whitespace-nowrap items-stretch border border-gray-200 backdrop-blur-7 bg-white mt-2.5 pl-4 pr-16 py-4 rounded-[30px] border-solid max-md:pr-6 active:ring-0 focus:ring-0 focus:outline-none"
                      placeholder="Name of Establishment"
                      onChange={(e) => setNameReq(e.target.value)}
                      value={nameReq}
                    />
                  </div>
                </div>
                <div className="relative max-w-full mr-2 md:mr-0  w-full mt-5 items-start max-md:flex-wrap">
                  <div className="flex justify-center w-full">
                    <button
                      onClick={handleAISearch}
                      disabled={!nameReq}
                      className="text-white w-[500px] text-center text-base font-medium leading-6 whitespace-nowrap justify-center items-center backdrop-blur-[7px] bg-primary px-16 py-4 rounded-[30px] max-md:max-w-full max-md:px-5 hover:opacity-80 transition-all duration-200 ease-linear disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Show Results
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default HeroSearch;

const servicesArray = [
  "Apparel & Swag",
  "Audio, Video, Lighting",
  "Business, Marketing, Finance & Legal",
  "Catering & Hospitality",
  "Entertainment & Attractions",
  "Event Production",
  "Health, Safety & Security",
  "Logistics & Operations",
  "Miscellaneous",
  "Permitting & Engineering",
  "Personnel & Talent",
  "Scenic & Staging",
  "Tenting & Event Services",
  "Trade-Based Labor",
  "Trucking & Transportation",
  "Venue Services"
];

