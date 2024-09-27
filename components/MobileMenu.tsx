"use client";

import React, { Fragment, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  Home,
  LogOut,
  Bookmark,
  MapPin,
  MoveRight,
  PenSquare,
  Plus,
  Search,
  Store,
  User, 
} from "lucide-react";
import { cn } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";

type Props = {
  pageName: "LandingPage" | "Dashboard" | "Admin" | "Users";
  isOpen: boolean;
  toggleOpen: () => void;
  isAdmin?: boolean
}; 

const MobileMenu = ({ pageName, isOpen, toggleOpen ,isAdmin}: Props) => {
  const menuVariants = {
    initial: {
      scaleX: 0,
    },
    animate: {
      scaleX: 1,
      transition: {
        duration: 0.4,
        ease: [0.12, 0, 0.39, 0],
      },
    },
    exit: {
      scaleX: 0,
      transition: {
        duration: 0.4,
        ease: [0.22, 0, 0.36, 1],
      },
    },
  };

  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (isOpen) {
      toggleOpen();
    }
    // console.log(pathname);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);
  return (
    <Fragment>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={menuVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="fixed top-0 left-0 w-full origin-left bg-white h-screen px-6 inset-0 z-50 "
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{
                opacity: 1,
                transition: {
                  delay: 0.4,
                  duration: 0.5,
                },
              }}
              exit={{
                opacity: 0,
                transition: {
                  duration: 0.3,
                },
              }}
              className="flex pt-8 px-4 justify-between items-center w-full "
            >
              <div>
                <Link href="/">
                  <Image src="/logo.svg" width={190} height={40} alt="logo" />
                </Link>
              </div>
              <div>
                <button onClick={() => toggleOpen()}>
                  <svg width="23" height="23" viewBox="0 0 23 23">
                    <path
                      fill="transparent"
                      strokeWidth="3"
                      stroke="#2E6AB3"
                      strokeLinecap="round"
                      d="M 3 16.5 L 17 2.5"
                    ></path>
                    <path
                      fill="transparent"
                      strokeWidth="3"
                      stroke="#2E6AB3"
                      strokeLinecap="round"
                      d="M 2 9.423 L 20 9.423"
                      opacity="0"
                    ></path>
                    <path
                      fill="transparent"
                      strokeWidth="3"
                      stroke="#2E6AB3"
                      strokeLinecap="round"
                      d="M 3 2.5 L 17 16.346"
                    ></path>
                  </svg>
                </button>
              </div>
            </motion.div>
            <div
              className={cn(
                "flex pt-64 flex-col gap-8  px-4 h-full",
                pageName === "Dashboard" && "pt-32"
              )}
            >
              {pageName === "LandingPage" ? (
                <>
                
                  {
                    isAdmin ? (<>
                      <Link href="/send-invite">
                    <motion.div
                      initial={{
                        translateX: -100,
                      }}
                      animate={{
                        translateX: 0,
                        transition: {
                          delay: 0.3,
                          duration: 0.4,
                        },
                      }}
                      exit={{
                        translateX: -100,
                        transition: {
                          duration: 0.3,
                        },
                      }}
                      className="w-full py-3 font-normal flex justify-center text-gray-500 border border-solid border-[#2E6AB3] rounded-md"
                    >
                      Invite Someone{" "}
                      <MoveRight
                        className="ml-2 text-gray-500 inline-flex"
                        strokeWidth={1}
                      />
                    </motion.div>
                  </Link>
                  <Link href="/dashboard">
                    <motion.div
                      initial={{
                        translateX: -100,
                      }}
                      animate={{
                        translateX: 0,
                        transition: {
                          delay: 0.4,
                          duration: 0.4,
                        },
                      }}
                      exit={{
                        translateX: -100,
                        transition: {
                          duration: 0.4,
                        },
                      }}
                      className="w-full py-3 font-normal flex justify-center text-gray-500 border border-solid border-[#2E6AB3] rounded-md"
                    >
                      Dashboard{" "}
                     
                    </motion.div>
                  </Link>
                  <Link href="/admin">
                    <motion.div
                      initial={{
                        translateX: -100,
                      }}
                      animate={{
                        translateX: 0,
                        transition: {
                          delay: 0.5,
                          duration: 0.4,
                        },
                      }}
                      exit={{
                        translateX: -100,
                        transition: {
                          duration: 0.4,
                        },
                      }}
                      className="w-full py-3 font-normal flex justify-center text-gray-500 border border-solid border-[#2E6AB3] rounded-md"
                    >
                      Admin{" "}
                     
                    </motion.div>
                  </Link>
                  <Link href="/admin/history">
                    <motion.div
                      initial={{
                        translateX: -100,
                      }}
                      animate={{
                        translateX: 0,
                        transition: {
                          delay: 0.6,
                          duration: 0.4,
                        },
                      }}
                      exit={{
                        translateX: -100,
                        transition: {
                          duration: 0.4,
                        },
                      }}
                      className="w-full py-3 font-normal flex justify-center text-gray-500 border border-solid border-[#2E6AB3] rounded-md"
                    >
                      History{" "}
                     
                    </motion.div>
                  </Link>
                  
                     </>) : (<>
                      <Link href="/user">
                    <motion.div
                      initial={{
                        translateX: -100,
                      }}
                      animate={{
                        translateX: 0,
                        transition: {
                          delay: 0.3,
                          duration: 0.4,
                        },
                      }}
                      exit={{
                        translateX: -100,
                        transition: {
                          duration: 0.3,
                        },
                      }}
                      className="w-full py-3 font-normal flex justify-center text-gray-500 border border-solid border-[#2E6AB3] rounded-md"
                    >
                      Dashboard{" "}
                     
                    </motion.div>
                  </Link>
                  <Link href="/user/profile">
                    <motion.div
                      initial={{
                        translateX: -100,
                      }}
                      animate={{
                        translateX: 0,
                        transition: {
                          delay: 0.4,
                          duration: 0.4,
                        },
                      }}
                      exit={{
                        translateX: -100,
                        transition: {
                          duration: 0.4,
                        },
                      }}
                      className="w-full py-3 font-normal flex justify-center text-gray-500 border border-solid border-[#2E6AB3] rounded-md"
                    >
                      Profile{" "}
                     
                    </motion.div>
                  </Link>
                  <Link href="/user/saved">
                    <motion.div
                      initial={{
                        translateX: -100,
                      }}
                      animate={{
                        translateX: 0,
                        transition: {
                          delay: 0.5,
                          duration: 0.4,
                        },
                      }}
                      exit={{
                        translateX: -100,
                        transition: {
                          duration: 0.4,
                        },
                      }}
                      className="w-full py-3 font-normal flex justify-center text-gray-500 border border-solid border-[#2E6AB3] rounded-md"
                    >
                      Saved{" "}
                     
                    </motion.div>
                  </Link>
                      </>)
                  }
                
                
                </>
              ) : pageName === "Dashboard" ? (
                <>
                  <div className="flex flex-col gap-3">
                    <motion.div
                      initial={{
                        translateX: -100,
                      }}
                      animate={{
                        translateX: 0,
                        transition: {
                          delay: 0.3,
                          duration: 0.4,
                        },
                      }}
                      exit={{
                        translateX: -100,
                        transition: {
                          duration: 0.3,
                        },
                      }}
                      className="w-full font-normal flex gap-8 text-xs "
                    >
                      <Link
                        href="/dashboard"
                        className="flex items-center w-1/2 py-2 justify-center text-gray-500 border border-solid border-[#2E6AB3] rounded-md"
                      >
                        Overview{" "}
                        <Home
                          className="ml-0.5 text-gray-800 inline-flex"
                          strokeWidth={1}
                          size={14}
                        />
                      </Link>
                      <Link
                        href="/dashboard/venue"
                        className="flex items-center w-1/2 py-2 justify-center text-gray-500 border border-solid border-[#2E6AB3] rounded-md"
                      >
                        Venue{" "}
                        <MapPin
                          className="ml-0.5 text-gray-800 inline-flex"
                          strokeWidth={1}
                          size={14}
                        />
                      </Link>
                    </motion.div>
                    <motion.div
                      initial={{
                        translateX: -100,
                      }}
                      animate={{
                        translateX: 0,
                        transition: {
                          delay: 0.4,
                          duration: 0.5,
                        },
                      }}
                      exit={{
                        translateX: -100,
                        transition: {
                          duration: 0.4,
                        },
                      }}
                      className="w-full font-normal flex gap-8 text-xs "
                    >
                      <Link
                        href="/dashboard/vendors"
                        className="flex items-center w-1/2 py-2 justify-center text-gray-500 border border-solid border-[#2E6AB3] rounded-md"
                      >
                        Vendors{" "}
                        <Store
                          className="ml-0.5 text-gray-800 inline-flex"
                          strokeWidth={1}
                          size={14}
                        />
                      </Link>
                      <Link
                        href="/dashboard/users"
                        className="flex items-center w-1/2 py-2 justify-center text-gray-500 border border-solid border-[#2E6AB3] rounded-md"
                      >
                        Users{" "}
                        <User
                          className="ml-0.5 text-gray-800 inline-flex"
                          strokeWidth={1}
                          size={14}
                        />
                      </Link>
                    </motion.div>
                    <div className="my-2" />
                    <motion.div
                      initial={{
                        translateX: -100,
                      }}
                      animate={{
                        translateX: 0,
                        transition: {
                          delay: 0.5,
                          duration: 0.6,
                        },
                      }}
                      exit={{
                        translateX: -100,
                        transition: {
                          duration: 0.5,
                        },
                      }}
                      className="w-full font-normal flex gap-8 text-xs "
                    >
                      <Link
                        href="/dashboard/add"
                        className="flex items-center w-1/2 py-2 justify-center text-gray-500 border border-solid border-[#2E6AB3] rounded-md"
                      >
                        Add{" "}
                        <Plus
                          className="ml-0.5 text-gray-800 inline-flex"
                          strokeWidth={1}
                          size={14}
                        />
                      </Link>
                      <Link
                        href="/dashboard/edit"
                        className="flex items-center w-1/2 py-2 justify-center text-gray-500 border border-solid border-[#2E6AB3] rounded-md"
                      >
                        Edit{" "}
                        <PenSquare
                          className="ml-0.5 text-gray-800 inline-flex"
                          strokeWidth={1}
                          size={14}
                        />
                      </Link>
                    </motion.div>
                    <motion.div
                      initial={{
                        translateX: -100,
                      }}
                      animate={{
                        translateX: 0,
                        transition: {
                          delay: 0.6,
                          duration: 0.6,
                        },
                      }}
                      exit={{
                        translateX: -100,
                        transition: {
                          duration: 0.6,
                        },
                      }}
                      className="w-full font-normal flex gap-8 text-xs "
                    >
                      <Link
                        href="/"
                        className="flex items-center w-1/2 py-2 justify-center text-gray-500 border border-solid border-[#2E6AB3] rounded-md"
                      >
                        Go to Website{" "}
                        <LogOut
                          className="ml-0.5 text-gray-800 inline-flex"
                          strokeWidth={1}
                          size={14}
                        />
                      </Link>
                      <div className="flex items-center w-1/2 py-2 justify-center text-gray-500 border border-solid border-[#2E6AB3] rounded-md">
                        Search{" "}
                        <Search
                          className="ml-0.5 text-gray-800 inline-flex"
                          strokeWidth={1}
                          size={14}
                        />
                      </div>
                    </motion.div>
                  </div>
                </>
              ) : pageName === "Admin" ? (
                <motion.div
                  initial={{
                    translateX: -100,
                  }}
                  animate={{
                    translateX: 0,
                    transition: {
                      delay: 0.3,
                      duration: 0.4,
                    },
                  }}
                  exit={{
                    translateX: -100,
                    transition: {
                      duration: 0.3,
                    },
                  }}
                  className="w-full py-3 font-normal flex justify-center text-gray-500 border border-solid border-[#2E6AB3] rounded-md"
                >
                  <Link href="/admin">Admin</Link>
                </motion.div>
              ) : pageName === "Users" ? (
                <>
                  <motion.div
                    initial={{
                      translateX: -100,
                    }}
                    animate={{
                      translateX: 0,
                      transition: {
                        delay: 0.3,
                        duration: 0.4,
                      },
                    }}
                    exit={{
                      translateX: -100,
                      transition: {
                        duration: 0.3,
                      },
                    }}
                    className="w-full py-3 font-normal flex justify-center text-gray-500 border border-solid border-[#2E6AB3] rounded-md"
                  >
                    <Link href="/user">Users</Link>
                  </motion.div>
                  <motion.div
                    initial={{ translateX: -100 }}
                    animate={{
                      translateX: 0,
                      transition: {
                        delay: 0.5,
                        duration: 0.5,
                      },
                    }}
                    exit={{
                      translateX: -100,
                      transition: {
                        duration: 0.3,
                      },
                    }}
                  >
                    <Link
                      href="/user/saved"
                      className="w-full py-3 font-normal flex justify-center text-gray-500 border border-solid border-[#2E6AB3] rounded-md"
                    >
                      Saved{" "}
                      <Bookmark
                        fill="#2E6AB3"
                        className="ml-2 text-gray-500 inline-flex"
                      />
                    </Link>
                  </motion.div>{" "}
                </>
              ) : null}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Fragment>
  );
};

export default MobileMenu;
