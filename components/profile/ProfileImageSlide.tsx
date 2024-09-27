"use client";
import React, {  useState } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight, EyeIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import "react-photo-view/dist/react-photo-view.css";
import { PhotoSlider } from "react-photo-view";

type Props = {
  images?: string[];
};

const ProfileImageSlide = ({ images }: Props) => {
  const [visible, setVisible] = useState(false);
  const [index, setIndex] = useState(0);
  const imagesArray = [
    "/logo/logo-white-full.svg",
    "/logo/logo-white-full.svg",
    "/logo/logo-white-full.svg",
    "/logo/logo-white-full.svg",
  ];

  if (!images) {
    images = imagesArray;
  }
  const [image, setImage] = useState<string>(images[0]);

  React.useEffect(() => {
    if(images?.length){
      setImage(images[0]);
    }
    // console.log(image, ' image');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <section>
        <div className="relative">
          <Image
            src={image}
            alt="venue"
            width={840}
            height={560}
            className="rounded-lg 2xl:w-full cursor-pointer 2xl:h-[460px] h-[430px] max-sm:h-[360px] transition-all duration-500 ease-linear hover:opacity-10"
          />

          <div
            onClick={() => {
              setVisible(true);
            }}
            className="absolute top-0 left-0 cursor-pointer right-0 bottom-0 hover:bg-black/40 rounded-lg transition-all duration-300 ease-linear"
          >
            <div className="flex w-full group h-full justify-center items-center ">
              <EyeIcon
                size={48}
                className="text-white group-hover:block hidden "
              />
            </div>
          </div>

          <PhotoSlider
            images={images?.map((item) => ({ src: item, key: item }))}
            visible={visible}
            onClose={() => setVisible(false)}
            index={index}
            onIndexChange={setIndex}
          />
        </div>

        <div className="lg:my-8 my-5 flex justify-center lg:justify-end">
          <div className="flex gap-12">
            <button
              onClick={() => {
                const index = images?.indexOf(image);
                // @ts-ignore
                if (index > 0) {
                  // @ts-ignore
                  setImage(images[index - 1]);
                  // setIndex(index - 1);
                }
              }}
              className="text-gray-600 hover:bg-gray-300 rounded-full border-2 border-solid border-gray-600"
            >
              <ArrowLeft size={28} />
            </button>
            <button
              onClick={() => {
                const index = images?.indexOf(image);
                // @ts-ignore
                if (index < images?.length - 1) {
                  // @ts-ignore
                  setImage(images[index + 1]);
                  
                  // setIndex(index + 1);
                }
              }}
              className="text-gray-600 hover:bg-gray-300 rounded-full border-2 border-solid border-gray-600"
            >
              <ArrowRight size={28} />
            </button>
          </div>
        </div>

        <div
          className={cn(
            "flex gap-x-4 justify-between ",
            images?.length < 4 && "justify-start",
            images?.length>4 && "overflow-x-scroll "
          )}
        >
          {images?.map((img, i) => (
            <div
              key={i}
              onClick={() => setImage(img)}
              className="cursor-pointer "
            >
              <Image
                src={img}
                alt="venue"
                width={140}
                height={140}
                className={cn(
                  "lg:min-w-36 lg:min-h-36 w-24 h-24 max-sm:w-20 max-sm:h-20  rounded-lg grayscale transition-all duration-500 ease-linear hover:grayscale-0",
                  image === img 
                    ? "grayscale-0"
                    : ""
                )}
              />
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default ProfileImageSlide;
