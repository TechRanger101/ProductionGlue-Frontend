"use client";
import React from "react";
import AroundYou from "@/components/home/AroundYou";
import DiscoverMatch from "@/components/home/DiscoverMatch";
import Footer from "@/components/home/Footer";
import Hero from "@/components/home/Hero";
import { useState, useEffect } from "react";
import Loader from "@/components/Loader";
import { motion, useCycle } from "framer-motion";
import TopVenues from "../home-new/TopVenues";
import Carousel from "../home-new/Carousel";
import TopVendors from "../home-new/TopVendors";
import { useRouter } from "next/navigation";
import ChatAi from "./ChatAi";

const LandingPage = ({
  isAdmin,
  userLoggedIn,
}: {
  isAdmin: boolean;
  userLoggedIn: boolean;
}) => {
  const [pageload, setPageload] = useState(true);
  const router = useRouter();

  const getUserLocation = async () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        // console.log(position.coords, "position");

        if (
          position.coords.latitude !== null &&
          position.coords.longitude !== null
        ) {
          localStorage.setItem("latitude", position.coords.latitude.toString());
          localStorage.setItem(
            "longitude",
            position.coords.longitude.toString()
          );
          // latitude longitude
        }
      },
      (error) => {
        console.log(error, "error");
      }
    );
  };

  useEffect(() => {
    localStorage.setItem("isAdmin", `${isAdmin}`);

    if (!userLoggedIn) {
      router.push("/sign-in");
    }
  }, [userLoggedIn]);

  useEffect(() => {
    // getUserLocation();
    if (userLoggedIn) {
      getUserLocation();
    }
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setPageload(false);
    }, 1200);
  }, []);
  return (
    <>
      <main className="transition-all duration-300 ease-linear scroll-smooth">
        {pageload ? (
          <Loader />
        ) : (
          <>
            <motion.div
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
              <Hero isAdmin={isAdmin} />
              <TopVenues />
              <Carousel />
              <TopVendors />
              <AroundYou />
              <DiscoverMatch isAdmin={isAdmin} />
              <Footer />
             
              <ChatAi isChat={false} isExpandedCheck={false} />
            </motion.div>
          </>
        )}
      </main>
    </>
  );
};

export default LandingPage;
