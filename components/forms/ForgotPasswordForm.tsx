"use client";
import { useParams } from "next/navigation";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import axios from "axios";
import toast from "react-hot-toast";

const ForgotPasswordForm = () => {
  const { token, userEmail } = useParams();
  const [forgotData, setForgotData] = useState({
    email: userEmail ? userEmail : "",
    token: token ? token : "",
    newPassword: "",
  });

  const onSubmit = (e: any) => {
    if (forgotData.email === "" || forgotData.token === "") {
      toast.error("You are not authorized to reset password");
      return;
    }

    if (forgotData.newPassword === "") {
      toast.error("Please fill all the Password field");
      return;
    }
    e.preventDefault();
    axios
      .post("/api/forgot-password-reset-verify", forgotData)
      .then((res) => {
        toast.success("Password reset successfully");
        console.log(res);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };
  return (
    <>
      <form className="sm:mt-20 mt-8 " onSubmit={onSubmit}>
        <label htmlFor="email">Email</label>
        <Input
          type="email"
          name="email"
          id="email"
          value={userEmail}
          // placeholder="Enter email"
          disabled={true}
          className="w-full mt-2 mb-5 bg-transparent border border-primary disabled:opacity-60  disabled:cursor-not-allowed"
        />
        <label htmlFor="newPassword">New Password</label>
        <Input
          type="password"
          name="newPassword"
          id="newPassword"
          value={forgotData.newPassword}
          onChange={(e) =>
            setForgotData({ ...forgotData, newPassword: e.target.value })
          }
          className="w-full mt-2 mb-5 bg-transparent border border-primary "
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

export default ForgotPasswordForm;
