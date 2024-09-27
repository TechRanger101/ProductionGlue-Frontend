"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import axios from "axios";
import toast from "react-hot-toast";

const SendInviteForm = () => {
  const [sendData, setSendData] = useState({
    email: "",
    senderMail: "lalman@gmail.com",
  });

  const onSubmit = async (e: any) => {
    e.preventDefault();
    // console.log(sendData);
    try {
      const res = await axios.post("/api/send-invite", sendData);
      if (res.data?.status === 200) {
        toast.success(res.data?.message);
        setSendData({ email: "", senderMail: "lalman@gmail.com" });
      }
      if (res.data?.status === 400) {
        toast.error(res.data?.message);
      }
      console.log(res.data);
    } catch (error: any) {
      toast.error(error.response.data);
    }
  };
  return (
    <>
      <form className="sm:mt-20 mt-8 " onSubmit={onSubmit}>
        <label htmlFor="email">Email</label>
        <Input
          type="email"
          name="email"
          id="email"
          value={sendData.email}
          placeholder="Enter email"
          onChange={(e) => setSendData({ ...sendData, email: e.target.value })}
          className="w-full mt-2 mb-5 bg-transparent border border-primary "
        />
        <p className="text-gray-500 mt-6 text-sm md:text-base md:mb-20 mb-8 ">
          The recipient will receive an email to join us at productionglue
        </p>

        <button
          type="submit"
          className="text-white w-96 md:w-[500px] text-center text-base font-medium leading-6 whitespace-nowrap justify-center items-center backdrop-blur-[7px] bg-[#2E6AB3] px-16 py-4 rounded-xl max-md:max-w-full max-md:px-5 hover:opacity-80 transition-all duration-200 ease-linear"
        >
          Send Invite
        </button>
      </form>
    </>
  );
};

export default SendInviteForm;
