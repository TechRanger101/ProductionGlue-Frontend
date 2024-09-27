"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import {AES} from 'crypto-js'

const FrontHashKey = process.env.NEXT_FRONT_HASH_KEY || "";

const SignIn = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  // const {  email, password } = formData;

  const onChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  // console.log(formData);
  const onSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    const hash = AES.encrypt(formData.password, FrontHashKey).toString();
    // console.log(hash);
    // setFormData({ ...formData, password: hash });
    


    try {
      const res = await axios.post("/api/sign-in", {
        email: formData.email,
        password: hash,
      });
      if (res.data?.body?.status === 200) {
        // console.log(res.data);
        localStorage.setItem("role", res.data?.body?.data?.role);
        localStorage.setItem("email", res.data?.body?.data?.email);
        localStorage.setItem("userId", res.data?.body?.data?.userId);
        toast.success("Login Successfull");
        // router.push("/dashboard");
        if (res.data?.body?.data?.role === "user") {
          router.push("/");
            router.refresh();
        }
        if (res.data?.body?.data?.role === "admin") {
          router.push("/");
            router.refresh();
        }
        setLoading(false);
      }
      if (res.data?.body?.status === 400) {
        // toast.error(res.data?.body?.message);
         toast.error("Login Failed");
         setLoading(false);
      }
      console.log(res.data);
    } catch (error: any) {
      // toast.error(error.response.data);
      toast.error("Login Failed");
      setLoading(false);
    }
    
  };

  return (
    <>
      <section>
        <div className="flex w-full h-screen">
          <div className="2xl:w-3/5 lg:w-2/3 max-lg:hidden">
            <Image
              src="/auth-images/Login.jpeg"
              width={500}
              height={500}
              alt="SignIn"
              className="w-full h-full object-fill object-center"
            />
          </div>
          <div className="2xl:w-2/5 w-full max-xs:h-fit overflow-y-auto"
          
          style={{
            background: "url(/bgimages/Send-invite-bg3.png)",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}>
            <div className="max-lg:h-full relative w-full h-full px-8 max-md:max-w-full max-md:px-5"
              // style={{
              //   minHeight: 'inherit'
              // }}
            >
              {/* <Image
                src="/bgimages/Send-invite-bg3.png"
                layout="fill"
                className="absolute h-full w-full object-cover object-center inset-0"
                alt="Sign In"
                placeholder="blur"
                blurDataURL="/bgimages/Send-invite-bg3.png"
              /> */}

              <div className="flex py-4 flex-col w-full justify-between items-center  relative h-full lg:h-full lg:min-h-screen max-xl:overflow-y-auto">
                <div className=" 2xl:mt-8 lg:mt-5  my-12 lg:mb-0  ">
                  <Link href="/">
                    <Image src="/logo.svg" width={190} height={40} alt="logo" />
                  </Link>
                </div>
                <div className="w-fit max-lg:w-[90%] max-lg:mx-auto">
                  <div className="text-zinc-900 mt-14 text-xl  lg:text-3xl md:text-4xl font-medium grow whitespace-nowrap">
                    Sign In
                  </div>
                  <p className="text-gray-500 mt-5 mb-16 2xl:text-lg lg:text-base ">
                    Continue your Journey
                  </p>
                  <form className="2xl:mt-6 lg:mt-4" onSubmit={onSubmit}>
                    <label htmlFor="name">Name/Email</label>
                    <Input
                      type="text"
                      name="email"
                      id="email"
                      onChange={onChange}
                      placeholder="Your name or email"
                      className="w-full mt-2 2xl:mb-5 mb-3 "
                    />
                    <label htmlFor="password">Password</label>
                    <Input
                      type="password"
                      name="password"
                      onChange={onChange}
                      autoComplete="off"
                      id="password"
                      placeholder="*********"
                      className="w-full mt-2 2xl:mb-5 mb-3 "
                    />

                    <div className="flex items-center justify-between w-full 2xl:mt-6 mt-4 mb-12 lg:mb-0 ">
                      <Link href="/sign-up">
                        <p className="max-xs:text-xs text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                          Don{"'"}t have an account?{" "} <br className="sm:hidden block"/>
                          <span className="text-primary max-sm:break-all">Sign Up</span>
                        </p>
                      </Link>
                      <Link href="/forgot-password-reset">
                        <p className="text-primary max-xs:text-xs text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                          Forgot Password?{" "}
                        </p>
                      </Link>
                    </div>

                    <button
                      type="submit"
                      disabled={loading || !formData.email || !formData.password}
                      className="text-white 2xl:mt-16 lg:mt-8 w-full lg:w-[500px] text-center text-base font-medium leading-6 whitespace-nowrap justify-center items-center backdrop-blur-[7px] bg-[#2E6AB3] px-16 py-4 rounded-xl max-md:max-w-full max-md:px-5 hover:opacity-80 transition-all duration-200 ease-linear disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none"
                    >
                      Sign In
                    </button>
                  </form>

                  <div className="2xl:mt-16 max-lg:mt-9 lg:mt-8 w-full flex justify-center">
                    <div className="relative w-full">
                      <button className="text-primary max-lg:w-full absolute -top-10  mt-8 flex gap-2 w-96 lg:w-[500px] text-center text-base font-medium leading-6 whitespace-nowrap justify-center items-center backdrop-blur-[7px] border-primary border-solid border px-16 py-4 rounded-xl max-md:max-w-full max-md:px-5 hover:opacity-80 transition-all duration-200 ease-linear">
                        <GoogleIcon />

                        <span>Continue with Google</span>
                      </button>
                      <div className="opacity-[0.0002] max-sm:overflow-hidden">
                        <GoogleLogin
                          onSuccess={(credentialResponse) => {
                            var decoded = jwtDecode(
                              // @ts-ignore
                              credentialResponse?.credential
                            );
                            // console.log(decoded, " button");
                            async function googleLogin() {
                              const res = await axios.post("/api/auth-google", {
                                decoded: decoded,
                              });
                              // console.log("google run api Successfull");
                              if (res.data?.body?.status === 200) {
                                localStorage.setItem(
                                  "role",
                                  res.data?.body?.data?.role
                                );
                                localStorage.setItem(
                                  "email",
                                  res.data?.body?.data?.email
                                );
                                localStorage.setItem("userId", res.data?.body?.data?.userId);
                                toast.success("Login Successfull");
                                router.push("/");
                                router.refresh();
                              }
                              if (res.data?.body?.status === 401) {
                                toast.error(`${res.data?.body?.data}`);
                              }
                            }

                            googleLogin();
                          }}
                          onError={() => {
                            console.log("Login Failed");
                          }}
                          type="standard"
                          theme="filled_blue"
                          size="large"
                          width="600"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className=" max-lg:w-auto border-none bottom-0 pt-4 2xl:border-t border-gray-500 w-96 md:w-[500px] text-center  2xl:border-solid">
                  <p className="text-gray-500 text-sm  lg:text-base  mb-5 ">
                    © 2023 productionglue. All rights reserved.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SignIn;

const GoogleIcon = () => {
  return (
    <>
      <svg
        width="20"
        height="21"
        viewBox="0 0 20 21"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clipPath="url(#clip0_346_5015)">
          <path
            d="M19.4312 8.69761C19.5479 9.36881 19.606 10.0489 19.605 10.7301C19.605 13.7726 18.5175 16.3451 16.625 18.0864H16.6275C14.9725 19.6151 12.6975 20.5001 10 20.5001C7.34783 20.5001 4.8043 19.4465 2.92893 17.5712C1.05357 15.6958 0 13.1523 0 10.5001C0 7.84795 1.05357 5.30441 2.92893 3.42904C4.8043 1.55368 7.34783 0.500111 10 0.500111C12.4824 0.471038 14.8798 1.40365 16.69 3.10261L13.835 5.95761C12.803 4.97383 11.4256 4.4351 10 4.45761C7.39125 4.45761 5.175 6.21761 4.385 8.58761C3.96613 9.82949 3.96613 11.1745 4.385 12.4164H4.38875C5.1825 14.7826 7.395 16.5426 10.0037 16.5426C11.3512 16.5426 12.5087 16.1976 13.4062 15.5876H13.4025C13.9236 15.2424 14.3694 14.7951 14.7129 14.2728C15.0565 13.7506 15.2906 13.1641 15.4012 12.5489H10V8.69886L19.4312 8.69761Z"
            fill="#2E6AB3"
          />
        </g>
        <defs>
          <clipPath id="clip0_346_5015">
            <rect
              width="20"
              height="20"
              fill="white"
              transform="translate(0 0.5)"
            />
          </clipPath>
        </defs>
      </svg>
    </>
  );
};
