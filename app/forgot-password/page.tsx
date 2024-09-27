
import Image from "next/image";
import Link from "next/link";
import ForgotPasswordForm from "@/components/forms/ForgotPasswordForm";



const ForgotPassword = () => {
  
  return ( 
    <>
      <section>
        <div className=" overflow-hidden relative w-full min-h-[100svh] flex flex-col gap-16 items-center justify-center   pt-5 px-16 max-md:px-8 max-md:max-w-full ">
          <Image
            src="/bgimages/Send-invite-bg3.png"
            layout="fill"
            className="absolute h-full w-full object-cover object-center inset-0"
            alt=""
          />

          <div className=" flex justify-center  relative ">
            <div className="w-fit max-lg:w-[98%] max-sm:w-3/4">
              <div className="sm:mb-28 sm:mt-24 mb-12 mt-8 flex justify-center ">
                <Link href="/">
                  <Image src="/logo.svg" width={190} height={40} alt="logo" />
                </Link>
              </div>
              <div className="text-zinc-900 text-xl md:font-semibold  lg:text-3xl md:text-4xl font-medium grow whitespace-nowrap">
                Forgot Password ?
              </div>
              <p className="text-gray-500 mt-6 lg:text-xl md:text-base text-sm ">
                Enter your email address and new password to reset your
              </p>
              <ForgotPasswordForm />
            </div>
          </div>
          <div className="relative flex justify-center">
            <p className="text-gray-500 mt-6 text-sm  lg:text-base  mb-14 ">
              © 2023 productionglue. All rights reserved.
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default ForgotPassword;
