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
import NotFound from "@/components/ui/not-found";

const Profile = async ({
  params,
  searchParams
}: {
  params: { slug: string; venueId: string };
  searchParams: { [key: string]: string | string[] | undefined ,type:string}
}) => {
  const cookieStore = cookies();
  // console.log(searchParams, "searchParams");
  let isAdmin: boolean =
    cookieStore.get("userRole")?.value === "admin" ? true : false;
  const data = await getProfile(params.venueId,searchParams.type);
  console.log(data, 'data ', params.venueId, 'params.venueId', searchParams.type, 'searchParams.type');

  if(data.length === 0){
    return <NotFound />
  }

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
                <Image src="/logo.svg" width={190} height={40} alt="logo" />
              </Link>
              <InviteSomeoneLink isAdmin={isAdmin} />
            </div>
            <ProfileMenu 
            pageName={false}
            />
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
                      className="lg:w-3/5 w-full lg:ml-6"
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

export default Profile;

async function getProfile(venueId: string,type: string): Promise<any[]> {
  const url = `${BaseUrl}/api/${type}?eventEntityId=${venueId}`;
  const res = await fetch(url,{ cache: 'no-store' });
  const data = await res.json();
  console.log(url, ' url');
  console.log(data);
  if(data.status === 400){
  return []
  }
  return data.data;
}
