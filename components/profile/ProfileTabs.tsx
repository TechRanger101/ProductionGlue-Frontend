"use client"; //ProfileTabs
// components/Tabs.js

import React, { useState } from "react";
import ProfileTabDetail from "./ProfileTabDetail";
import Chatbotbox from "../home/Chatbotbox";
import ChatAi from "../home/ChatAi";
import VendorProfile from "./VendorProfile";

type Props = {
  data?: any;
};

const ProfileTabs = ({ data }: Props) => {
  const [activeTab, setActiveTab] = useState("Details");

  const openTab = (tabName: string) => {
    setActiveTab(tabName);
  };

  return (
    <div className="w-[93%] mx-auto">
      <ul className="flex  justify-center text-sm font-medium text-center text-gray-500 border-b border-gray-200">
        <li className="me-2">
          <button
            onClick={() => openTab("Details")}
            className={`inline-block lg:px-28 lg:py-4 xl:text-xl px-10 py-2 text-[#4A5262] rounded-t-lg ${
              activeTab === "Details"
                ? " bg-[#F3F3F3]"
                : " hover:bg-[#F3F3F3] rounded-sm"
            }`}
          >
            Details
          </button>
        </li>
        {/* <li className="me-2">
          <button
            onClick={() => openTab("Assistant")}
            className={`inline-block lg:px-28 lg:py-4  xl:text-xl px-10 py-2 text-[#4A5262] rounded-t-lg ${
              activeTab === "Assistant"
                ? " bg-[#F3F3F3]"
                : " hover:bg-[#F3F3F3] rounded-sm"
            }`}
          >
            Assistant
          </button>
        </li> */}
      </ul>

      <div id="profile" className={`pb-56 max-sm:pb-20`}>
        {data?.type === "venue" ? (
          <ProfileTabDetail data={data} />
        ) : (
          <VendorProfile data={data} />
        )}
        <div>
          {/* <Chatbotbox
          isOpen={
            activeTab === "Assistant" ? true : false
          }
          toggleOpen={
            () => {
              if (activeTab === "Assistant") {
                setActiveTab("Details");
              } else {
                setActiveTab("Assistant"); 
              }
            }
          }
          closeChatbot={() =>{
            setActiveTab("Details");
          }}
          hidebutton={true}
        /> */}
          <ChatAi
            isChat={activeTab === "Assistant" ? true : false}
            isExpandedCheck={false}
          />
        </div>
      </div>
    </div>
  );
};

export default ProfileTabs;
