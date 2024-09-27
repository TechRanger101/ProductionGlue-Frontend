"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Send, SlidersHorizontal, Search, ChevronDown } from "lucide-react";
import { useCycle } from "framer-motion";
import MobileMenu from "@/components/MobileMenu";
import ScrollLink from "@/components/ScrollLink";
import { MotionDiv } from "@/components/MotionDiv";
import { useVenueShareStore } from "@/store/venueShare";

import { cn } from "@/lib/utils";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import axios from "axios";
import Footer from "@/components/home/Footer";
import toast from "react-hot-toast";
import { Input } from "@/components/ui/input";
import { NewLogo } from "@/components/home/Header";

const Venue = () => {
  const [isOpen, toggleOpen] = useCycle(false, true);
  const [data, setData] = useState<any[]>([]);
  const [searchRow, setSearchRow] = useState("");
  const objectKeys = data?.length > 0 ? Object.keys(data[0]) : [];
  const [showAttributes, setShowAttributes] = useState(3);
  const [requiredAttributes, setRequiredAttributes] = useState({
    address: false,
    type: false,
    name: false,
    // images: false,
    zipcode: false,
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [showAllAttributes, setShowAllAttributes] = useState(false);
  const { venuesShared } = useVenueShareStore();
  console.log(venuesShared, " venuesShared");

  if (objectKeys.length > 0) {
    for (const key in data[0]) {
      if (key === "createdAt") {
        objectKeys.splice(objectKeys.indexOf(key), 1);
      }
      if (key === "createdBy") {
        objectKeys.splice(objectKeys.indexOf(key), 1);
      }
      if (key === "geohash") {
        objectKeys.splice(objectKeys.indexOf(key), 1);
      }
      if (key === "hashKey") {
        objectKeys.splice(objectKeys.indexOf(key), 1);
      }
      if (key === "updatedAt") {
        objectKeys.splice(objectKeys.indexOf(key), 1);
      }
    }
    objectKeys.sort();
  }

  const initialAttributes = objectKeys.map((key) => ({
    name: key,
    checked: false,
  }));
  const [selectedAttribute, setSelectedAttribute] = useState<
    {
      name: string;
      checked: boolean;
    }[]
  >(initialAttributes);

  if (initialAttributes?.length > 0 && selectedAttribute?.length === 0) {
    setSelectedAttribute(initialAttributes);
  }

  const filteredAttributes = selectedAttribute
    ?.filter((attribute: any) =>
      attribute.name === "eventEntityType" ? false : attribute.name
    );

  const SearchFilter = (data: any[], searchTerm: string) => {
    return data.filter((dataItem) => {
      const dataItemValues = Object.values(dataItem).join("").toLowerCase();
      return dataItemValues.includes(searchTerm.toLowerCase());
    });
  };

  const TableRowSearch = (data: any[], searchRow: string) => {
    return data.filter((dataItem) => {
      const dataItemValues = Object.values(dataItem).join("").toLowerCase();
      return dataItemValues.includes(searchRow.toLowerCase());
    });
  }

  const [paginatedData, setPaginatedData] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pagination, setPagination] = useState({
    limit: 50,
    lastEventEntityId: "",
    currentItemsCount: 0,
    totalItemsCount: 0,
  });
  const [filteredData, setFilteredData] = useState<any[]>([]);
  
  const itemsPerPage = 10;

  const getVenues = async () => {
    const res = await axios.get(`/api/venues`, {
      params: {
        limit: 100,
        currentItemsCount: pagination?.currentItemsCount,
        totalItemsCount: pagination.totalItemsCount,
      },
    });
    const venues = await res.data;
    setPagination(venues.pagination);
    setData(venues.venues);
  };

  useEffect(() => {
    getVenues();
  }, []);

  const loadMoreVenues = async () => {
    if (pagination.lastEventEntityId === null) {
      return;
    }
    const res = await axios.get(`/api/venues`, {
      params: {
        limit: 100,
        lastEventEntityId: pagination?.lastEventEntityId,
        currentItemsCount: pagination?.currentItemsCount,
        totalItemsCount: pagination.totalItemsCount,
      },
    });
    const venues = await res.data;
    setPagination(venues.pagination);
    // @ts-ignore
    setData((prevData) => [...prevData, ...venues.venues]);
  };

  const toggleShowMore = () => {
    setShowAllAttributes((prevShowAllAttributes) => !prevShowAllAttributes);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  useEffect(() => {
    if (data?.length > 0) {
      setPaginatedData(data.slice(startIndex, endIndex));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, currentPage]);

  return (
    <>
      <div>
        <div className="flex-col overflow-hidden relative flex min-h-[600px] 3xl:min-h-[680px] max-lg:min-h-[340px] w-full items-center  pt-5  max-md:max-w-full max-md:px-5">
          <Image
            src="/admin/bgadminven.svg"
            height={600}
            width={1920}
            className="absolute top-0 left-0 z-[-1] max-lg:h-[45vh] lg:min-h-[550px] max-lg:w-full object-cover 2xl:w-full"
            alt="hero"
          />

          <div className="relative 2xl:h-[70vh] h-[60vh] max-h-[48vh] flex w-full max-w-[93%] flex-col max-md:max-w-full">
            <div className="md:fixed xl:right-[3%] xl:w-[94%] md:w-[91%] md:right-[5%] z-[1000] justify-between items-center border backdrop-blur-[5px] bg-[#2E6AB3]/25 bg-opacity-10 self-stretch hidden md:flex gap-5 px-10 py-2.5 3xl:py-3.5  rounded-[40px] border-solid border-white/60 border-opacity-60 max-md:max-w-full max-md:flex-wrap max-md:px-5">
            <Link href="/">
            <NewLogo
              width={190}
              height={36}
              className="h-9 3xl:aspect-[3/1] 3xl:h-14"
              // color="#a6a8ab"
            />
          </Link>
          <div className="flex space-x-14 items-center">
            <Link
              href="/dashboard"
              className="text-white hover:opacity-60   font-semibold 2xl:font-bold 2xl:text-lg hidden md:flex md:justify-center md:flex-row"
            >
              Dashboard
            </Link>
            <Link
              href="/admin"
              className="text-white  hover:opacity-60   font-semibold 2xl:font-bold 2xl:text-lg hidden md:flex md:justify-center md:flex-row"
            >
              Admin
            </Link>
            <Link
              href="/admin/history"
              className="text-white  hover:opacity-60   font-semibold 2xl:font-bold 2xl:text-lg hidden md:flex md:justify-center md:flex-row"
            >
              History
            </Link>
            <Link
              href="/send-invite"
              className="text-white  hover:opacity-60   font-semibold 2xl:font-bold 2xl:text-lg hidden md:flex md:justify-center md:flex-row"
            >
              Send Invite
            </Link>
              </div>
            </div>
            <div className="py-3 md:hidden justify-between items-center self-stretch  flex gap-5  max-md:max-w-full max-md:flex-wrap max-md:px-5">
              <Link href="/">
                <Image
                  src="/logo-white.svg"
                  width={190}
                  height={40}
                  alt="logo "
                  className="max-md:w-36 max-h-8"
                />
              </Link>
              <div>
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
              pageName="Admin"
              isOpen={isOpen}
              toggleOpen={toggleOpen}
            />
            <div className="absolute w-full max-lg:bottom-0 max-md:top-32 top-56 left-0 items-stretch flex max-w-full flex-col pl-1 pr-4 max-md:mt-10 3xl:mt-10">
              <MotionDiv
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, delay: 0.3 }}
                className="text-[#818181] max-sm:text-xs 3xl:text-3xl max-md:text-[10px] text-base 2xl:text-xl font-medium leading-6 whitespace-nowrap items-stretch border border-[color:var(--gray-200,#E4E4E7)] backdrop-blur-[7px] bg-white w-fit px-3.5 2xl:px-5 2xl:py-4 py-2 max-md:px-2 max-md:py-0.5 rounded-[60px] border-solid"
              >
                Make Venue selection
              </MotionDiv>
              <div className="flex justify-between w-full items-end">
                <div>
                  <MotionDiv
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="text-white text-6xl 2xl:text-7xl 3xl:text-9xl leading-normal font-extrabold mt-10 max-lg:mt-4 max-md:mt-5 max-md:max-w-full max-md:text-4xl max-sm:text-5xl max-sm:mt-9"
                  >
                    Venues{" "}
                  </MotionDiv>
                </div>
                <MotionDiv
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 1, delay: 0.4 }}
                >
                  <div className="hover:scale-125 max-lg:hidden transform transition-all duration-300 ease-in-out cursor-pointer">
                    <ScrollLink href="#adminVenue">
                      <Image
                        src="/ArrowDown.svg"
                        width={110}
                        height={110}
                        alt="down"
                        className="3xl:w-36"
                      />
                    </ScrollLink>
                  </div>
                </MotionDiv>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Edit and add */}

      <div
        id="adminVenue"
        className=" md:max-w-[93%] md:mx-auto max-md:px-5 2xl:mt-12 3xl:mt-24"
      >
        <div>
          <h2 className="text-3xl md:text-3xl 3xl:text-5xl xxs:text-lg sm:text-base text-gray-900 font-semibold">
            Make Venue selection
          </h2>
          <p className="text-base md:text-base sm:text-sm xxs:text-xs 3xl:text-2xl 3xl:mt-8 text-gray-500 mt-3">
            Select the venue of choice
          </p>
        </div>
        <div className="flex lg:flex-row flex-col-reverse gap-20 max-sm:gap-6 items-start mt-10 max-sm:mt-4">
          <div className="flex flex-col gap-4 w-2/3 3xl:w-3/4 max-lg:w-full max-lg:pb-8">
            <div className="flex justify-between mb-3.5 3xl:mb-6 items-end w-full">
              <h5 className="font-normal 3xl:text-2xl text-lg max-sm:text-sm">
                Venue List
              </h5>
              <div>
                <div className="flex items-center ">
                  <Input
                    placeholder="Search"
                    value={searchRow}
                    onChange={(e: any) => setSearchRow(e.target.value)}
                    className="max-w-md 2xl:w-96 2xl:text-lg lg:w-80 bg-transparent"
                  />
                </div>
              </div>
            </div>

              {
                data?.length > 0 && (
                  searchRow.length > 0
                  ? TableRowSearch(data, searchRow).map((venueItem, i) => (
                    <VenueListCard
                      key={venueItem?.eventEntityId}
                      venueItem={venueItem}
                      initialAttributes={selectedAttribute}
                    />
                  ))
                  : paginatedData.map((venueItem, i) => (
                    <VenueListCard
                      key={i}
                      venueItem={venueItem}
                      initialAttributes={selectedAttribute}
                    />
                  )
                ))
              }

            <div>
              <Pagination className="pt-4">
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      //  href="#"
                      onClick={() =>
                        setCurrentPage((prevPage) => Math.max(prevPage - 1, 1))
                      }
                      className={
                        currentPage === 1
                          ? "opacity-50 max-sm:text-[10px] pointer-events-none cursor-not-allowed"
                          : "max-sm:text-[10px]"
                      }
                    />
                  </PaginationItem>

                  {Array.from({
                    length: Math.ceil(data?.length / itemsPerPage),
                  }).map((_, index) => {
                    const isCurrentPage = index + 1 === currentPage;

                    if (
                      index < 2 || // Show first two pages
                      index > Math.ceil(data?.length / itemsPerPage) - 3 || // Show last two pages
                      isCurrentPage ||
                      (Math.abs(currentPage - (index + 1)) <= 1 &&
                        index > 1 &&
                        index < Math.ceil(data?.length / itemsPerPage) - 3)
                    ) {
                      return (
                        <PaginationItem key={index + 1}>
                          <PaginationLink
                            //  href="#"
                            isActive={isCurrentPage}
                            onClick={() => setCurrentPage(index + 1)}
                            className="max-sm:text-[10px]"
                          >
                            {index + 1}
                          </PaginationLink>
                        </PaginationItem>
                      );
                    } else if (
                      (index === 2 && currentPage > 4) ||
                      (index === Math.ceil(data?.length / itemsPerPage) - 4 &&
                        currentPage <
                          Math.ceil(data?.length / itemsPerPage) - 3)
                    ) {
                      // Show ellipsis after the first two pages and before the last two pages
                      return <PaginationItem key={index}>...</PaginationItem>;
                    }
                    // Hide other pages with an ellipsis
                    return null;
                  })}

                  <PaginationItem>
                    <PaginationNext
                      //  href="#"
                      onClick={() => setCurrentPage((prevPage) => prevPage + 1)}
                      className={
                        endIndex >= data.length
                          ? "opacity-50 max-sm:text-[10px] cursor-not-allowed pointer-events-none"
                          : "max-sm:text-[10px]"
                      }
                    />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink
                      //  href="#"
                      onClick={() => {
                        loadMoreVenues();
                      }}
                      className={
                        pagination.totalItemsCount >= data?.length
                          ? "bg-[#D7E9FF] w-20 ml-2"
                          : "opacity-50 pointer-events-none cursor-not-allowed"
                      }
                    >
                      Load
                    </PaginationLink>
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>

            <Link
              href="/admin/users/venues"
              className={cn(
                "flex mt-4 w-full justify-center text-sm 2xl:text-2xl rounded-md items-center  bg-primary py-3.5 hover:opacity-80 text-white gap-3",
                (venuesShared.length === 0 ||
                  requiredAttributes.address === false ||
                  requiredAttributes.type === false ||
                  requiredAttributes.name === false ||
                  // requiredAttributes.images === false ||
                  requiredAttributes.zipcode === false) &&
                  "opacity-50 pointer-events-none cursor-not-allowed"
              )}
            >
              Send to users <Send className="text-white" />
            </Link>
          </div>
          <div className="lg:w-1/5 w-full  flex flex-col gap-3">
            <div className="mb-4 mt-2.5 max-sm:my-1">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search"
                  className="w-full border border-[#E4E4E7] rounded-full text-sm text-zinc-900 py-2.5 max-xs:py-1.5 px-3.5 focus:outline-none focus:border-primary"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Search
                  className="absolute top-1/2 right-3 transform -translate-y-1/2 text-zinc-900"
                  size={20}
                />
              </div>
            </div>
            <div className="bg-white border border-primary border-solid rounded-lg px-8 max-sm:px-5 py-3 max-sm:py-1.5 max-xs:px-2.5 max-xs:py-1 flex flex-col gap-4 max-sm:gap-0 transition-all duration-700 ease-linear">
              {(searchTerm.length > 0
                ? SearchFilter(filteredAttributes, searchTerm)
                : filteredAttributes?.slice(
                    0,
                    showAllAttributes
                      ? filteredAttributes.length
                      : showAttributes
                  )
              ) //eventEntityId
                ?.map((attribute: any, index: number) =>
                  attribute.name === "eventEntityId" ? null : (
                    <Attributes
                      key={index}
                      name={attribute.name.toUpperCase()}
                      checked={attribute.checked}
                      onChange={(checked) => {
                        const newAttributes = [...filteredAttributes];
                        newAttributes[index].checked = checked;
                        setSelectedAttribute(newAttributes);
                      }}
                      setRequiredAttributes={setRequiredAttributes}
                      requiredAttributes={requiredAttributes}
                      setSelectedAttribute={setSelectedAttribute}
                    />
                  )
                )}
              <div
                onClick={() => toggleShowMore()}
                className="flex items-end gap-1 cursor-pointer"
              >
                {/* <ChevronDown className="text-primary max-sm:w-4"  /> */}
                <span className="text-primary max-sm:text-[10px] font-semibold max-sm:px-1 max-sm:py-0.5 rounded 2xl:text-lg max-md:px-1.5 max-md:py-0.5 max-md:text-sm text-sm">
                  {showAttributes === initialAttributes.length
                    ? "Show Less"
                    : "Show More"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-10">
        <Footer bgColor="bg-[#2E6AB3]" />
      </div>
    </>
  );
};

