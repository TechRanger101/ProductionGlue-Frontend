import React, { Fragment } from "react";
import Image from "next/image";
import Link from "next/link";
const SavedGrid = ({ data }: { data: any[] }) => {
  // console.log(Object.entries(data), " savedata");
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 mt-12 lg:grid-cols-3 gap-14 xl:gap-16 max-md:gap-0 max-md:grid-cols-1 max-md:items-stretch max-md:mt-10 ">
        {data &&
          Object.entries(data) &&
          Object.entries(data).length > 0 &&
          Object.entries(data).map((item, i) => (
            // console.log(item[0]," item ",item[1]),
            <Fragment key={i}>
              <SavedCard item={item[1]} itemid={item[0]} />
            </Fragment>
          ))}
      </div>
    </>
  );
};

export default SavedGrid;

const SavedCard = ({ item, itemid }: { item: any; itemid: string }) => {
  // console.log(itemid , " itemid ",item);

  return (
    <>
      <Link
        href={`/user/saved/${item?.[0]?.EntityListNameId}`}
        className="flex flex-col max-md:items-center items-stretch w-full h-[500px] max-md:w-full max-md:ml-0"
      >
        <div className="w-fit justify-center items-center relative flex  flex-col max-md:mt-10 rounded-t-3xl hover:rounded-t-3xl  overflow-hidden ">
          <div className="overflow-hidden xl:h-auto grid grid-cols-2">
            <div className="w-full ">
              {item?.[0]?.images ? (
                <Image
                  src={item?.[0]?.images[0]}
                  alt="Picture of the Venue"
                  width={250}
                  height={150}
                  className="aspect-square w-[212px] h-full"
                />
              ) : (
                <div className="aspect-square w-[212px] h-full border-b border-solid border-gray-700 bg-gray-200"></div>
              )}
            </div>
            <div className="w-full">
              {item?.[1]?.images ? (
                <Image
                  src={item?.[1]?.images[0]}
                  alt="Picture of the Venue"
                  width={250}
                  height={150}
                  className="aspect-square w-[212px] h-full"
                />
              ) : (
                <div className="aspect-square w-[212px] h-full border-l border-b border-solid border-gray-700 bg-gray-200"></div>
              )}
            </div>
            <div className="w-full">
              {item?.[2]?.images ? (
                <Image
                  src={item?.[2]?.images[0]}
                  alt="Picture of the Venue"
                  width={250}
                  height={150}
                  className="aspect-square w-[212px] h-full"
                />
              ) : (
                <div className="aspect-square w-[212px]  h-full bg-gray-200"></div>
              )}
            </div>
            <div className="w-full">
              {item?.[3]?.images ? (
                <Image
                  src={item?.[3]?.images[0]}
                  alt="Picture of the Venue"
                  width={250}
                  height={150}
                  className="aspect-square w-[212px] h-full"
                />
              ) : (
                <div className="aspect-square w-[212px] border-l border-solid border-gray-700 h-full bg-gray-200"></div>
              )}
            </div>
          </div>
          <div className="bg-white flex w-full flex-col justify-center items-stretch px-8 py-8 rounded-none border-[1.33px] border-solid border-zinc-500 max-md:px-5  rounded-b-3xl border-t-0">
            <div className="items-center flex justify-between">
              <div className="text-slate-800 text-xl font-semibold whitespace-nowrap">
                {item?.[0]?.EntityListUserName ? item?.[0]?.EntityListUserName : "List Name"}
              </div>
              <div>
                <div className="items-stretch flex gap-1 mt-8 pr-2.5">
                  {item?.rating && item?.rating > 0
                    ? Array.from({ length: item.rating }).map((_, i) => (
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
                  {item?.rating && item?.rating < 5
                    ? Array.from({ length: 5 - item.rating }).map((_, i) => (
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
                <div className="text-gray-900 text-right text-base font-medium whitespace-nowrap mt-2.5">
                  4.5(160 reviews)
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
};
