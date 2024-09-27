"use client";
import { motion } from "framer-motion";
import React from "react";
import { ImagesSlider } from "@/components/ui/image-slider";

export default function HeroSlider(
    {children}: {children: React.ReactNode}
) {
  const images = [
    "/bgimages/hero-t-1.jpeg",
    "/bgimages/hero-t-2.jpeg",
    "/hero.png"
  ];
  return (
    <ImagesSlider className="min-h-screen" images={images}

    >
    {children}
    </ImagesSlider>
  );
}
