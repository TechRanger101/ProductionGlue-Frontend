"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { MoveRight } from "lucide-react";

type Slide = {
  image: string;
};

type AutoplaySliderProps = {
  slides?: Slide[];
  autoplayInterval?: number;
};

const slides: Slide[] = [
  {
    image: "/venue/carousel-1.png",
  },
  {
    image: "/venue/carousel-2.png",
  },
  {
    image: "/venue/carousel-3.png",
  },
  {
    image: "/venue/carousel-4.png",
  },
];

const Carousel = ({
  //   slides,
  autoplayInterval = 4000,
}: AutoplaySliderProps) => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => {
        if (prevIndex === slides.length - 1) {
          return 0;
        }
        return prevIndex + 1;
      });
    }, autoplayInterval);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoplayInterval, slides.length]);

  return (
    <>
      <div className="flex-col justify-center items-center overflow-hidden relative flex  max-md:max-w-full lg:py-28">
        <Image
          src="/bgimages/top-venue.png"
          layout="fill"
          className="absolute h-full w-full object-cover object-center inset-0 opacity-50"
          alt=""
        />

        <div className="relative w-[93%] mx-auto  pt-14 pb-10 max-md:max-w-full ">
          <div className="relative h-[780px]">
            {slides.map((slide, index) => (
              <div
                key={index}
                className={`${
                  index === activeIndex ? "opacity-100" : "opacity-0"
                } absolute w-full transition-opacity duration-1000`}
              >
                <CarouselItem
                  index={index}
                  setActiveIndex={setActiveIndex}
                  activeIndex={activeIndex}
                  image={slide.image}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Carousel;

const CarouselItem = ({
  index,
  setActiveIndex,
  activeIndex,
  image,
}: {
  index: number;
  setActiveIndex: any;
  activeIndex: number;
  image: string;
}) => {
  return (
    <div>
      <div className="flex-col overflow-hidden relative flex min-h-[789px] w-full items-center pt-12 pb-7 px-16 max-md:max-w-full max-md:px-5">
      
        {/* <Image
          loading="lazy"
          layout="fill"
          // width={1318}
          // height={789}
          src={image}
          className="absolute rounded-3xl h-full w-full object-cover object-center inset-0"
          alt="Carousel Image"
        /> */}
        <img src={image} alt="Carousel Image" className="absolute rounded-3xl h-full w-full object-cover object-center inset-0" />

        <div className="relative flex w-full flex-col items-stretch mt-9 max-md:max-w-full">
          <div className="justify-between lg:w-[90%] lg:mx-auto  items-stretch flex w-full gap-5 max-md:max-w-full max-md:flex-wrap">
            <div className="justify-center items-stretch  flex flex-col max-md:max-w-full">
              <h1 className="text-white text-4xl 3xl:text-6xl font-bold max-md:max-w-full">
                Great <br /> experiences await you
              </h1>
              <p className="text-white 2xl:text-2xl text-base font-medium mt-5 max-md:max-w-full">
                Dive into a world of great experience through venues and vendor{" "}
                <br />
                nearby
              </p>
            </div>

            <div className="justify-center inline-flex items-center border cursor-pointer gap-2.5 mt-28 px-6 py-2 rounded-3xl border-solid border-white self-end max-md:mt-10">
              <div className="text-white text-2xl font-medium grow whitespace-nowrap">
                Discover
              </div>
              <MoveRight className="text-white" />
            </div>
          </div>

          <div className="items-stretch max-md:mt-[20rem] self-center flex gap-2.5 mt-[506px]">
            {slides.map((_, index) => (
              <button
                key={index}
                className={`p-1 rounded-full  duration-300  ${
                  index === activeIndex ? "bg-gray-300 px-3.5 " : "bg-gray-300"
                }`}
                onClick={() => setActiveIndex(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
