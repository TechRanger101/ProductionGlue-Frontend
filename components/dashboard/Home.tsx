"use client"
import React,{useState,useEffect} from "react";
import RecentlyAdded from "./RecentlyAdded";
import axios from "axios";


const Home = () => {
  const [userCount, setUserCount] = useState(0);
  const [venueCount, setVenueCount] = useState(0);
  const [vendorCount, setVendorCount] = useState(0);

 useEffect(() => {
    axios.get("/api/users-count").then((res) => {
      setUserCount(res.data?.data);
    });
    axios.get("/api/venues-count").then((res) => {
      setVenueCount(res.data?.data);
    });
    axios.get("/api/vendors-count").then((res) => {
      setVendorCount(res.data?.data);
    });
  } ,[]);

  return (
    <>
      <div className="w-full">
        <div className="md:flex  gap-5 w-fit items-end">
          <div className="text-zinc-900 text-3xl max-md:text-xl 3xl:text-5xl font-medium grow whitespace-nowrap">
            Hi There  
          </div>
          <div className="bordered-text max-md:px-2 2xl:px-8  max-md:py-1 max-md:text-xs 3xl:text-xl text-sm font-normal">
            {" "}
            Track and analyze the changes on Production glue
          </div>
        </div>
        <div className="flex gap-10 max-md:gap-4 my-10 w-full justify-between">
          <div className="px-10 hover:shadow-[0_2px_12px_7px_rgba(143,180,224,0.7)] max-md:w-fit max-md:px-1.5 w-1/3 max-md:py-1 py-3.5 border border-[#B2C2D9] rounded lg:rounded-xl transition-all duration-500 ease-in-out">
            <h5 className="font-light mb-3 max-md:text-xs 3xl:text-3xl ">Total venue</h5>
            <div className="flex gap-8 max-md:gap-3 items-center 2xl:items-baseline">
              <h1 className="text-4xl max-md:text-sm font-bold 3xl:text-5xl">
                {venueCount}
              </h1>
              <h5 className="text-green-500 font-light max-md:text-xs 2xl:text-xl ">+20%</h5>
            </div>
          </div>
          <div className="px-10 hover:shadow-[0_2px_12px_7px_rgba(143,180,224,0.7)] w-1/3 max-md:py-1 max-md:px-1.5 py-3.5 border border-[#B2C2D9] rounded lg:rounded-xl transition-all duration-500 ease-in-out">
            <h5 className="font-light mb-3 max-md:text-xs 3xl:text-3xl">Total vendor</h5>
            <div className="flex gap-8 items-center 2xl:items-baseline">
              <h1 className="text-4xl max-md:text-sm font-bold 3xl:text-5xl">
                {vendorCount}
              </h1>
              <h5 className="text-red-600 font-light max-md:text-xs 2xl:text-xl">-4%</h5>
            </div>
          </div>
          <div className="px-10 hover:shadow-[0_2px_12px_7px_rgba(143,180,224,0.7)] w-1/3 max-md:py-1 max-md:px-1.5 py-3.5 border border-[#B2C2D9] rounded lg:rounded-xl transition-all duration-500 ease-in-out">
            <h5 className="font-light mb-3 max-md:text-xs 3xl:text-3xl">Total Users</h5>
            <div className="flex gap-8 items-center 2xl:items-baseline">
              <h1 className="text-4xl max-md:text-sm font-bold 3xl:text-5xl">
                {userCount}
              </h1>
              <h5 className="text-red-600 font-light max-md:text-xs 2xl:text-xl">-3%</h5>
            </div>
          </div>
        </div>

        <div>
          <h4 className="bordered-text w-fit mb-4 2xl:text-xl 2xl:px-8 md:text-sm text-xs font-normal">
            Recently added
          </h4>
          <RecentlyAdded />
        </div>
      </div>
    </>
  );
};

export default Home;
