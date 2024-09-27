"use client";
import Link from "next/link";
import Image from "next/image";
import { Search } from "lucide-react";
import MobileMenu from "@/components/MobileMenu";
import { useCycle } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { NewLogo } from "../home/Header";
const DashboardHeader = ({ isAdminV }: { isAdminV: boolean }) => {
  const [isOpen, toggleOpen] = useCycle(false, true);
  const router = useRouter();

  useEffect(() => {
    if (!isAdminV) {
      router.push("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <header className="relative  lg:h-16 3xl:h-20">
        <div className="px-16 3xl:h-20 2xl:items-center fixed bg-white z-10 w-full hidden max-lg:w-full py-3 max-md:px-5 max-lg:px-10 lg:flex border-b border-[#B2C2D9] border-solid">
          <div className=" lg:w-1/5">
            <Link href="/">
              {/* <Image
                src="/logo.svg"
                width={190}
                height={40}
                alt="logo"
                className="max-lg:w-28 max-lg:h-6 3xl:aspect-[270/76]"
              /> */}
             <NewLogo
              width={190}
              height={36}
              className="h-9 3xl:aspect-[3/1] 3xl:h-14"
              color="#a6a8ab"
            />
            </Link>
          </div>
          <div className=" lg:w-3/5  pl-10">
            <div className="relative hidden">
              <div className="absolute left-3 top-3">
                <Search size={16} className="text-inputBorder" />
              </div>
              <input
                type="text"
                className="h-10 lg:w-[600px] md:w-[400px] rounded-lg border border-[#B2C2D9] px-3 py-2 pl-12 text-sm text-[#334155] focus:outline-none"
                placeholder="Type to search"
              />
            </div>
          </div>
        </div>
      </header>
      <div className=" relative">
        <div className="py-5 lg:hidden justify-between items-baseline self-stretch  flex gap-5  max-lg:max-w-full max- lg:flex-wrap max-md:px-5 max-lg:px-10">
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
          pageName="Dashboard"
          isOpen={isOpen}
          toggleOpen={toggleOpen}
        />
      </div>
    </>
  );
};

export default DashboardHeader;
