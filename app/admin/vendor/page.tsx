"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Send, SlidersHorizontal, Search, ChevronDown } from "lucide-react";
import { useCycle } from "framer-motion";
import MobileMenu from "@/components/MobileMenu";
import ScrollLink from "@/components/ScrollLink";
import { MotionDiv } from "@/components/MotionDiv";
import { useVendorShareStore } from "@/store/vendorShare";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
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

const Vendor = () => {
  const [isOpen, toggleOpen] = useCycle(false, true);
  const [filterValue, setFilterValue] = useState("");
  const [data, setData] = useState<any[]>([]);
  const objectKeys = data?.length > 0 ? Object.keys(data[0]) : [];
  const [showAttributes, setShowAttributes] = useState(3);
  const [showAllAttributes, setShowAllAttributes] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const { vendorShared } = useVendorShareStore();
  console.log(vendorShared, " vendorShared");

  const [requiredAttributes, setRequiredAttributes] = useState({
    address: false,
    type: false,
    name: false,
    images: false,
    zipcode: false,
  });

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
    // console.log(initialAttributes, " initialAttributes");
  }
  // console.log(selectedAttribute, " selectedAttribute 1");

    const filteredAttributes = selectedAttribute
    // ?.slice(0, showAttributes)
    ?.filter((attribute: any) =>
      attribute.name === "eventEntityType"
        ? false
        : attribute.name
    );

    const SearchFilter = (data: any[], searchTerm: string) => {
      return data.filter((dataItem) => {
        const dataItemValues = Object.values(dataItem).join("").toLowerCase();
        // console.log(dataItemValues, " dataItemValues ",dataItemValues.includes(searchTerm.toLowerCase()));
        return dataItemValues.includes(searchTerm.toLowerCase());
      });
  
    }

  const [paginatedData, setPaginatedData] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 10;

  useEffect(() => {
    axios.get("/api/vendors").then((res) => {
      // console.log(res.data?.data);
      setData(res.data?.vendors);
    });
  }, []);

  const toggleShowMore = () => {
    setShowAllAttributes((prevShowAllAttributes) => !prevShowAllAttributes);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  useEffect(() => {
    if (data?.length > 0) {
      setPaginatedData(data.slice(startIndex, endIndex));
      // console.log(paginatedData, "paginatedData");
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
            <div className="md:fixed xl:right-[3%] xl:w-[94%] md:w-[91%] md:right-[5%] z-[1000] justify-between items-center border backdrop-blur-[5px] bg-[#4545451a] bg-opacity-10 self-stretch hidden md:flex gap-5 px-10 py-2.5 3xl:py-3.5  rounded-[40px] border-solid border-white/60 border-opacity-60 max-md:max-w-full max-md:flex-wrap max-md:px-5">
              <Link href="/">
                <Image
                  src="/logo-white.svg"
                  width={190}
                  height={40}
                  alt="logo"
                  className="3xl:aspect-[3/1] 3xl:h-14"
                />
              </Link>
              <div className="justify-center items-stretch bg-white  self-stretch flex flex-col px-9 3xl:px-24   py-1 rounded-xl">
                <Link href="/admin">
                  <div className="justify-between items-stretch flex gap-2.5">
                    <div className="text-primary text-xs md:text-base font-medium leading-6 grow whitespace-nowrap">
                      Admin
                    </div>
                  </div>
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
                Make Vendor selection
              </MotionDiv>
              <div className="flex justify-between w-full items-end">
                <div>
                  <MotionDiv
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="text-white text-6xl 2xl:text-7xl 3xl:text-9xl leading-normal font-extrabold mt-10 max-lg:mt-4 max-md:mt-5 max-md:max-w-full max-md:text-4xl max-sm:text-5xl max-sm:mt-9"
                  >
                    Vendors{" "}
                  </MotionDiv>
                </div>
                <MotionDiv
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 1, delay: 0.4 }}
                >
                  <div className="hover:scale-125 max-lg:hidden transform transition-all duration-300 ease-in-out cursor-pointer">
                    <ScrollLink href="#adminVendor">
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
        id="adminVendor"
        className=" md:max-w-[93%] md:mx-auto max-md:px-5 2xl:mt-12 3xl:mt-24"
      >
        <div>
          <h2 className="text-3xl md:text-3xl 3xl:text-5xl xxs:text-lg sm:text-base text-gray-900 font-semibold">
            Make Vendor selection
          </h2>
          <p className="text-base md:text-base sm:text-sm xxs:text-xs 3xl:text-2xl 3xl:mt-8 text-gray-500 mt-3">
            Select the vendor of choice
          </p>
        </div>
        <div className="flex lg:flex-row flex-col-reverse gap-20 max-sm:gap-6 items-start mt-10 max-sm:mt-4">
          <div className="flex flex-col gap-4 w-2/3 3xl:w-3/4 max-lg:w-full max-lg:pb-8">
            <div className="flex justify-between mb-3.5 3xl:mb-6 items-end w-full">
              <h5 className="font-normal 3xl:text-2xl text-lg max-sm:text-sm">
                Vendor List
              </h5>
              <div>
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
                      placeholder="Sort"
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

            {data?.length > 0 &&
              paginatedData.map((vendorItem, i) => (
                <VendorListCard
                  key={i}
                  vendorItem={vendorItem}
                  initialAttributes={selectedAttribute}
                />
              ))}

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
                          ? "opacity-50 max-sm:text-[10px]"
                          : "max-sm:text-[10px]"
                      }
                    />
                  </PaginationItem>

                  {Array.from({
                    length: Math.ceil(data?.length / itemsPerPage),
                  }).map((_, index) => (
                    <PaginationItem key={index + 1}>
                      <PaginationLink
                       //  href="#"
                        isActive={index + 1 === currentPage}
                        onClick={() => setCurrentPage(index + 1)}
                        className="max-sm:text-[10px]"
                      >
                        {index + 1}
                      </PaginationLink>
                    </PaginationItem>
                  ))}
                  {
                    //    <PaginationItem>
                    //    <PaginationEllipsis />
                    //  </PaginationItem>
                  }
                  <PaginationItem>
                    <PaginationNext
                     //  href="#"
                      onClick={() => setCurrentPage((prevPage) => prevPage + 1)}
                      className={
                        endIndex >= data.length
                          ? "opacity-50 max-sm:text-[10px]"
                          : "max-sm:text-[10px]"
                      }
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>

            <Link
              href="/admin/users/vendors"
              className={cn(
                "flex mt-4 w-full justify-center text-sm 2xl:text-2xl rounded-md items-center  bg-primary py-3.5 hover:opacity-80 text-white gap-3",
                (vendorShared.length === 0 ||
                  requiredAttributes.address === false ||
                  requiredAttributes.type === false ||
                  requiredAttributes.name === false ||
                  requiredAttributes.images === false ||
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
            {(searchTerm.length > 0 ? SearchFilter(filteredAttributes, searchTerm) : filteredAttributes
                ?.slice(
                  0,
                  showAllAttributes ? filteredAttributes.length : showAttributes
                ))
                ?.map((attribute: any, index: number) => (
                  attribute.name === "eventEntityId" ? null :
                  <Attributes
                    key={index}
                    name={attribute.name.toUpperCase()}
                    checked={attribute.checked}
                    onChange={(checked) => {
                      const newAttributes = [...filteredAttributes];
                      newAttributes[index].checked = checked;
                      console.log(newAttributes, " newAttributes");
                      setSelectedAttribute(newAttributes);
                    }}
                    setRequiredAttributes={setRequiredAttributes}
                    requiredAttributes={requiredAttributes}
                    setSelectedAttribute={setSelectedAttribute}
                  />
                ))}
              <div
                onClick={() => toggleShowMore()}
                className="flex items-end gap-1 cursor-pointer"
              >
                {/* <ChevronDown className="text-primary" size={20} /> */}
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

export default Vendor;

const VendorListCard = ({
  vendorItem,
  initialAttributes,
}: {
  vendorItem: any;
  initialAttributes: any;
}) => {
  const [select, setSelect] = useState(false);
  const { addVendorShared,removeVendorShared } = useVendorShareStore();
  const [selectedVendor, setSelectedVendor] = useState<any>({});

  // console.log(initialAttributes, " initialAttributes");

  const handleAddVendor = (id:string) => {
    const selectedAttributeVendor = initialAttributes.filter(
      (attribute: any) => attribute.checked === true
    );

    for (const key in vendorItem) {
      if (selectedAttributeVendor.some((item: any) => item.name === key)) {
        selectedVendor[key] = vendorItem[key];
      }
    }
    if(vendorItem?.eventEntityId){
      selectedVendor['id'] = vendorItem?.eventEntityId; 
    }
 
   if(select){
    removeVendorShared(selectedVendor);
    return;
   }
    addVendorShared(selectedVendor);
  };
  return (
    <>
      <div className="flex max-md:w-auto max-sm:gap-2 px-6  max-md:px-2 max-md:py-2 py-3 gap-7 max-md:gap-4 justify-between items-center border-primary border-solid border rounded-md">
        <div className="flex items-center w-[30%]">
          <div className="rounded-full max-3xl:w-[30%] max-sm:hidden max-md:w-6 max-md:h-6 flex items-center justify-center">
            <Image
              src={vendorItem?.images[0] || "/arroundbg.png"}
              width={40}
              height={40}
              alt="avatar"
              className="2xl:aspect-square 2xl:w-auto rounded-full max-2xl:w-11 max-2xl:h-11"
            />
          </div>
          <span className="pl-4 max-sm:w-full max-sm:text-[10px] max-sm:pl-0 w-max max-md:text-xs 2xl:text-lg">
            {vendorItem?.name
              ? vendorItem?.name.slice(0, 15) + "..."
              : "Vendor Name"}
          </span>
        </div>
        <span className="text-[#1C623C] max-sm:w-auto text-center w-[15%] max-sm:px-1 max-sm:text-[10px] rounded 2xl:text-lg max-md:px-1.5 max-md:py-0.5 max-md:text-sm text-sm bg-[#ABF8CE] px-2 py-1">
          Category
        </span>
        <h5 className="font-normal w-[10%] 2xl:text-lg max-md:text-sm text-base max-md:hidden">
          {vendorItem?.status || "Active"}
        </h5>
        <h5 className="font-normal w-[30%] max-sm:text-[10px] 2xl:text-lg max-md:text-sm  text-base">
          {vendorItem?.address
            ? vendorItem?.address.slice(0, 15) + "..."
            : "Address"}
        </h5>
        <div
          onClick={() => {
            setSelect(!select);
            handleAddVendor(vendorItem?.eventEntityId);
          }}
          className={cn(
            "max-sm:text-xs max-sm:h-7 w-[15%] max-sm:w-20 rounded cursor-pointer max-md:py-1 max-md:text-sm  h-11 flex justify-center items-center hover:opacity-80 transition-all duration-500 ease-linear",
            select
              ? "bg-primary text-white "
              : "border border-primary border-solid text-primary"
          )}
        >
          {select ? "Selected" : "Select"}
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
  setSelectedAttribute
}: IAttributes) => {
  name = name.toLocaleLowerCase();

  const isChecked = requiredAttributes[name.toLowerCase()] || checked;

  const handleCheckboxChange = (newChecked: boolean) => {
    onChange(newChecked);

    setRequiredAttributes((prevAttributes:any) => {
      const updatedAttributes = { ...prevAttributes };
      updatedAttributes[name.toLowerCase()] = newChecked;
      // console.log(updatedAttributes, ' Attributes'); // Log the updated state for requiredAttributes
      return updatedAttributes;
    });

    setSelectedAttribute((prevAttributes:any) => {
      const updatedAttributes = prevAttributes.map((attribute:any) =>
        attribute.name === name
          ? { ...attribute, checked: newChecked }
          : attribute
      );
      // console.log(updatedAttributes, ' after prevAttributes'); // Log the updated state for selectedAttribute
      return updatedAttributes;
    });
  };
  
  return (
    <div className="flex max-sm:text-sm justify-between items-center">
      <h3 className="break-all max-xs:text-[10px]">
        {name === "name" ||
        name === "type" ||
        name === "address" ||
        name === "images" ||
        name === "zipcode"
          ? name.charAt(0).toUpperCase() + name.slice(1) + "*"
          : name.charAt(0).toUpperCase() + name.slice(1)}
      </h3>
      <CustomCheckbox
      checked={isChecked}
      // onChange={(newChecked: any) => {
      //   onChange(newChecked);
      //   console.log(newChecked, " newChecked ",name);
      
      // }}
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
            // setIsChecked(e.target.checked);
            // console.log(e.target.checked, " e.target.checked ", isChecked);
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
