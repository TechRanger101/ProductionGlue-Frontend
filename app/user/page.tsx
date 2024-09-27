"use client";
import { MotionDiv } from "@/components/MotionDiv";
import Footer from "@/components/home/Footer";
import UserHero from "@/components/user-private/UserHero";
import ViewYourVenue from "@/components/user-private/ViewYourVenue";
import React from "react";
import { useState, useEffect } from "react";
import Loader from "@/components/Loader";

const UserPage = () => {
  const [pageload, setPageload] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setPageload(false);
    }, 1200);
  }, []);
  return (
    <>
      {pageload ? (
        <Loader />
      ) : (
        <>
          <MotionDiv
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { delay: 0.4, ease: "linear" },
              },
            }}
          >
            <UserHero />
            <ViewYourVenue />
            <Footer bgColor="bg-[#2E6AB3]" />
          </MotionDiv>
        </>
      )}
    </>
  );
};

export default UserPage;
