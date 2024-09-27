"use client"
import * as React from "react";
import Image from "next/image";
import { MoveRight } from "lucide-react";
import AroundMap from "../google-map/AroundMap";
export default function AroundYou() {
  const [position, setPosition] = React.useState<any>(null)

  React.useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setPosition({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
    });
  }, [position]);

  return (
    <>
      <div className="flex-col bg-gray-200 justify-center items-center overflow-hidden relative flex min-h-[277px]  w-full max-md:max-w-full max-md:px-5">
        <Image
          src="/vendorbg.png"
          layout="fill"
          objectFit="cover"
          objectPosition="center"
          className="absolute h-full w-full object-cover object-center inset-0 opacity-55"
          alt=""
        />

        <div className="relative mx-auto w-[93%] md:pt-28 pt-12 justify-between items-stretch self-stretch flex gap-5  max-md:max-w-full max-md:flex-wrap max-md:pr-5">
          <div className="justify-between items-center flex gap-5 max-md:max-w-full max-md:flex-wrap">
            <div className="text-zinc-900 text-4xl font-medium grow whitespace-nowrap">
              Around You
            </div>
            <div className="text-zinc-900 text-center text-base font-medium leading-6 whitespace-nowrap justify-center items-stretch border border-[color:var(--gray-200,#E4E4E7)] backdrop-blur-[7px] bg-white bg-opacity-60 grow mt-3 px-3.5 py-2 rounded-[60px] border-solid self-start">
              Discover venue & vendor around you
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-b from-gray-100 to-white/85 pb-20">
        <div className="mb-20 flex  justify-center mx-auto w-[93%] ">
          <div className="px-20 max-md:px-5 py-14 w-full bg-primary rounded-2xl">
            <h3 className="text-3xl text-white font-bold mb-4">
              Get to know the top venues and vendors around you
            </h3>
            <p className="text-lg text-white font-normal mb-4">
              For more insight to venues and vendors around you click the link
              below to search based on your choice and requirements
            </p>
            <div className="justify-center mb-16 items-stretch bg-white hover:opacity-70 cursor-pointer flex w-fit flex-col mt-5 px-7 py-2 rounded-[60px] border-[1.5px] border-solid border-white max-md:px-5">
              <span className="justify-between items-stretch flex gap-2.5">
                <div className="text-primary text-right text-sm font-bold leading-5 grow whitespace-nowrap">
                  Discover
                </div>

                <div className="flex-grow">
                  <MoveRight size={24} className="text-primary" />
                </div>
              </span>
            </div>
          <AroundMap position={position} />
          </div>
        </div>
      </div>
    </>
  );
}
