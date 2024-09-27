import { Building, Chrome, Mail, PersonStanding, PhoneCall, Ruler, Store, TrainFront, User } from "lucide-react";
import React from "react";

type Props = {
  data?: any;
};
const ProfileTabDetail = ({ data }: Props) => {
  // console.log(data, " data");
  return (
    <>
      <div className="flex gap-2 mt-6 lg:flex-row flex-col">
        <div className="lg:w-1/2 w-full">
          <div className="pt-8 grid lg:gap-6 xl:gap-8 max-md:text-xs gap-3">
            <div className="  w-full  flex gap-5">
              <h4 className="font-semibold inline-flex text-lg max-md:text-sm w-1/2">
                <User
                className="mr-2"
                /> 
                Contact Name</h4>
              <li className="list-none w-1/2 max-md:text-xs"> {data?.contactName || ""} </li>
            </div>
            <div className="  w-full  flex gap-5">
              <h4 className="font-semibold inline-flex text-lg max-md:text-sm  w-1/2">
              <Building 
                className="mr-2"
                />
                Space Type:</h4>
              <li className="list-none w-1/2 max-md:text-xs">
              {data?.spaceName ? data?.spaceName : ""} </li>
              </div>
            <div className="  w-full  flex gap-5">
              <h4 className="font-semibold inline-flex text-lg max-md:text-sm  w-1/2">
              <PhoneCall
                className="mr-2"
                />
                Phone number:</h4>
              <li className="list-none w-1/2 max-md:text-xs"> {data?.phoneNumber || ""} </li>
            </div>
            <div className="  w-full  flex gap-5 ">
              <h4 className="font-semibold inline-flex text-lg max-md:text-sm  w-1/2">
              <Mail
                className="mr-2"
                />
                Email:</h4>
              <li className="list-none break-words w-1/2 max-lg:break-all">
                {data?.email || ""}
              </li>
            </div>
            <div className="  w-full  flex gap-5 ">
              <h4 className="font-semibold inline-flex text-lg max-md:text-sm  w-1/2">
              <Chrome
                className="mr-2"
                />
               
                Website:</h4>
              <a href={data?.websiteUrl}
              target="_blank"
              className="list-none text-primary break-words max-lg:break-all w-1/2">
                {data?.websiteUrl || ""}
              </a>
            </div>

            <div className="  w-full  flex gap-5">
              <h4 className="font-semibold  inline-flex text-lg max-md:text-sm  w-1/2">
              <Building 
                className="mr-2"
                />
                Space Size Capacity:
              </h4>
              <li className="list-none w-1/2 max-md:text-xs">
                {" "}
                {data?.spaceSizeCapacity || " "}{" "}
              </li>
            </div>
            <div className="  w-full  flex gap-5">
              <h4 className="font-semibold inline-flex  text-lg max-md:text-sm  w-1/2">
              <Ruler 
                className="mr-2 rotate-45"
                />
                Space Size Square Feet:
              </h4>
              <li className="list-none w-1/2 max-md:text-xs">
                {" "}
                {data?.spaceSizeSquareFeet || ""}{" "}
              </li>
            </div>

            <div className="  w-full  flex gap-5">
              <h4 className="font-semibold inline-flex  text-lg max-md:text-sm  w-1/2">
              <PersonStanding 
                className="mr-2 "
                />
                Capacity Standing:
              </h4>
              <li className="list-none w-1/2 max-md:text-xs">{data?.standing || ""}</li>
            </div>
            <div className="  w-full  flex gap-5 ">
              <h4 className="font-semibold text-lg max-md:text-sm inline-flex  w-1/2">
              <Ruler 
                className="mr-2 rotate-45"
                />
                Square Ft</h4>
              <li className="list-none w-1/2 max-md:text-xs">{data?.squareFeet || ""}</li>
            </div>
            <div className="  w-full  flex gap-5 ">
              <h4 className="font-semibold text-lg inline-flex max-md:text-sm  w-1/2">
              <Store 
                className="mr-2 "
                />
                Availability:</h4>
              <li className="list-none w-1/2 max-md:text-xs">{data?.status || ""}</li>
            </div>
            <div className="  w-full  flex gap-5">
              <h4 className="font-semibold inline-flex text-lg max-md:text-sm  w-1/2">
              <TrainFront 
                className="mr-2 "
                />
                Transportation:</h4>
              <li className="list-none w-1/2 max-md:text-xs max-lg:break-all">
                {" "}
                {data?.transportation || ""}{" "}
              </li>
            </div>
          </div>
        </div>
        <div className="lg:w-1/2 w-full">
          <div>
          <div className="text-[#4A5262] text-xl xl:text-2xl font-semibold whitespace-nowrap">
            Description
          </div>
            <div className="text-[#4A5262] text-sm xl:text-base font-normal mt-6 ml-5">
              {data?.notes || "No Description"}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileTabDetail;
