import Image from "next/image";
import { MoveRight } from "lucide-react";
import ProfileImageSlide from "@/components/profile/ProfileImageSlide";
import Description from "@/components/profile/Description";
import DiscoverMatch from "@/components/home/DiscoverMatch";
import Footer from "@/components/home/Footer";
import ProfileTabs from "@/components/profile/ProfileTabs";
import Link from "next/link";
import { cookies } from "next/headers";
import { MotionDiv } from "@/components/MotionDiv";
import InviteSomeoneLink from "@/components/home/InviteSomeoneLink";
import ProfileMenu from "@/components/profile/ProfileMenu";
import { BaseUrl } from "@/utils/constant";
import { NewLogo } from "@/components/home/Header";

const DashboardVenue = async ({
  params,
}: {
  params: { slug: string; vendorId: string };
}) => {
  const cookieStore = cookies();
  // console.log(searchParams, "searchParams");
  let isAdmin: boolean =
    cookieStore.get("userRole")?.value === "admin" ? true : false;
  const data = await getProfile(params.vendorId,'vendor');

  return (
    <>
      <section>
        <div className=" relative w-full   pt-5 max-md:max-w-full max-md:px-5">
          <Image
            src="/vendorbg.png"
            layout="fill"
            className="absolute h-full w-full object-cover object-center inset-0"
            alt=""
          />

          <div className=" relative">
            <div className="py-3 w-[93%] mx-auto justify-between items-center self-stretch hidden md:flex gap-5  max-md:max-w-full max-md:flex-wrap max-md:px-5">
              <Link href="/">
                {/* <Image src="/logo.svg" width={190} height={40} alt="logo" /> */}
                <NewLogo
              width={190}
              height={36}
              className="h-9 3xl:aspect-[3/1] 3xl:h-14"
              color="#a6a8ab"
            />
              </Link>
              {/* <InviteSomeoneLink isAdmin={isAdmin} /> */}
            </div>
            <ProfileMenu pageName={true} />
            <div className="mt-8 w-[93%] mx-auto">
              <div className="relative justify-between pt-14 lg:pt-0 items-stretch self-stretch flex w-full gap-5 max-md:max-w-full max-md:flex-wrap ">
                <div className="w-full">
                  <div className="flex lg:flex-row flex-col gap-10 pb-24 items-start">
                    <MotionDiv
                      initial={{ opacity: 0, x: -60 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        delay: 0.4,
                        duration: 0.6,
                        ease: "easeInOut",
                      }}
                      className="lg:w-2/5"
                    >
                      
                      <ProfileImageSlide 
                      // @ts-ignore
                      images={data?.images} />
                    </MotionDiv>
                    <MotionDiv
                      initial={{ opacity: 0, x: 40 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        delay: 0.4,
                        duration: 0.6,
                        ease: "easeInOut",
                      }}
                      className="lg:w-3/5 lg:ml-6"
                    >
                      <Description data={data} />
                    </MotionDiv>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <ProfileTabs data={data} />
            </div>
          </div>
        </div>
      </section>
      <DiscoverMatch />
      <Footer />
    </>
  );
};

export default DashboardVenue;

async function getProfile(venueId: string,type: string): Promise<any[]> {
  const res = await fetch(`${BaseUrl}/api/${type}?eventEntityId=${venueId}`,{ cache: 'no-store' });
  const data = await res.json();
  // console.log(data);
  return data.data;
}
