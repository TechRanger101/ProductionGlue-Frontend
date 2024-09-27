"use client";
import React, { useRef, useEffect } from "react";
import { useInView } from "framer-motion";
import { MotionDiv } from "../MotionDiv";
import VenueCard from "../home/VenueCard";

const UserPrivateCards = ({ data }: { data: any[] }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    // console.log(data); 
  }, [data]);

  return (
    <>
      <div
        ref={ref}
        className="grid w-[93%] mx-auto relative grid-cols-1 md:grid-cols-2 mt-12 xl:grid-cols-3 gap-14 xl:gap-16 max-md:gap-0 max-md:grid-cols-1 max-md:items-stretch max-md:mt-10 "
      >
        {data && data.length > 0 && data
          .map((venue, i) => (
            <MotionDiv
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.4 }}
            >
            <VenueCard venue={venue} privateV={true}/>
            </MotionDiv>
          ))}
      </div>
    </>
  );
};

export default UserPrivateCards;
