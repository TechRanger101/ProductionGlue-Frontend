import React from "react";
import Link from "next/link";
import { MoveRight } from "lucide-react";
import { cn } from "@/lib/utils";
const InviteSomeoneLink = ({ isAdmin }: { isAdmin: boolean }) => {
  return (
    <> 
      <Link
        href={isAdmin ? "/send-invite" : "#"}
        className={
          cn("bg-[#2E6AB3]  3xl:py-3.5 text-white rounded-xl  px-4 hover:opacity-80 py-2 text-xs md:text-base font-medium leading-6",
          isAdmin ? "block": "hidden")
        }
      >
        {isAdmin ? (
          <div className="justify-between items-stretch flex gap-2.5">
            <div className="text-white text-right text-xs md:text-base font-medium leading-6 grow whitespace-nowrap">
              Invite Someone
            </div>
            <MoveRight className="text-white" />
          </div>
        ) : (
          null
        )}
      </Link>
    </>
  );
};

export default InviteSomeoneLink;
