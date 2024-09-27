"use client";
import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import DiscoverMatch from "@/components/home/DiscoverMatch";
import Footer from "@/components/home/Footer";
import { MoveRight, SlidersHorizontal } from "lucide-react";
import Link from "next/link";
import SearchSmallVenueCard from "@/components/home/SearchSmallVenueCard";
import MobileMenu from "@/components/MobileMenu";
import { useCycle } from "framer-motion";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { MotionDiv } from "@/components/MotionDiv";
import axios from "axios";
import toast from "react-hot-toast";
import { cn } from "@/lib/utils";
import ChatAi from "@/components/home/ChatAi";
import { ChatUrl } from "@/utils/constant";
import { NewLogo } from "@/components/home/Header";
import GoogleMapSearch from "@/components/google-map/GoogleMapSearch";

const SearcResult = () => {
  const [isOpen, toggleOpen] = useCycle(false, true);
  const [filterValue, setFilterValue] = useState("MostRelevant");
  const [hovered, setHovered] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();
  const service = searchParams.get("service");
  const radius = searchParams.get("radius");
  const search = searchParams.get("search");
  const spaceType = searchParams.get("spaceType");
  const content = searchParams.get("nameReq");
  const serviceType = searchParams.get("serviceType");
  const isChatOpen = searchParams.get("isChat") === "true" ? true : false;
  const isExpandedCheck =
    searchParams.get("isExpandedCheck") === "true" ? true : false;
  const [searchData, setSearchData] = useState<any[]>([]);
  const [filterData, setFilterData] = useState<any[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);

  const handleSearch = async () => {
    if (localStorage.getItem("userId") === null) {
      return;
    }
    const userId = localStorage.getItem("userId");

    if (!service || !radius || !search) {
      // toast.error("Search parameters are missing");
      return;
    }
    try {
      setLoading(true);
      const res = await axios.post(`${ChatUrl}/search`, {
        userId: userId,
        searchType: service,
        location: search,
        radius: radius,
        serviceType: spaceType || serviceType || "",
        serviceCategory: serviceType || "",
      });
      setSearchData(res?.data);
      if (res?.data) {
        setLoading(false);
      }

      // console.log("res?.data?.data", res?.data);
    } catch (error) {
      console.log(error,'search error');
      setLoading(false);
      toast.error("Error in fetching search results");
    }
  };

  const handleAISearch = async () => {
    if (content === null || content === undefined || content === "") {
      return;
    }
    if (localStorage.getItem("userId") === null) {
      return;
    }
    const userId = localStorage.getItem("userId");

    try {
      setLoading(true);
      const res = await axios.post(`${ChatUrl}/aisearch`, {
        userId: userId,
        content: content,
      });
      // setSearchData(res?.data);
      if (res?.data) {
        setLoading(false);
      }
     setSearchData(res?.data)
      
      // console.log("res?.data?.data", JSON.parse(res?.data) );
    } catch (error) {
      console.log(error,'aisearch error');
      setLoading(false);
      toast.error("Error in fetching search results");
    }
  };
  useEffect(() => {
    if (service && radius && search) {
      handleSearch();
    } else if (content) {
      handleAISearch();
    }
    //  eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (filterValue) {
      // console.log("filterValue ", filterValue);
      let filterData = [...searchData];
      if (filterValue === "ratingHighToLow") {
        filterData = filterData.sort((a, b) => b.rating - a.rating);
      } else if (filterValue === "ratingLowToHigh") {
        filterData = filterData.sort((a, b) => a.rating - b.rating);
      }

      setFilterData(filterData);
      // console.log("filterData", filterData);
    } else {
      setFilterData(searchData);
    }
  }, [filterValue, searchData]);

  useEffect(() => {
    if (localStorage.getItem("isAdmin")) {
      setIsAdmin(localStorage.getItem("isAdmin") === "true" ? true : false);
    }
  }, []);

  const lat = searchData?.[0]?.lat || searchData?.[1]?.lat; 
  const lng = searchData?.[0]?.lng || searchData?.[1]?.lng;
  // console.log(lat,"lat lng", lng);

  return (
    <>
      <section>
        <div className=" relative w-full   pt-5 max-md:max-w-full max-md:px-5">
          <Image
            src="/bgimages/search-bg.svg"
            layout="fill"
            className="absolute h-full w-full object-cover object-center inset-0"
            alt=""
          />

          <div className=" relative">
            <div className="py-3 w-[93%] mx-auto justify-between items-center self-stretch hidden md:flex gap-5  max-md:max-w-full max-md:flex-wrap max-md:px-5">
              <Link href="/">
                <NewLogo
                  width={190}
                  height={36}
                  className="h-9 3xl:aspect-[3/1] 3xl:h-14"
                  color="#a6a8ab"
                />
              </Link>
              <div className="flex space-x-14 items-center">
                {isAdmin ? (
                  <>
                    <Link
                      href="/dashboard"
                      className="text-primary hover:opacity-60   font-semibold 2xl:font-bold 2xl:text-lg hidden md:flex md:justify-center md:flex-row"
                    >
                      Dashboard
                    </Link>
                    <Link
                      href="/admin"
                      className="text-primary  hover:opacity-60   font-semibold 2xl:font-bold 2xl:text-lg hidden md:flex md:justify-center md:flex-row"
                    >
                      Admin
                    </Link>
                    <Link
                      href="/admin/history"
                      className="text-primary  hover:opacity-60   font-semibold 2xl:font-bold 2xl:text-lg hidden md:flex md:justify-center md:flex-row"
                    >
                      History
                    </Link>
                    <Link
                      href="/send-invite"
                      className="text-primary  hover:opacity-60   font-semibold 2xl:font-bold 2xl:text-lg hidden md:flex md:justify-center md:flex-row"
                    >
                      Send Invite
                    </Link>
                  </>
                ) : (
                  <>
                    <Link
                      href="/user"
                      className="text-primary  hover:opacity-60   font-semibold 2xl:font-bold 2xl:text-lg hidden md:flex md:justify-center md:flex-row"
                    >
                      Dashboard
                    </Link>
                    <Link
                      href="/user/profile"
                      className="text-primary  hover:opacity-60   font-semibold 2xl:font-bold 2xl:text-lg hidden md:flex md:justify-center md:flex-row"
                    >
                      Profile
                    </Link>
                    <Link
                      href="/user/saved"
                      className="text-primary  hover:opacity-60   font-semibold 2xl:font-bold 2xl:text-lg hidden md:flex md:justify-center md:flex-row"
                    >
                      Saved
                    </Link>
                  </>
                )}
              </div>
            </div>

            <div className="py-3 md:hidden hover:opacity-60  justify-between items-center self-stretch  flex gap-5  max-md:max-w-full max-md:flex-wrap max-md:px-5">
              <Link href="/">
                <Image
                  src="/logo.svg"
                  width={190}
                  height={36}
                  alt="logo"
                  className="h-9"
                />
              </Link>
              <div>
                <button onClick={() => toggleOpen()}>
                  <svg width="23" height="23" viewBox="0 0 23 23">
                    <path
                      fill="transparent"
                      strokeWidth="3"
                      stroke="#2E6AB3"
                      strokeLinecap="round"
                      d="M 2 2.5 L 12 2.5"
                    ></path>
                    <path
                      fill="transparent"
                      strokeWidth="3"
                      stroke="#2E6AB3"
                      strokeLinecap="round"
                      d="M 2 9.423 L 20 9.423"
                      opacity="1"
                    ></path>
                    <path
                      fill="transparent"
                      strokeWidth="3"
                      stroke="#2E6AB3"
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
            />

            <div className="mt-8 mb-16">
              <div className="relative md:w-[93%] md:mx-auto justify-between pt-6 lg:pt-0 items-stretch self-stretch flex w-full gap-5 max-md:max-w-full max-md:flex-wrap max-md:px-1">
                <div className="w-full">
                  <div className="justify-between md:w-fit items-end md:items-center flex gap-5 max-md:max-w-full max-md:flex-wrap">
                    <div className="text-gray-900 text-xl md:text-4xl font-semibold grow whitespace-nowrap">
                      Search Results
                    </div>
                    <div className="md:hidden flex  justify-between items-center gap-2.5">
                      <div className="text-gray-900 text-center text-xs md:text-base font-medium leading-6 whitespace-nowrap justify-center items-stretch border border-[color:var(--gray-200,#E4E4E7)] backdrop-blur-[7px] bg-white bg-opacity-60 grow mt-3 px-3.5 py-2 rounded-[60px] border-solid self-start">
                        Showing venue & vendor around you
                      </div>
                      <Select
                        onValueChange={(value) => {
                          setFilterValue(value);
                        }}
                      >
                        <SelectTrigger
                          className="w-fit md:hidden flex gap-1 rounded-full max-sm:text-[10px] bordered-text "
                          IsCustomIcon={true}
                          CustomIcon={
                            <SlidersHorizontal className="text-zinc-900 ml-1  max-sm:w-3" />
                          }
                        >
                          <SelectValue
                            placeholder="Filter"
                            className="text-zinc-900 text-center text-xs max-sm:text-[10px] font-medium leading-6"
                          />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectItem value="MostRelevant">
                              Most Relevant
                            </SelectItem>
                            <SelectItem value="ratingHighToLow">
                              Rating: High To Low
                            </SelectItem>
                            <SelectItem value="ratingLowToHigh">
                              Rating: Low To High
                            </SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="text-zinc-900 md:block hidden text-center text-sm md:text-base font-medium leading-6 whitespace-nowrap justify-center items-stretch border border-[color:var(--gray-200,#E4E4E7)] backdrop-blur-[7px] bg-white bg-opacity-60 grow mt-3 px-3.5 py-2 rounded-[60px] border-solid self-start">
                      Showing venue & vendor around you
                    </div>
                  </div>
                </div>

                <Select
                  onValueChange={(value) => {
                    setFilterValue(value);
                  }}
                >
                  <SelectTrigger
                    className="w-fit hidden rounded-full  md:flex  bordered-text "
                    IsCustomIcon={true}
                    CustomIcon={
                      <SlidersHorizontal className="text-zinc-900 ml-2.5" />
                    }
                  >
                    <SelectValue
                      placeholder="Filter"
                      className="text-zinc-900 text-center text-base font-medium leading-6"
                    />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="MostRelevant">
                        Most Relevant
                      </SelectItem>
                      <SelectItem value="ratingHighToLow">
                        Rating: High To Low
                      </SelectItem>
                      <SelectItem value="ratingLowToHigh">
                        Rating: Low To High
                      </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div
              className={cn(
                "py-3 w-[93%] mx-auto pb-8 flex lg:flex-row flex-col justify-center gap-16 items-center",
                searchData?.length < 7 && "items-start"
              )}
            >
              <MotionDiv
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.6, ease: "easeInOut" }}
                className="2xl:w-3/5 lg:w-1/2  w-full flex justify-center overflow-hidden"
              >
                {
                  lat && lng && <GoogleMapSearch
                  mapCenter={{ 
                    lat: Number(lat),
                     lng: Number(lng)
                    }}
                  mapSearchData={searchData}
                  setHovered={setHovered}
                  hovered={hovered}
                />
                }
              </MotionDiv>
              <MotionDiv
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.6, ease: "easeInOut" }}
                className={cn(
                  "2xl:w-2/5 lg:w-1/2   border border-gray-300 rounded-lg py-4 px-5 max-xs:px-2 max-xs:py-2 w-full flex flex-col overflow-y-auto lg:h-[730px] h-[500px] scrollbar-thin scroll-mx-2 scrollbar-thumb-primary scroll-smooth gap-6",
                  searchData?.length < 7 && "h-auto lg:h-auto"
                )}
              >
                {filterData?.length > 0 ? (
                  filterData?.map((item, i) => (
                    <SearchSmallVenueCard
                      key={item?.eventEntityId}
                      searchDataItem={item}
                      setHovered={setHovered}
                      hovered={hovered}
                    />
                  ))
                ) : (
                  <>
                    <div className="h-full w-full flex justify-center items-center">
                      {loading ? "Searching..." : "No results found"}
                    </div>
                  </>
                )}
              </MotionDiv>
            </div>

            <ChatAi isChat={isChatOpen} isExpandedCheck={isExpandedCheck} />
          </div>
        </div>
      </section>
      <DiscoverMatch />
      <Footer />
    </>
  );
};

export default SearcResult;
