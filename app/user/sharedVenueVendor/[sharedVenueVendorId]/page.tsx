import Image from "next/image";
import Link from "next/link";
import { Bookmark } from "lucide-react";
import ProfileImageSlide from "@/components/profile/ProfileImageSlide";
import PrivateDetails from "@/components/user-private/PrivateDetails";
import ScrollLink from "@/components/ScrollLink";
import Footer from "@/components/home/Footer";
import SharedVenueVendorProfile from "@/components/user-private/SharedVenueVendorProfile";
import { BaseUrl } from "@/utils/constant";
import Description from "@/components/profile/Description";
import { NewLogo } from "@/components/home/Header";

const SharedVenue = async ({
  params,
}: {
  params: { slug: string; sharedVenueVendorId: string };
}) => {
  const data = await getSharedProfile(params.sharedVenueVendorId);
  // console.log(data);
  return (
    <>
      <div>
        <div className="flex-col overflow-hidden relative flex min-h-[600px] 3xl:min-h-[680px] max-lg:min-h-[340px] w-full items-center  pt-5  max-md:max-w-full max-md:px-5">
          <Image
            src="/admin/bgadminven.svg"
            height={600}
            width={1920}
            className="absolute top-0 left-0 z-[-1] max-lg:h-[45vh] max-lg:w-full max-lg:object-cover  2xl:w-full"
            alt="hero"
          />

          <div className="relative 2xl:h-[70vh] h-[60vh] max-h-[48vh] flex w-full max-w-[93%] flex-col max-md:max-w-full">
            <div className="md:fixed xl:right-[3%] xl:w-[94%] md:w-[91%] md:right-[5%] z-[1000] justify-between items-center border backdrop-blur-[5px] bg-[#4545451a] bg-opacity-10 self-stretch hidden md:flex gap-5 px-10 py-2.5 3xl:py-3.5 rounded-[40px] border-solid border-white/60 border-opacity-60 max-md:max-w-full max-md:flex-wrap max-md:px-5">
            <Link href="/">
            <NewLogo
              width={190}
              height={36}
              className="h-9 3xl:aspect-[3/1] 3xl:h-14"
              // color="#a6a8ab"
            />
          </Link>
          <div className="flex space-x-14 items-center">
          <Link
              href="/"
              className="text-white hover:opacity-60   font-semibold 2xl:font-bold 2xl:text-lg hidden md:flex md:justify-center md:flex-row"
            >
              Home
            </Link>
            <Link
              href="/user"
              className="text-white hover:opacity-60   font-semibold 2xl:font-bold 2xl:text-lg hidden md:flex md:justify-center md:flex-row"
            >
              Dashboard
            </Link>
            <Link
              href="/user/profile"
              className="text-white    font-semibold 2xl:font-bold 2xl:text-lg hidden md:flex md:justify-center md:flex-row"
            >
              Profile
            </Link>
            <Link
              href="/user/saved"
              className="text-white    font-semibold 2xl:font-bold 2xl:text-lg hidden md:flex md:justify-center md:flex-row"
            >
              Saved
            </Link>
          </div>
            </div>
            <SharedVenueVendorProfile />
            <div className="absolute w-full max-lg:bottom-0 max-md:top-32 top-56 left-0 items-stretch flex max-w-full flex-col pl-1 pr-4 max-md:mt-10">
              <div className="text-[#818181] 3xl:text-3xl max-md:text-[10px] text-base 2xl:text-xl font-medium leading-6 whitespace-nowrap items-stretch border border-[color:var(--gray-200,#E4E4E7)] backdrop-blur-[7px] bg-white w-fit px-3.5 2xl:px-5 2xl:py-4 py-2 max-md:px-2 max-md:py-0.5 rounded-[60px] border-solid">
                View the{" "}
                {
                  // @ts-ignore
                  data?.type || ""
                }{" "}
                profile
              </div>
              <div className="flex justify-between w-full items-end">
                <div>
                  <div className="text-white 3xl:text-9xl text-6xl 2xl:text-7xl leading-normal font-extrabold mt-10 max-md:mt-5 max-md:max-w-full max-md:text-4xl">
                    {
                      // @ts-ignore
                      data?.type || " "
                    }{" "}
                  </div>
                </div>
                <div className="hover:scale-125 max-lg:hidden transform transition-all duration-300 ease-in-out cursor-pointer">
                  <ScrollLink href="#userVenue">
                    <Image
                      src="/ArrowDown.svg"
                      width={110}
                      height={110}
                      alt="down"
                      className="3xl:w-36"
                    />
                  </ScrollLink>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div id="userVenue" className=" md:max-w-[93%] md:mx-auto max-md:px-5">
          <div className="mt-6 ">
            <div className="relative justify-between pt-14 max-md:pt-0 lg:pt-0 items-stretch self-stretch flex w-full gap-5 pr-16 max-md:max-w-full max-md:flex-wrap max-md:pr-0">
              <div className="w-full">
                <div className="flex lg:flex-row flex-col gap-10 pb-24 items-start">
                  <div className="lg:w-2/5">
                    <ProfileImageSlide
                      // @ts-ignore
                      images={data?.images}
                    />
                  </div>
                  <div className="lg:w-3/5 lg:ml-6">
                    <Description data={data} />
                  </div>
                </div>
              </div>
            </div>
            <div>
              <PrivateDetails data={data} />
            </div>
          </div>
        </div>
      </div>
      <div className="mt-10">
        <Footer bgColor="bg-[#2E6AB3]" />
      </div>
    </>
  );
};

export default SharedVenue;

async function getSharedProfile(Id: string): Promise<any[]> {
  const res = await fetch(
    `${BaseUrl}/api/user-private-venues-vendors-details?sharedVenueVendorId=${Id}`,{ cache: 'no-store' }
  );
  const data = await res.json();
  // console.log(data);
  return data.data;
}
