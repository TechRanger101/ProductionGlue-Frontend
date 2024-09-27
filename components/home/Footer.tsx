import * as React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Facebook, Instagram, Twitter } from "lucide-react";
import Link from "next/link";
import { NewLogo } from "./Header";

export default function Footer({ bgColor }: { bgColor?: string }) {
  return (
    <div
      className={cn(
        "flex-col overflow-hidden relative flex min-h-[310px]   items-stretch  py-12 max-md:max-w-full max-md:px-5",
        bgColor && bgColor
      )}
    >
      {bgColor ? (
        ""
      ) : (
        <>
          {" "}
          <Image
            src="/footbg.png"
            layout="fill"
            className="absolute h-full w-full object-cover object-center inset-0"
            alt=""
          />
        </>
      )}

      <div className="relative items-stretch flex justify-center md:justify-between gap-5 mt-6 mx-auto w-[93%] max-md:max-w-full max-md:flex-wrap max-md:pr-5">
        {/* <Image
          src={bgColor ? "/logo-white.svg" : "/logo.svg"}
          width={280}
          height={20}
          alt="logo"
          className={cn(bgColor && "w-44 h-10",
          "3xl:aspect-[3/1] 2xl:w-auto 2xl:h-auto")}
        /> */}

        <NewLogo
          width={190}
          height={36}
          className="h-9 3xl:aspect-[3/1] 3xl:h-14"
          color={bgColor ? "white" : "#a6a8ab"}
        />

        {/* <div
          className={cn(
            "text-zinc-600 flex justify-center text-center text-sm grow shrink basis-auto  max-md:max-w-full",
            bgColor && "text-white"
          )}
        >
          <p className="lg:w-1/2 w-4/5 3xl:text-2xl 2xl:w-2/3 2xl:text-lg">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
            dictum aliquet accumsan porta lectus ridiculus in mattis. Netus
            sodales in volutpat ullamcorper amet adipiscing fermentum.
          </p>
        </div> */}

        <div className="flex gap-8 items-center">
          <Link href="https://twitter.com/productionglue" target="_blank">
            <Twitter
              className={cn(bgColor && "text-white", "3xl:w-10 3xl:h-auto")}
            />
          </Link>
          <Link
            href="https://www.facebook.com/productiongluellc/"
            target="_blank"
          >
            <Facebook
              className={cn(bgColor && "text-white", "3xl:w-10 3xl:h-auto")}
            />
          </Link>
          <Link
            href="https://www.instagram.com/productionglue/"
            target="_blank"
          >
            <Instagram
              className={cn(bgColor && "text-white", "3xl:w-10 3xl:h-auto")}
            />
          </Link>
        </div>
      </div>
      <div
        className={cn(
          "relative border-t text-zinc-600 text-center text-sm whitespace-nowrap items-center mt-16 mb-6 pt-5 px-16 max-md:max-w-full max-md:mt-10 max-md:px-5",
          bgColor && "text-white"
        )}
      >
        © 2023 productionglue. All rights reserved.
      </div>
    </div>
  );
}
