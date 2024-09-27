"use client";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import React, { useEffect, useState } from "react";

export const ImagesSlider = ({
  images,
  children,
  overlay = true,
  overlayClassName,
  className,
  autoplay = true,
  direction = "up",
}: {
  images: string[];
  children: React.ReactNode;
  overlay?: React.ReactNode;
  overlayClassName?: string;
  className?: string;
  autoplay?: boolean;
  direction?: "up" | "down";
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [loadedImages, setLoadedImages] = useState<string[]>([]);

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex + 1 === images.length ? 0 : prevIndex + 1
    );
  };

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex - 1 < 0 ? images.length - 1 : prevIndex - 1
    );
  };

  useEffect(() => {
    loadImages();
  }, []);

  const loadImages = () => {
    setLoading(true);
    const loadPromises = images.map((image) => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = image;
        img.onload = () => resolve(image);
        img.onerror = reject;
      });
    });

    Promise.all(loadPromises)
      .then((loadedImages) => {
        setLoadedImages(loadedImages as string[]);
        setLoading(false);
      })
      .catch((error) => console.error("Failed to load images", error));
  };
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") {
        handleNext();
      } else if (event.key === "ArrowLeft") {
        handlePrevious();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    // autoplay
    let interval: any;
    if (autoplay) {
      interval = setInterval(() => {
        handleNext();
      }, 5000);
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {}, []);

  // const slideVariants = {
  //   initial: {
  //     // scale: 0,
  //     opacity: 0.95,
  //     // rotateX: 45,
  //     // x: "110%",
  //   },
  //   visible: {
  //     // scale: 1,
  //     // rotateX: 0,
  //     // x: 0,
  //     opacity: 1,
  //     transition: {
  //       duration: 2,
  //       // ease: [0.645, 0.045, 0.355, 1.0],
  //       ease: "easeInOut",
  //     },
  //   },
  //   rightExit: {
  //     opacity: 0,
  //     // x: "150%",
  //     transition: {
  //       // duration: 0.00001,
  //       ease: "easeInOut",
  //     },
  //   },
  // };

  const areImagesLoaded = loadedImages.length > 0;

  return (
    <div
      className={cn(
        "overflow-hidden h-full w-full bg-black/90  relative flex items-end justify-center",
        className
      )}
      style={{
        perspective: "1000px",
      }}
    >
      {areImagesLoaded && children}
      {areImagesLoaded && overlay && (
        <div
          className={cn("absolute inset-0 bg-blue-700/20 z-40", overlayClassName,
          // currentIndex === 0 && "bg-[#372271]/20",
          // currentIndex === 1 && "bg-[#372271]/30",
    )}
        />
      )}

      {areImagesLoaded && (
        <AnimatePresence>
          <motion.img
            key={currentIndex}
            src={loadedImages[currentIndex]}
            // initial="initial"
            // animate="visible"
            // // exit={direction === "up" ? "upExit" : "downExit"}
            // exit="leftExit"
            // variants={slideVariants}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2, ease: "easeInOut" }}
            className="image h-full w-full absolute inset-0 transition-opacity duration-300 ease-in-out object-cover object-center"
          />
        </AnimatePresence>
      )}
    </div>
  );
};
