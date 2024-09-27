"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
// import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { AES } from "crypto-js";

const FrontHashKey = process.env.NEXT_FRONT_HASH_KEY || "";

const SignUp = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
      const [loading, setLoading] = useState(false);
    
      const router = useRouter();
    
      // const { confirmPassword, email, password,name } = formData;
    
      const onChange = (e: any) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
      };
    
      const onSubmit = async (e: any) => {
        e.preventDefault();
    
        if (formData.name === "") {
          toast.error("Name is required");
          return;
        }
    
        if (formData.password !== formData.confirmPassword) {
          console.log(formData.password, " f ", formData.confirmPassword);
          toast.error("Password do not match");
          return;
        }
    
        setLoading(true);
    
        const hash = AES.encrypt(formData.password, FrontHashKey).toString();
        // console.log(hash);
        // setFormData({ ...formData, password: hash });
    
        try {
          const res = await axios.post("/api/sign-up", {
            name: formData.name,
            email: formData.email,
            password: hash,
          });
          if (res.data?.body?.status === 200) {
            console.log(res.data);
            localStorage.setItem("role", res.data?.body?.data?.role);
            localStorage.setItem("email", res.data?.body?.data?.email);
            localStorage.setItem("userId", res.data?.body?.data?.userId);
            toast.success("Registration Success");
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
            toast.error(res.data?.body?.message);
            setLoading(false);
          }
          // console.log(res.data);
        } catch (error: any) {
          toast.error(error.response.data);
          setLoading(false);
        }
      };
  return (
    <>
      <div className="w-fit max-lg:w-[90%] max-lg:mx-auto max-lg:h-full">
                  <div className="text-zinc-900 my-4 2xl:my-4 lg:my-8 text-xl  lg:text-3xl md:text-4xl font-medium grow whitespace-nowrap">
                    Sign Up
                  </div>
                  <p className="text-gray-500 mt-2 lg:mb-0 mb-8 2xl:text-lg lg:text-base ">
                    Lets begin our journey together
                  </p>
                  <form className="2xl:mt-6 lg:mt-4 " onSubmit={onSubmit}>
                    <label htmlFor="name">Name</label>
                    <Input
                      type="text"
                      name="name"
                      id="name"
                      placeholder="Your Name"
                      onChange={onChange}
                      className="w-full mt-2 2xl:mb-5 mb-3 "
                    />
                    <label htmlFor="email">Email</label>
                    <Input
                      type="email"
                      name="email"
                      id="email"
                      onChange={onChange}
                      placeholder="Enter email"
                      className="w-full mt-2 2xl:mb-5 mb-3 "
                    />
                    <label htmlFor="password">Password</label>
                    <Input
                      type="password"
                      autoComplete="off"
                      name="password"
                      onChange={onChange}
                      id="password"
                      placeholder="*********"
                      className="w-full mt-2 2xl:mb-5 mb-3 "
                    />
                    <label htmlFor="password">Confirm Password</label>
                    <Input
                      type="password"
                      autoComplete="off"
                      name="confirmPassword"
                      onChange={onChange}
                      id="confirmPassword"
                      placeholder="*********"
                      className="w-full mt-2 2xl:mb-5 mb-3 "
                    />
                    <Link href="/sign-in">
                      <p className="max-xs:text-xs text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        Already have an account?{" "}
                        <span className="text-primary">Sign In</span>
                      </p>
                    </Link>

                    <button
                      type="submit"
                      disabled={
                        loading ||
                        formData.password === "" ||
                        formData.email === "" ||
                        formData.name === ""
                      }
                      className="text-white max-lg:w-full max-lg:mt-8 2xl:mt-16 lg:mt-8 w-96 lg:w-[500px] text-center text-base font-medium leading-6 whitespace-nowrap justify-center items-center backdrop-blur-[7px] bg-[#2E6AB3] px-16 py-4 rounded-xl max-md:max-w-full max-md:px-5 hover:opacity-80 transition-all duration-200 ease-linear disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none"
                    >
                      Sign Up
                    </button>
                  </form>
                  <div className="2xl:mt-16 max-lg:mt-12 lg:mt-8 w-full flex justify-center">
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
                              const res = await axios.post(
                                "/api/auth-google-register",
                                {
                                  decoded: decoded,
                                }
                              );
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
                                toast.success("Register Successfull");
                                // router.push("/dashboard");
                                if (res.data?.body?.data?.role === "user") {
                                  router.push("/");
                                  router.refresh();
                                }
                                if (res.data?.body?.data?.role === "admin") {
                                  router.push("/");
                                  router.refresh();
                                }
                              }
                            }

                            googleLogin();
                          }}
                          onError={() => {
                            console.log("Login Failed");
                          }}
                          type="standard"
                          theme="outline"
                          size="large"
                          width="400"
                          text="signup_with"
                          auto_select={true}
                        />
                      </div>
                    </div>
                  </div>
                </div>
    </>
  )
}

export default SignUp

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