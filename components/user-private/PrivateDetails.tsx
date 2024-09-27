import React from "react";
import ProfileTabDetail from "@/components/profile/ProfileTabDetail";
type Props = { 
  data?: any;
};
const PrivateDetails = (
  { data }: Props
) => {
  return (
    <>
      <div>
        <ul className="flex justify-center text-sm font-medium text-center text-gray-500 border-b border-gray-200">
          <li className="me-2">
            <button
              className={`inline-block lg:px-44 lg:py-4 px-10 py-2 text-[#4A5262] rounded-t-lg bg-[#F3F3F3]`}
            >
              Details
            </button>
          </li>
        </ul>

        <div className={`pb-56 `}>
          <ProfileTabDetail data={data}/>
        </div>
      </div>
    </>
  );
};

export default PrivateDetails;
