"use client";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import Chatbot from "../Chatbot";
import { cn } from "@/lib/utils";
import Image from "next/image";

type Props = {
  isOpen: boolean;
  toggleOpen: () => void;
  closeChatbot: () => void;
  className?: string;
  hidebutton?: boolean; 
};

const Chatbotbox = ({
  isOpen,
  toggleOpen,
  closeChatbot,
  className,
  hidebutton,
}: Props) => {
  const chatVariants = {
    initial: {
      // scaleX: 0,
      x: 60,
    },
    animate: {
      // scaleX: 1,
      x: 0,
      transition: {
        duration: 0.4,
        ease: [0.12, 0, 0.39, 0],
      },
    },
    exit: {
      //   scaleX: 0,
      x: 60,
      transition: {
        duration: 0.4,
        ease: [0.22, 0, 0.36, 1],
      },
    },
  };
  return (
    <>
      <div className="w-full h-full relative">
        <AnimatePresence>
          {isOpen && (
            <motion.div
              variants={chatVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className={cn(
                "fixed bottom-[12%] flex justify-end right-[1%] w-full origin-right z-[3000]",
                className
              )}
            >
              <Chatbot closeChatbot={closeChatbot} />
            </motion.div>
          )}
        </AnimatePresence>
        {hidebutton ? null : (
          <div
            onClick={() => toggleOpen()}
            className="fixed cursor-pointer justify-end z-20 items-stretch flex gap-2.5 md:mt-5 top-auto bottom-[4%] right-[1%]"
          >
            <Image
              src="/logo-chat.png"
              width={60}
              height={60}
              alt="gluey"
              quality={80}
            />
            <div className="text-white max-lg:hidden  text-center text-base font-medium leading-6 whitespace-nowrap justify-center items-stretch border border-[color:var(--gray-200,#E4E4E7)] backdrop-blur-[7px] bg-[#2E6AB3] self-center  my-auto px-3.5 py-2 rounded-[60px] border-solid">
              Chat With Gluey
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Chatbotbox;
