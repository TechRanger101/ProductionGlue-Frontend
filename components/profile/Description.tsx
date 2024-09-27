import React from "react";
import Image from "next/image";
import { Book, Building, Compass, Flag, Hotel, LocateFixed, Store } from "lucide-react";
import ProfileMap from "../google-map/ProfileMap";

type Props = {
  data?: any;
};

const Description = ({ data }: Props) => {
  // console.log(data);
  return (
    <>
      <section>
        <div className="flex justify-between items-end">
          <div className="text-slate-800 text-xl md:text-3xl xl:text-4xl  font-semibold whitespace-nowrap">
            {data?.name ? data?.name : data?.type === 'venue' ? "Venue Name" : "Vendor Name"
            }
          </div>
          <div className="lg:flex hidden items-baseline gap-2">
            <div className="items-stretch flex gap-1 mt-8 pr-2.5">
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
                    <Image
                      src="/venue/star-white.svg"
                      className="aspect-[0.95] object-contain object-center w-[19px] fill-white overflow-hidden shrink-0 max-w-full"
                      alt="Star "
                      width={20}
                      height={20}
                      key={i}
                    />
                  ))
                : null}
            </div>
            <div className="text-gray-900 text-right text-lg font-medium whitespace-nowrap mt-2.5">
              {data?.rating || 0} (160 reviews)
            </div>
          </div>
        </div>
        <div className="">
          <div className="items-stretch flex flex-col mt-3  self-end">
            <h4 className="text-gray-500 max-md:whitespace-break-spaces text-sm xl:text-xl font-medium leading-5 whitespace-nowrap">
              { 
              data?.type === 'venue' ? data?.venue ?( data?.venue)
              : "Venue Name | Space Type" :
              data?.serviceCategory ? data?.serviceCategory : "Vendor Name | Service Offered"
              }
            </h4>
            <div className="text-[#1C623C] w-fit text-sm lg:text-base font-medium whitespace-nowrap justify-center items-stretch rounded bg-emerald-200 mt-3.5 lg:px-16 lg:py-2 px-8 py-1">
              {
                data?.status || ""
              }
            </div>
          </div>
          <div className="flex lg:hidden pb-3 items-baseline gap-2">
            <div className="items-stretch flex gap-1 mt-1 ">
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
                    <Image
                      src="/venue/star-white.svg"
                      className="aspect-[0.95] object-contain object-center w-[19px] fill-white overflow-hidden shrink-0 max-w-full"
                      alt="Star "
                      width={20}
                      height={20}
                      key={i}
                    />
                  ))
                : null}
            </div>
            <div className="text-gray-900 text-right text-sm lg:text-lg font-medium whitespace-nowrap mt-2.5">
            {data?.rating || 0} (160 reviews)
            </div>
          </div>
        </div>
        <div className="h-[1px] xl:my-8 my-4 bg-[#B2C2D9]" />
     
        <div className="flex md:justify-between text-xl max-md:text-sm flex-wrap gap-6">
      
      
          <div>
            <div className="inline-flex">
            <LocateFixed  className="w-6 h-6" />
            <h4 className="font-semibold ml-2">Address:</h4>
            </div>
            <li className="list-none mt-3 pl-4 font-light">{data?.address ? data?.address?.slice(0,30) : "Address"} </li>
          </div>
        
           <div>
            <div className="inline-flex">
            <Compass  className="w-6 h-6" />
            <h4 className="font-semibold ml-2">City:</h4>
            </div>
            <li className="list-none mt-3 pl-4 font-light">{data?.city || "City"} </li>
          </div>

          <div>
            <div className="inline-flex">
              {/* <Flag /> */}
            <Flag  className="w-6 h-6" />
            <h4 className="font-semibold ml-2">Country:</h4>
            </div>
            <li className="list-none mt-3 pl-4 font-light">{data?.country || "Country"} </li>
          </div>
         
           <div>
            <div className="inline-flex">
            <Book  className="w-6 h-6" />
            <h4 className="font-semibold ml-2">Zip Code:</h4>
            </div>
            <li className="list-none mt-3 pl-4 font-light">{data?.zipCode || "Zip Code"} </li>
          </div>
        </div>
        <div className="h-[1px] xl:my-8 my-4 bg-[#B2C2D9]" />
        <div>
          <ProfileMap 
          position={{lat: Number(data?.lat) || 0, lng: Number(data?.lng) || 0}}
          />
        </div>
      </section>
    </>
  ); 
};

export default Description;
