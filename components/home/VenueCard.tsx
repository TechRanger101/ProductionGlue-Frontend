import React from "react";
import Image from "next/image";
import Link from "next/link";

const VenueCard = ({
  venue,
  privateV = false,
}: {
  venue: any;
  privateV?: boolean;
}) => {
  return (
    <>
      <Link
        href={
          privateV
            ? `/user/sharedVenueVendor/${venue?.sharedVenueVendorId}`
            : `/profile/${venue?.eventEntityId}`
        }
        className="flex flex-col items-stretch w-[90%] max-lg:w-full max-lg:items-center max-md:ml-0"
      >
        <div className="w-fit 3xl:w-[480px] 2xl:w-[420px] max-sm:w-[340px] lg:w-[380px] 2xl:h-auto justify-center items-center relative flex  flex-col max-md:mt-10 rounded-t-3xl hover:rounded-t-3xl  overflow-hidden ">
          <div className="overflow-hidden">
            {/* <Image
              src={venue?.images[0] || "/venue/venue1.jpeg"}
              alt=""
              width={500}
              height={500}
              className="aspect-square   scale-100 transition-all duration-200 ease-in-out hover:scale-110 transform-origin-center"
            /> */}
            {venue?.images ? (
              <>
                {" "}
                <Image
                  src={venue?.images[0] || "/logo/logo-white-full.svg"}
                  alt=""
                  width={500}
                  height={500}
                  className="aspect-square bg-gray-200  scale-100 transition-all duration-200 ease-in-out hover:scale-110 transform-origin-center"
                />
              </>
            ) : (
              <div className="aspect-square w-full 2xl:h-[480px] h-[400px] bg-gray-300 scale-100 transition-all duration-200 ease-in-out hover:scale-110 transform-origin-center"></div>
            )}
          </div>
          <div className="bg-white flex w-full flex-col justify-center items-stretch px-8 py-8 rounded-none border-[1.33px] border-solid border-zinc-500 max-md:px-5  rounded-b-3xl border-t-0">
            <div className="justify-between items-stretch flex gap-5">
              <div className="items-stretch flex flex-col">
                <h3 className="text-slate-800 xl:text-xl 2xl:text-2xl font-semibold whitespace-nowrap">
                  {venue?.name  ? venue?.name?.slice(0,17) : "Venue Name"}
                </h3>
                <div className="items-stretch flex gap-1 mt-8 pr-2.5">
                  {venue?.rating && venue?.rating > 0
                    ? Array.from({ length: venue.rating }).map((_, i) => (
                        <React.Fragment key={i}>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                          >
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M12.2877 7.60923H19.8969L13.7686 12.3261L9.97685 15.2185L3.82016 19.9385L6.15947 12.3261L-6.10352e-05 7.60923H7.60911L9.94842 0L12.2877 7.60923ZM14.2718 14.0892L9.94842 15.2523L16.0767 20L14.2718 14.0892Z"
                              fill="#2E6AB3"
                            />
                          </svg>
                        </React.Fragment>
                      ))
                    : null}
                  {venue?.rating && venue?.rating < 5
                    ? Array.from({ length: 5 - venue.rating }).map((_, i) => (
                        <React.Fragment key={i}>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="21"
                            height="20"
                            viewBox="0 0 21 20"
                            fill="none"
                          >
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M12.8756 7.60923H20.4847L14.3565 12.3261L10.5647 15.2185L4.40799 19.9385L6.7473 12.3261L0.587769 7.60923H8.19694L10.5363 0L12.8756 7.60923ZM14.8596 14.0892L10.5363 15.2523L16.6645 20L14.8596 14.0892Z"
                              fill="#D9D9D9"
                            />
                          </svg>
                        </React.Fragment>
                      ))
                    : null}
                </div>
                <div className="text-gray-900 text-base font-medium whitespace-nowrap mt-2.5">
                  {venue?.rating || 0} (160 reviews)
                </div>
              </div>
              <div className="items-stretch flex flex-col  mt-12 self-end max-md:mt-10">
                <div className="text-zinc-500 lg:text-sm 2xl:text-base font-medium leading-5 whitespace-nowrap">
                  {venue?.address ?  venue?.address?.slice(0,10) : "Venue Address"}
                </div>
                <div className="text-zinc-500 lg:text-sm 2xl:text-base font-medium whitespace-nowrap justify-center items-stretch rounded bg-emerald-200 mt-2.5 px-2.5 py-1.5">
                  {venue?.spaceName || "Venue Space Name"}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
};

export default VenueCard;
