"use client";
import React from "react";
import { useCycle } from "framer-motion";
import MobileMenu from "@/components/MobileMenu";
import Link from "next/link";
import Image from "next/image";

const ProfileMenu = (
  { pageName }: { pageName?: boolean },
) => {
  const [isOpen, toggleOpen] = useCycle(false, true);
  return (
    <>
      <div className="py-3 md:hidden justify-between items-center self-stretch  flex gap-5  max-md:max-w-full max-md:flex-wrap max-md:px-5">
        <Link href="/">
          <Image src="/logo.svg" width={190} height={40} alt="logo" />
        </Link>
        <div>
          <button onClick={() => toggleOpen()}>
            <svg width="23" height="23" viewBox="0 0 23 23">
              <path
                fill="transparent"
                strokeWidth="3"
                stroke="#2E6AB3"
                strokeLinecap="round"
                d="M 2 2.5 L 12 2.5"
              ></path>
              <path
                fill="transparent"
                strokeWidth="3"
                stroke="#2E6AB3"
                strokeLinecap="round"
                d="M 2 9.423 L 20 9.423"
                opacity="1"
              ></path>
              <path
                fill="transparent"
                strokeWidth="3"
                stroke="#2E6AB3"
                strokeLinecap="round"
                d="M 10 16.346 L 20 16.346"
              ></path>
            </svg>
          </button>
        </div>
      </div>

      <MobileMenu
        pageName={pageName? "Dashboard": "LandingPage"}
        isOpen={isOpen}
        toggleOpen={toggleOpen}
      />
    </>
  );
};

export default ProfileMenu;