export default Venue;

const VenueListCard = ({
  venueItem,
  initialAttributes,
}: {
  venueItem: any;
  initialAttributes: any;
}) => {
  const [isSelected, setIsSelected] = useState(false);
  const { addVenueShared, venuesShared, removeVenueShared } =
    useVenueShareStore();
  const [selectedVenue, setSelectedVenue] = useState<any>({});

  useEffect(() => {
    // Update the selection state when venuesShared changes
    const isVenueSelected = venuesShared.some(
      (selected) => selected.id === venueItem?.eventEntityId
    );
    setIsSelected(isVenueSelected);
  }, [venuesShared, venueItem]);


  const handleAddVenue = (id: string) => {
    const selectedAttributeVenue = initialAttributes.filter(
      (attribute: any) => attribute.checked === true
    );


    for (const key in venueItem) {
      if (selectedAttributeVenue.some((item: any) => item.name === key)) {
        selectedVenue[key] = venueItem[key];

      }
    }
    if (Object.keys(selectedVenue).length === 0) {
      toast.error("Please select required attributes");
      setIsSelected(false);
      return;
    }

    if (
      !selectedVenue["address"] ||
      !selectedVenue["name"] ||
      !selectedVenue["type"] ||
      !selectedVenue["zipCode"] 
      // || !selectedVenue["images"]
    ) {
      toast.error("Please select required attributes");
      setIsSelected(false);
      return;
    }

    if (venueItem?.eventEntityId) {
      selectedVenue["id"] = venueItem?.eventEntityId;
    }

    if (isSelected) {
      removeVenueShared(selectedVenue);
      return;
    }

    addVenueShared(selectedVenue);
  };
  return (
    <>
      <div className="flex max-md:w-auto max-sm:gap-2 px-6  max-md:px-2 max-md:py-2 py-3 gap-7 max-md:gap-4 justify-between items-center border-primary border-solid border rounded-md">
        <div className="flex items-center w-[30%]">
          <div className="rounded-full max-sm:hidden max-md:w-6 max-md:h-6 max-3xl:w-[30%] flex items-center justify-center">
            <Image
              src={venueItem?.images ? venueItem?.images[0] : "/logo-chat.png"}
              width={40}
              height={40}
              alt="avatar"
              className="2xl:aspect-square 2xl:w-auto rounded-full max-2xl:w-11 max-2xl:h-11"
            />
          </div>
          <span className="pl-4 max-sm:w-full  max-sm:text-[10px] max-sm:pl-0 w-max max-md:text-xs 2xl:text-lg">
            {venueItem?.name
              ? venueItem?.name.slice(0, 15) + "..."
              : "Venue Name"}
          </span>
        </div>
        <span className="text-[#1C623C] max-sm:w-auto text-center w-[15%] max-sm:px-1 max-sm:text-[10px] rounded 2xl:text-lg max-md:px-1.5 max-md:py-0.5 max-md:text-sm text-sm bg-[#ABF8CE] px-2 py-1">
          Category
        </span>
        <h5 className="font-normal w-[10%] 2xl:text-lg max-md:text-sm text-base max-md:hidden">
          {venueItem?.status || "Active"}
        </h5>
        <h5 className="font-normal  w-[30%]  max-sm:text-[10px] 2xl:text-lg max-md:text-sm  text-base">
          {venueItem?.address
            ? venueItem?.address.slice(0, 15) + "..."
            : "Address"}
        </h5>
        <div
          onClick={() => {
            setIsSelected(!isSelected);
            handleAddVenue(venueItem?.eventEntityId);
          }}
          className={cn(
            "max-sm:text-xs max-sm:h-7 w-[15%] max-sm:w-20 rounded cursor-pointer max-md:py-1 max-md:text-sm h-11 flex justify-center items-center hover:opacity-80 transition-all duration-500 ease-linear",
            isSelected
              ? "bg-primary text-white "
              : "border border-primary border-solid text-primary"
          )}
        >
          {isSelected ? "Selected" : "Select"}
        </div>
      </div>
    </>
  );
};

