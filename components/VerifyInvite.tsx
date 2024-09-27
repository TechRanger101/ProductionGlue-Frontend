"use client";
import React, { Fragment, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import axios from "axios";

const VerifyInvite = ({ children,AlredyVerified }: { children: React.ReactNode,AlredyVerified?: boolean }) => {
  const [isUserVerified, setIsUserVerified] = useState(true);
  const searchParams = useSearchParams();
  const recipientEmail = searchParams.get("recipientEmail") || "";
  const inviteCode = searchParams.get("inviteCode") || "";
  
  //   console.log(recipientEmail, inviteCode , "recipientEmail com, inviteCode")

  const verifyInvite = async () => {
    try {
      const res = await axios.post("/api/verify-invite", {
        recipientEmail,
        inviteCode,
      });
      const { data } = res;
      console.log(data, "data");
      if (data.isVerified === true) {
        setIsUserVerified(true);
      } else {
        setIsUserVerified(false);
      }
    } catch (error) {
      console.log(error);
      setIsUserVerified(false);
    }
  };

  useEffect(() => {
    if (
      recipientEmail?.includes("@") &&
      recipientEmail?.includes(".") &&
      inviteCode?.length > 0
    ) {
     if(!AlredyVerified){
      verifyInvite();
     } else {
         setIsUserVerified(true)
        //  console.log("AlredyVerified")
     }
    } else {
      setIsUserVerified(false);
    }

    if(AlredyVerified){
        setIsUserVerified(true)
        // console.log("AlredyVerified")
    } 

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [recipientEmail, inviteCode]);



  return (
    <Fragment>
      {isUserVerified ? (
        children
      ) : (
        <div className="flex justify-center font-bold max-md:text-xl items-center h-screen w-screen text-5xl text-primary">
          You are not authorized to view this page
        </div>
      )}
    </Fragment>
  );
};

export default VerifyInvite;
