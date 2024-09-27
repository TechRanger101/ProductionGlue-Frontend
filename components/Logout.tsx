"use client";
import React from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const Logout = () => {
  const router = useRouter();
  const logout = async () => {
    try {
      await axios.post("/api/logout");
      toast.success("Logged out Successfully");
      setTimeout(() => {
        // router.push("/sign-in");
      }, 1000);
    } catch (error) {
      toast.error(
        "An error occurred while logging out. Please try again later."
      );
    }
  };
  return (
    <>
      <button
        onClick={logout}
        className="bg-[#2E6AB3] text-white rounded-xl  px-4 hover:opacity-80 py-2 text-xs md:text-base font-medium leading-6"
      >
        Logout
      </button>
    </>
  );
};

export default Logout;
