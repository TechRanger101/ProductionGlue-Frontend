import {
    Book,
  BookOpen,
  Chrome,
  Lock,
  Mail,
  PhoneCall,
  ShieldCheck,
  Store,
  User,
  Calendar,
  CalendarDays,
  Shield,
  Blocks,
  LocateFixed,
  Building2,
  Settings,
  BookA,
  User2,
  HeartHandshake,
  
} from "lucide-react";
import Link from "next/link";
import React from "react";

type Props = {
  data?: any;
};
const VendorProfile = ({ data }: Props) => {
  // console.log(data, " data");
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  const form9 = data?.formW9?.match(urlRegex);
  const Nda = data?.Nda?.match(urlRegex);
  const coi = data?.coi?.match(urlRegex);

  return (
    <>
      <div className="flex gap-2 mt-6 lg:flex-row flex-col">
        <div className="lg:w-1/2 w-full">
          <div className="pt-8 grid lg:gap-6 xl:gap-8 max-md:text-xs gap-3">
            <div className="  w-full  flex gap-5">
              <h4 className="font-semibold inline-flex text-lg max-md:text-sm w-1/2">
                <ShieldCheck className="mr-2" />
                Epicor ID:
              </h4>
              <li className="list-none w-1/2 max-md:text-xs">
                {" "}
                {data?.epicorId || ""}{" "}
              </li>
            </div>
            <div className="  w-full  flex gap-5">
              <h4 className="font-semibold inline-flex text-lg max-md:text-sm w-1/2">
                <User className="mr-2" />
                Representative Name:
              </h4>
              <li className="list-none w-1/2 max-md:text-xs">
                {" "}
                {data?.representativeContactName || ""}{" "}
              </li>
            </div>
            <div className="  w-full  flex gap-5">
              <h4 className="font-semibold inline-flex text-lg max-md:text-sm w-1/2">
                <Mail className="mr-2" />
                Representative Email:
              </h4>
              <li className="list-none w-1/2 max-md:text-xs">
                {" "}
                {data?.representativeEmail || ""}{" "}
              </li>
            </div>
            <div className="  w-full  flex gap-5">
              <h4 className="font-semibold inline-flex text-lg max-md:text-sm  w-1/2">
                <PhoneCall className="mr-2" />
                Phone number:
              </h4>
              <li className="list-none w-1/2 max-md:text-xs">
                {" "}
                {data?.phoneNumber || ""}{" "}
              </li>
            </div>
            <div className="  w-full  flex gap-5 ">
              <h4 className="font-semibold inline-flex text-lg max-md:text-sm  w-1/2">
                <Mail className="mr-2" />
                Email:
              </h4>
              <li className="list-none break-words w-1/2 max-lg:break-all">
                {data?.email || ""}
              </li>
            </div>
            <div className="  w-full  flex gap-5 ">
              <h4 className="font-semibold inline-flex text-lg max-md:text-sm  w-1/2">
                <Chrome className="mr-2" />
                Website:
              </h4>
              <a
                href={data?.websiteUrl}
                target="_blank"
                className="list-none text-primary break-words max-lg:break-all w-1/2"
              >
                {data?.websiteUrl || ""}
              </a>
            </div>

            <div className="  w-full  flex gap-5 ">
              <h4 className="font-semibold text-lg inline-flex max-md:text-sm  w-1/2 items-center">
                <Store className="mr-2 " />
                Availability:
              </h4>
              <li className="list-none w-1/2 max-md:text-xs">
                {data?.status || ""}
              </li>
            </div>

            <div className="  w-full  flex gap-5 ">
              <h4 className="font-semibold text-lg inline-flex max-md:text-sm  w-1/2 items-center">
                <Building2 className="mr-2 " />
                Business Type:
              </h4>
              <li className="list-none w-1/2 max-md:text-xs">
                {data?.businessType || ""}
              </li>
            </div>

            <div className="  w-full  flex gap-5 ">
              <h4 className="font-semibold text-lg inline-flex max-md:text-sm  w-1/2 items-center">
                <BookOpen className="mr-2 " />
                2024 W9:
              </h4>
              <li className="list-none w-1/2 max-md:text-xs">
                {data?.formW9 ? (
                  data?.formW9.includes("https://") ? (
                    <Link
                      href={
                        data?.formW9 && form9?.length > 0 && form9[0]
                          ? form9[0]
                          : "#"
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <p className="text-primary">
                        {data?.formW9 ? data?.formW9.slice(0, 10) : ""}
                      </p>
                    </Link>
                  ) : (
                    data?.formW9.slice(0, 15)
                  )
                ) : (
                  ""
                )}
              </li>
            </div>
            <div className="  w-full  flex gap-5 ">
              <h4 className="font-semibold text-lg inline-flex max-md:text-sm  w-1/2 items-center">
                <ShieldCheck className="mr-2 " />
                Fein:
              </h4>
              <li className="list-none w-1/2 max-md:text-xs">
                {data?.fein || ""}
              </li>
            </div>

            <div className="  w-full  flex gap-5 ">
              <h4 className="font-semibold text-lg inline-flex max-md:text-sm  w-1/2 items-center">
                <LocateFixed className="mr-2 " />
                Address:
              </h4>
              <li className="list-none w-1/2 max-md:text-xs">
                {data?.address || ""}
              </li>
            </div>
          </div>
        </div>
        <div className="lg:w-1/2 w-full">
          <div className="pt-8 grid lg:gap-6 xl:gap-8 max-md:text-xs gap-3">
            <div className="  w-full  flex gap-5">
              <h4 className="font-semibold inline-flex text-lg max-md:text-sm w-1/2 items-center">
                <Book className="mr-2" />
                Description:
              </h4>
              <li className="list-none w-1/2 max-md:text-xs">
                {" "}
                {data?.Notes || ""}{" "}
              </li>
            </div>
            <div className="  w-full  flex gap-5">
              <h4 className="font-semibold inline-flex text-lg max-md:text-sm w-1/2 items-center">
                <Lock className="mr-2" />
                Nda:
              </h4>
              <li className="list-none w-1/2 max-md:text-xs">
                {data?.Nda ? (
                  data?.Nda.includes("https://") ? (
                    <Link
                      href={
                        data?.Nda && Nda?.length > 0 && Nda[0]
                          ? Nda[0]
                          : "#"
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <p className="text-primary">
                        {data?.Nda ? data?.Nda.slice(0, 10) : ""}
                      </p>
                    </Link>
                  ) : (
                    data?.Nda.slice(0, 15)
                  )
                ) : (
                  ""
                )}
              </li>
            </div>
            <div className="  w-full  flex gap-5">
              <h4 className="font-semibold inline-flex text-lg max-md:text-sm w-1/2 items-center">
                <Calendar className="mr-2" />
                Year Of NDA:
              </h4>
              <li className="list-none w-1/2 max-md:text-xs">
                {" "}
                {data?.YearOfNda || ""}{" "}
              </li>
            </div>
            <div className="  w-full  flex gap-5">
              <h4 className="font-semibold inline-flex text-lg max-md:text-sm w-1/2 items-center">
                <CalendarDays className="mr-2" />
                NDA Expiration:
              </h4>
              <li className="list-none w-1/2 max-md:text-xs">
                {" "}
                {data?.NdaExpiration || ""}{" "}
              </li>
            </div>
            <div className="  w-full  flex gap-5">
              <h4 className="font-semibold inline-flex text-lg max-md:text-sm w-1/2 items-center">
                <Shield className="mr-2" /> 
                Coi:
              </h4>
              <li className="list-none w-1/2 max-md:text-xs">
                {data?.coi ? (
                  data?.coi.includes("https://") ? (
                    <Link
                      href={
                        data?.coi && coi?.length > 0 && coi[0]
                          ? coi[0]
                          : "#"
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <p className="text-primary">
                        {data?.coi ? data?.coi.slice(0, 12) : ""}
                      </p>
                    </Link>
                  ) : (
                    data?.coi.slice(0, 15)
                  )
                ) : (
                  ""
                )}
              </li>
            </div>
            <div className="  w-full  flex gap-5">
              <h4 className="font-semibold inline-flex text-lg max-md:text-sm w-1/2 items-center">
                <CalendarDays className="mr-2" />
                COI Expiration:
              </h4>
              <li className="list-none w-1/2 max-md:text-xs">
                {" "}
                {data?.coiExpiration || ""}{" "}
              </li>
            </div>
            <div className="  w-full  flex gap-5">
              <h4 className="font-semibold inline-flex text-lg max-md:text-sm w-1/2 items-center">
                <Blocks className="mr-2" />
                Active Cities:
              </h4>
              <li className="list-none w-1/2 max-md:text-xs">
                {" "}
                {data?.activeCities ? 
                typeof data?.activeCities === "string" ? data?.activeCities : data?.activeCities.join(", ")
                : ""}{" "}
                
            
              </li>
            </div>
            <div className="  w-full  flex gap-5">
              <h4 className="font-semibold inline-flex text-lg max-md:text-sm w-1/2 items-center">
                <Settings className="mr-2" />
                Full Service Offered:
              </h4>
              <li className="list-none w-1/2 max-md:text-xs">
                {" "}
                {data?.fullServiceOffered || ""}{" "}
              </li>
            </div>
            <div className="  w-full  flex gap-5">
              <h4 className="font-semibold inline-flex text-lg max-md:text-sm w-1/2 items-center">
                <BookA className="mr-2" />
                Standard Terms/Default Terms:
              </h4>
              <li className="list-none w-1/2 max-md:text-xs">
                {" "}
                {data?.StandardTermsOrDefaultTerms || ""}{" "}
              </li>
            </div>
            <div className="  w-full  flex gap-5">
              <h4 className="font-semibold inline-flex text-lg max-md:text-sm w-1/2 items-center">
                <User2 className="mr-2" />
                PG Contacts/Updaters:
              </h4>
              <li className="list-none w-1/2 max-md:text-xs">
                {" "}
                {data?.pGContactsOrUpdaters || ""}{" "}
              </li>
            </div>
            <div className="  w-full  flex gap-5">
              <h4 className="font-semibold inline-flex text-lg max-md:text-sm w-1/2 items-center">
                <HeartHandshake className="mr-2" />
                Tait/PGPartner:
              </h4>
              <li className="list-none w-1/2 max-md:text-xs">
                {" "}
                {data?.taitOrPgPartner || ""}{" "}
              </li>
            </div>
          </div>
        </div>
        {/* <div className="lg:w-1/2 w-full">
          <div>
            <div className="text-[#4A5262] text-xl xl:text-2xl font-semibold whitespace-nowrap">
              Description
            </div>
            <div className="text-[#4A5262] text-sm xl:text-base font-normal mt-6 ml-5">
              {data?.Notes || "No Description"}
            </div>
          </div>
        </div> */}
      </div>
    </>
  );
};

export default VendorProfile;
