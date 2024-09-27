import VerifyInvite from "@/components/VerifyInvite";
import LandingPage from "@/components/home/LandingPage";
import { cookies } from "next/headers";

export default function Home() {
  const cookieStore = cookies();

  let isAdmin: boolean =
    cookieStore.get("userRole")?.value === "admin" ? true : false;
  let accessToken = cookieStore.get("accessToken")?.value;
  let userLoggedIn = accessToken ? true : false;
  return (
    <>
      <LandingPage isAdmin={isAdmin}
      userLoggedIn={userLoggedIn}
      />
    </>
  );
}
