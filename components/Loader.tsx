"use client";
import React from "react";
import { motion } from "framer-motion";

const draw = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: (i: number) => {
    const delay =  i * 0.5;
    return {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { delay, type: "spring", duration: 1, bounce: 0 },
        opacity: { delay, duration: 0.03 },
      },
    };
  },
};

const Loader = () => {
  return (
    <>
      <div className="w-full bg-white/90 h-screen flex items-center justify-center">
        {/* <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-800"></div> */}

        <motion.svg
          initial="hidden"
          animate="visible"
          width="271"
          height="369"
          viewBox="0 0 271 369"
          xmlns="http://www.w3.org/2000/svg"
          className="homedropsvg"
          //   style="opacity:1;transform:scale(.9)"
          style={{ opacity: 1, transform: "scale(.9)" }}
        >
          <defs>
            <linearGradient
              x1="-6.719%"
              y1="47.895%"
              x2="106.718%"
              y2="47.895%"
              id="a"
            >
              <stop stopColor="#1E398C" offset="0%" />
              <stop stopColor="#3069B2" offset="100%" />
            </linearGradient>
            <linearGradient
              x1="-7.144%"
              y1="47.766%"
              x2="107.149%"
              y2="47.766%"
              id="b"
            >
              <stop stopColor="#3069B2" offset="0%" />
              <stop stopColor="#1E398C" offset="100%" />
            </linearGradient>
          </defs>

          <g fill="none" fillRule="evenodd">
            <motion.path
              d="M118.77 323.82c-91.63 0-147-95.15-103.87-162.06L118.77.61l103.12 161.15c48.5 75.79-18.67 162.06-103.12 162.06Z"
              stroke="url(#a)"
              strokeWidth="32"
              strokeDasharray="852.266"
              //   style="stroke-dashoffset:0"
              transform="translate(16 29)"
              style={{ strokeDashoffset: 0 }}
              variants={draw}
              custom={0.05}
            />
            <motion.path
              d="M118.85 296.88c-70 0-112.26-72.26-79.33-123.08l79.33-122.39 78.74 122.39c37.04 57.56-14.25 123.08-78.74 123.08Z"
              stroke="url(#b)"
              strokeWidth="26"
              strokeDasharray="648.595"
              //   style="stroke-dashoffset:0"
              transform="translate(16 29)"
              style={{ strokeDashoffset: 0 }}
              variants={draw}
              custom={0.1}
            />
          </g>
        </motion.svg>
      </div>
    </>
  );
};

export default Loader;