interface IAttributes {
  name: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  setRequiredAttributes: any;
  requiredAttributes?: any;
  setSelectedAttribute: any;
}

const Attributes = ({
  name,
  checked,
  onChange,
  setRequiredAttributes,
  requiredAttributes,
  setSelectedAttribute,
}: IAttributes) => {
  name = name.toLocaleLowerCase();
  const isChecked = requiredAttributes[name.toLowerCase()] || checked;

  const handleCheckboxChange = (newChecked: boolean) => {
    onChange(newChecked);

    setRequiredAttributes((prevAttributes: any) => {
      const updatedAttributes = { ...prevAttributes };
      updatedAttributes[name.toLowerCase()] = newChecked;
      return updatedAttributes;
    });

    setSelectedAttribute((prevAttributes: any) => {
      const updatedAttributes = prevAttributes.map((attribute: any) =>
        attribute.name === name
          ? { ...attribute, checked: newChecked }
          : attribute
      );
      return updatedAttributes;
    });
  };

  return (
    <div className="flex max-sm:text-sm justify-between items-center">
      <h3 className="max-xs:text-[10px]">
        {name === "name" ||
        name === "type" ||
        name === "address" ||
        // name === "images" ||
        name === "zipcode"
          ? name.charAt(0).toUpperCase() + name.slice(1) + "*"
          : name.charAt(0).toUpperCase() + name.slice(1)}
      </h3>
      <CustomCheckbox
        checked={isChecked}
        onChange={handleCheckboxChange}
        name={name}
        setRequiredAttributes={setRequiredAttributes}
        requiredAttributes={requiredAttributes}
      />
    </div>
  );
};

