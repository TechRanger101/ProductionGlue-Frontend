"use client"
import { MotionDiv } from "@/components/MotionDiv";
import AddVenueVendor from "@/components/admin/AddVenueVendor";
import AdminHero from "@/components/admin/AdminHero";
import Footer from "@/components/home/Footer";
import React from "react";
import { useState, useEffect } from "react";
import Loader from "@/components/Loader";

const Admin = () => {
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
                transition: { delay: 0.6, ease: "linear" },
              },
            }}
          >
            <AdminHero />
            <AddVenueVendor />
            <Footer bgColor="bg-[#2E6AB3]" />
          </MotionDiv>
        </>
      )}
    </>
  );
};

export default Admin;
