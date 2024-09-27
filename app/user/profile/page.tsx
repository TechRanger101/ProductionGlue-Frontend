"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Bookmark } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { useCycle } from "framer-motion";
import MobileMenu from "@/components/MobileMenu";
import ScrollLink from "@/components/ScrollLink";
import axios from "axios";
import toast from "react-hot-toast";
import Footer from "@/components/home/Footer";
import DiscoverMatch from "@/components/home/DiscoverMatch";
import { NewLogo } from "@/components/home/Header";
import { uploadFileToS3 } from "@/utils/uploadFileToS3";
// import bcrypt from "bcryptjs";
import {AES} from 'crypto-js'

const FrontHashKey = process.env.NEXT_FRONT_HASH_KEY || "";

type User = {
  name: string;
  email: string;
  phoneNumber: string;
  address: string;
  state: string;
  country: string;
  password: string;
  profilePic: string;
};

const UserProfileAdmin = () => {
  const [isOpen, toggleOpen] = useCycle(false, true);
  const [imageLoad, setImageLoad] = useState<boolean>(false);
  const [data, setData] = useState<User>({
    name: "",
    email: "",
    phoneNumber: "",
    address: "",
    state: "", 
    country: "",
    password: "",
    profilePic: "",
  });

  useEffect(() => {
    axios
      .get(`/api/user?email=${localStorage.getItem("email")}`)
      .then((res) => {
        // console.log(res.data?.data);
        setData(res.data?.data);
      });
  }, []);

  const handleChange = (e: any) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // console.log(data);
    if(data.name === "" || data.email === "" || data.phoneNumber === "" || data.address === "" || data.state === "" || data.country === "" ){
      toast.error("All fields are required");
      return;
    }

    try {
      axios.put(`/api/user`, {
        ...data,
        password: AES.encrypt(data.password, FrontHashKey).toString()
      }).then((res) => {
        // console.log(res.data?.data, ' red');
        // toast.success("User updated successfully");
        if(res?.data?.status === 200){
          toast.success("User updated successfully");
        } else {
          toast.error(res?.data?.message);
        }

      });
    } catch (error : any) {
      // console.log(error, ' er');
      toast.error(error.
        response?.data?.message || "An error occurred. Please try again later."
      )
    }
  };

  const uploadProfilePic = async (e: any) => {
    if(e.target.files.length === 0) return;
    setImageLoad(true);
    const buffer = await e.target.files[0].arrayBuffer();
    const fileName = await uploadFileToS3(buffer, e.target.files[0].name);
    let image: string =
        "https://productionglue-bucket.s3.amazonaws.com/" + fileName;
    
    setData({ ...data, profilePic: image });
    setImageLoad(false);
  }

  useEffect(() => {
    // console.log(data.profilePic);
  }
  , [data.profilePic]);

  return (
    <>
      <div>
        <div className="flex-col overflow-hidden relative flex min-h-[600px] 3xl:min-h-[680px] max-lg:min-h-[340px] w-full items-center  pt-5  max-md:max-w-full max-md:px-5">
          <Image
            src="/admin/bgadminven.svg"
            height={600}
            width={1920}
            className="absolute top-0 left-0 z-[-1] max-lg:h-[45vh] max-lg:w-full max-lg:object-cover xl:w-full"
            alt="hero"
          />

          <div className="relative 2xl:h-[70vh] h-[60vh] max-h-[48vh] flex w-full max-w-[93%] flex-col max-md:max-w-full">
            <div className="md:fixed xl:right-[3%] xl:w-[94%] md:w-[91%] md:right-[5%] z-[1000] justify-between items-center border backdrop-blur-[5px] bg-[#2E6AB3]/25 bg-opacity-10 self-stretch hidden md:flex gap-5 px-10 py-2.5 rounded-[40px] max-md:max-w-full max-md:flex-wrap max-md:px-5">
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
              href="/"
              className="text-white hover:opacity-60   font-semibold 2xl:font-bold 2xl:text-lg hidden md:flex md:justify-center md:flex-row"
            >
              Home
            </Link>
            <Link
              href="/user"
              className="text-white hover:opacity-60   font-semibold 2xl:font-bold 2xl:text-lg hidden md:flex md:justify-center md:flex-row"
            >
              Dashboard
            </Link>
            <Link
              href="/user/profile"
              className="text-white    font-semibold 2xl:font-bold 2xl:text-lg hidden md:flex md:justify-center md:flex-row"
            >
              Profile
            </Link>
            <Link
              href="/user/saved"
              className="text-white    font-semibold 2xl:font-bold 2xl:text-lg hidden md:flex md:justify-center md:flex-row"
            >
              Saved
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
              pageName="Users"
              isOpen={isOpen}
              toggleOpen={toggleOpen}
            />
            <div className="absolute w-full max-lg:bottom-0 max-md:top-32 top-56 left-0 items-stretch flex max-w-full flex-col pl-1 pr-4 max-md:mt-10">
              <div className="text-[#818181] 3xl:text-3xl max-md:text-[10px] text-base 2xl:text-xl font-medium leading-6 whitespace-nowrap items-stretch border border-[color:var(--gray-200,#E4E4E7)] backdrop-blur-[7px] bg-white w-fit px-3.5 2xl:px-5 2xl:py-4 py-2 max-md:px-2 max-md:py-0.5 rounded-[60px] border-solid">
                View user profile
              </div>
              <div className="flex justify-between w-full items-end">
                <div>
                  <div className="text-white 3xl:text-9xl text-6xl 2xl:text-7xl leading-normal font-extrabold mt-10 max-md:mt-5 max-md:max-w-full max-md:text-4xl">
                    Your Profile{" "}
                  </div>
                </div>
                <div className="hover:scale-125 max-lg:hidden transform transition-all duration-300 ease-in-out cursor-pointer">
                  <ScrollLink href="#userProfile">
                    <Image
                      src="/ArrowDown.svg"
                      width={110}
                      height={110}
                      alt="down"
                      className="3xl:w-36"
                    />
                  </ScrollLink>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          id="userProfile"
          className=" md:max-w-[93%] md:mx-auto max-md:px-5 mt-8 max-md:mt-0 mb-20"
        >
          <div>
            <h2 className="text-3xl max-md:text-base text-gray-900 font-semibold">
              View your profile
            </h2>
            <p className="text-base max-md:text-sm text-gray-500 mt-3">
              View your profile and make necessary changes
            </p>
          </div>
          <div className="border-t border-solid border-gray-300 mt-10 max-md:mt-5 max-md:pt-5 pt-10 flex justify-center">
            <div className="w-1/2 max-xl:w-2/3 max-md:w-full my-6">
              <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
                <div
                className="w-fit m-auto"
                >
                  <label
                    htmlFor="profilePic"
                    className="font-light text-gray-700 flex justify-center "
                  >
                   <input
                      type="file"
                      name="profilePic"
                      id="profilePic"
                      onChange={uploadProfilePic}
                      className="hidden"
                    />
                    <div className="relative w-24 h-24 border border-solid border-gray-200 rounded-full ">
                     
                      <div
                      className="w-full h-full object-cover object-center rounded-full overflow-hidden relative"
                      >
                      {/*  eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={data?.profilePic}
                        loading="lazy"
                        alt="profile"
                        className="w-full h-full object-cover"
                      />
                      {imageLoad && (
                        <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
                          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[#2E6AB3]"></div>
                        </div>
                      )}
                      </div>
                      <div className="absolute bottom-0 right-0 bg-white p-1 rounded-full">
                        <Bookmark size={20} />
                      </div>

                      <label
                        htmlFor="profilePic"
                        className="absolute bottom-0 z-30 right-0 bg-[#2E6AB3] p-1 rounded-full cursor-pointer"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6 text-white"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                          />
                        </svg>
                      </label>

                      </div>

                      </label>
                    
                </div>
                <div>
                  {" "}
                  <label htmlFor="name" className="font-light text-gray-700">
                    Name <span className="text-primary">*</span>
                  </label>
                  <Input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Enter the name"
                    className="mt-3"
                    value={data?.name}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  {" "}
                  <label htmlFor="email" className="font-light text-gray-700">
                    Email Address <span className="text-primary">*</span>
                  </label>
                  <Input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Enter Email"
                    className="mt-3"
                    value={data?.email}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  {" "}
                  <label
                    htmlFor="phoneNumber"
                    className="font-light text-gray-700"
                  >
                    Phone Number <span className="text-primary">*</span>
                  </label>
                  <Input
                    type="text"
                    name="phoneNumber"
                    id="phoneNumber"
                    placeholder="Enter Phone Number"
                    className=" mt-3"
                    value={data?.phoneNumber}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  {" "}
                  <label htmlFor="address" className="font-light text-gray-700">
                    Address <span className="text-primary">*</span>
                  </label>
                  <Textarea
                    name="address"
                    id="  address"
                    placeholder="Enter  address"
                    value={data?.address}
                    onChange={handleChange}
                    className="mt-3 "
                    rows={5}
                  />
                </div>
                <div>
                  {" "}
                  <label htmlFor="state" className="font-light text-gray-700">
                    State <span className="text-primary">*</span>
                  </label>
                  <Input
                    type="text"
                    name="state"
                    id="state"
                    value={data?.state}
                    onChange={handleChange}
                    placeholder="Enter State"
                    className=" mt-3 "
                  />
                </div>
                <div>
                  {" "}
                  <label
                    htmlFor="VenueType"
                    className="font-light text-gray-700"
                  >
                    Country <span className="text-primary">*</span>
                  </label>
                  <Input
                    type="text"
                    name="country"
                    id="country"
                    value={data?.country}
                    onChange={handleChange}
                    placeholder="Enter Country"
                    className=" mt-3 "
                  />
                </div>
                <div>
                  {" "}
                  <label
                    htmlFor="password"
                    className="font-light text-gray-700"
                  >
                    Password
                  </label>
                  <Input
                    type="password"
                    name="password"
                    id="password"
                    value={data?.password}
                    onChange={handleChange}
                    placeholder="Enter Password"
                    className=" mt-3 "
                  />
                </div>
                <button
                  type="submit"
                  disabled={imageLoad}
                  className="bg-[#2E6AB3]  text-white w-full py-3 rounded-lg hover:opacity-80 mt-8 mb-6"
                >
                  Apply edits
                </button>
              </form>
            </div>
          </div>
        </div>
        <DiscoverMatch />
        <div>
          <Footer bgColor="bg-[#2E6AB3]" />
        </div>
      </div>
    </>
  );
};

export default UserProfileAdmin;