const CustomCheckbox = ({
  checked,
  onChange,
  setRequiredAttributes,
  name,
  requiredAttributes,
}: {
  checked: boolean;
  onChange: (checked: boolean) => void;
  setRequiredAttributes: any;
  name: string;
  requiredAttributes?: any;
}) => {
  return (
    <>
      <label
        className="relative flex items-center p-3 max-xs:p-1 rounded-full cursor-pointer"
        htmlFor="check"
      >
        <input
          type="checkbox"
          className="before:content[''] peer relative h-5 w-5 max-xs:h-4 max-xs:w-4 cursor-pointer appearance-none rounded-sm border border-[#D9D9D9] bg-[#D9D9D9] transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-sm before:bg-[#D9D9D9] before:opacity-0 before:transition-opacity checked:border-primary checked:bg-primary checked:before:bg-primary "
          id="check"
          checked={checked}
          onChange={(e) => {
            onChange(e.target.checked);
            setRequiredAttributes({
              ...requiredAttributes,
              [name.toLowerCase()]: e.target.checked,
            });
          }}
        />
        <span className="absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-3.5 w-3.5"
            viewBox="0 0 20 20"
            fill="currentColor"
            stroke="currentColor"
            strokeWidth="1"
          >
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            ></path>
          </svg>
        </span>
      </label>
    </>
  );
};
