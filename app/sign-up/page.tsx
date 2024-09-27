import SignUp from "@/components/auth/SignUp";
import Image from "next/image";
import Link from "next/link";
import { cookies } from "next/headers";
import VerifyInvite from "@/components/VerifyInvite";
const SignIn = () => {
  const cookieStore = cookies();
  const isVerified = cookieStore.get("isVerified")?.value;
  let AlredyVerified: boolean =
    isVerified === undefined ? false : isVerified === "true" ? true : false;
  // console.log(isVerified, "isVerified ",AlredyVerified) 

  let isAdmin: boolean =
    cookieStore.get("userRole")?.value === "admin" ? true : false;
  return (
    <>
      <VerifyInvite AlredyVerified={AlredyVerified}>
        <section>
          <div className="flex w-full h-screen">
            <div className="2xl:w-3/5 lg:w-2/3 max-lg:hidden">
              <Image
                src="/auth-images/sign-up.jpeg"
                width={500}
                height={500}
                alt="SignIn"
                className="w-full h-full object-fill object-center"
              />
            </div>
            <div className="lg:w-3/5 w-full  overflow-y-auto"
             style={{
              background: "url(/bgimages/Send-invite-bg3.png)",
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
            >
              <div
                className="max-lg:h-full relative w-full h-full px-8 max-md:max-w-full max-md:px-5"
                // style={{
                //   minHeight: "inherit",
                // }}
              >
                {/* <Image
                  src="/bgimages/Send-invite-bg3.png"
                  layout="fill"
                  className="absolute h-full w-full object-cover object-center inset-0"
                  alt="Sign Up"
                  placeholder="blur"
                  blurDataURL="/bgimages/Send-invite-bg3.png"
                /> */}

                <div className="flex py-4 flex-col w-full justify-between items-center  relative h-full lg:h-full lg:min-h-screen">
                  <div className=" 2xl:mt-5 lg:mt-3  my-12 lg:mb-0 ">
                    <Link href="/">
                      <Image
                        src="/logo.svg"
                        width={190}
                        height={40}
                        alt="logo"
                      />
                    </Link>
                  </div>
                  <SignUp />
                  <div className=" max-lg:w-auto border-none bottom-0 pt-4 2xl:border-t border-gray-500 w-96 md:w-[500px] text-center  2xl:border-solid">
                    <p className="text-gray-500 text-sm  lg:text-base  mb-5 ">
                      © 2023 productionglue. All rights reserved.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </VerifyInvite>
    </>
  );
};

export default SignIn;
