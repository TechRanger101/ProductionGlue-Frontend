"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import axios from "axios";
import toast from "react-hot-toast";

const ForgotPasswordFormLink = () => {
  const [forgotData, setForgotData] = useState({
    email : ""})

  const onSubmit = (e:any) => {
    e.preventDefault();
    axios
      .post("/api/forgot-password-reset-link", forgotData)
      .then((res) => {
        toast.success("Password reset link sent to your email");
        console.log(res);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  }
  return (
    <>
      <form className="sm:mt-20 mt-8 " onSubmit={onSubmit}>
        <label htmlFor="email">Email</label>
        <Input
          type="email"
          name="email"
          id="email"
          value={forgotData.email}
          onChange={(e) =>
            setForgotData({ ...forgotData, email: e.target.value })
          }
          placeholder="Enter email"
          // disabled={true}
          className="w-full mt-2 mb-5 bg-transparent border border-primary disabled:opacity-60  disabled:cursor-not-allowed"
        />

        <button
          type="submit"
          className="text-white w-96 md:w-full text-center text-base font-medium leading-6 whitespace-nowrap justify-center items-center backdrop-blur-[7px] bg-[#2E6AB3] px-16 py-4 rounded-xl max-md:max-w-full max-md:px-5 hover:opacity-80 transition-all duration-200 ease-linear"
        >
            Submit
        </button>
      </form>
    </>
  );
};

export default ForgotPasswordFormLink;
