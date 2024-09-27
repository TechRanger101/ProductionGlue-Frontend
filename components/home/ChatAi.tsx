"use client";
import { cn } from "@/lib/utils";
import {
  ChevronDown,
  Maximize2,
  MessageSquare,
  Minimize2,
  Trash2,
} from "lucide-react";
import Markdown from "react-markdown";
import React, { useState, useEffect, useRef } from "react";
import { Switch } from "@/components/ui/switch";
import { useRouter } from "next/navigation";
import { ChatUrl } from "@/utils/constant";

const ChatAi = (
  { isChat,isExpandedCheck }: { isChat: boolean,isExpandedCheck:boolean } = { isChat: false,isExpandedCheck:false }
) => {
  const [isDialogOpen, setIsDialogOpen] = useState(isChat);
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [websearch, setWebsearch] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [typing, setTyping] = useState<boolean>(false);
  const router = useRouter();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const [isSending, setIsSending] = useState(false);
  const [isExpanded, setIsExpanded] = useState(isExpandedCheck);
  const [searchResult, setSearchResult] = useState({
    service: "",
    search: "",
    radius: "",
  });
  const [isSearchTypeComplete, setIsSearchTypeComplete] = useState(false);

  useEffect(() => {
    if (!isSending) {
      searchInputRef.current?.focus();
    }
  }, [isSending]);

  const handleSendMessage = async (e: any) => {
    e.preventDefault();
    if (newMessage.trim() !== "") {
      setNewMessage("");
      setIsSending(true);
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          content: newMessage,
          role: "user",
        },
      ]);
      const userId = localStorage.getItem("userId");
      const apiUrl = `${ChatUrl}/chat`;

      try {
        const response = await fetch(apiUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "text/event-stream",
          },
          body: JSON.stringify({
            message: newMessage,
            userId: userId,
            websearch: websearch,
          }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const reader = response.body!.getReader();
        const decoder = new TextDecoder();

        let tempData = "";
        // @ts-ignore
        const processStream: any = ({ done, value }) => {
          if (done) {
            console.log("Stream complete");
            clearInterval(updateInterval);
            setIsSending(false);
            if (tempData.length > 0) {
              setMessages((prevMessages) => {
                const lastAIMessageIndex = prevMessages.length - 1;
                const lastAIMessage = prevMessages[lastAIMessageIndex];

                if (lastAIMessage && lastAIMessage.role === "assistant") {
                  const updatedMessage = {
                    ...lastAIMessage,
                    content: lastAIMessage.content + tempData,
                  };
                  return [
                    ...prevMessages.slice(0, lastAIMessageIndex),
                    updatedMessage,
                  ];
                } else {
                  return [
                    ...prevMessages,
                    {
                      content: tempData,
                      role: "assistant",
                    },
                  ];
                }
              });
            }
            setIsSearchTypeComplete(true);
            setTyping(false);
            return;
          }
          const dataStrings = decoder
            .decode(value)
            .split("data: ")
            .filter(Boolean);
          // console.log("daztaStrings ", dataStrings);
          for (const data of dataStrings) {
            try {
              const parsedData = JSON.parse(data);
              if (parsedData["token"].startsWith("pr0mpt")) {
                const message = parsedData["token"].slice(6);
                // console.log(message, "from API");
                // console.log("message ", message);
                return;
              }
              if (parsedData["token"].startsWith("search_result")) {
                // console.log("search_result ", parsedData);
                const service = parsedData["token"].split(";")[1];
                const search = parsedData["token"].split(";")[2];
                const radius = parsedData["token"].split(";")[3];
                setSearchResult({
                  service,
                  search,
                  radius,
                });
              } else {
                tempData = tempData + parsedData["token"];
              }
              // console.log("parsedData ", parsedData);
              // console.log("tempData ", tempData);
            } catch (error) {
              console.error("Error parsing data:", error);
            }
          }

          return reader.read().then(processStream);
        };

        const updateInterval = setInterval(() => {
          if (tempData.length > 0) {
            // Trim leading and trailing newlines before replacing with <br />
            setTyping(true);
            const formattedData = tempData;
            // console.log("formattedData ", formattedData);
            tempData = ""; // Reset tempData after using it

            setMessages((prevMessages) => {
              const lastAIMessageIndex = prevMessages.length - 1;
              const lastAIMessage = prevMessages[lastAIMessageIndex];

              if (lastAIMessage && lastAIMessage.role === "assistant") {
                const updatedMessage = {
                  ...lastAIMessage,
                  content: lastAIMessage.content + formattedData,
                };
                return [
                  ...prevMessages.slice(0, lastAIMessageIndex),
                  updatedMessage,
                ];
              } else {
                return [
                  ...prevMessages,
                  {
                    content: formattedData,
                    role: "assistant",
                  },
                ];
              }
            });
          }
        }, 100); // Update every 100ms, adjust as needed

        reader.read().then(processStream);
      } catch (error) {
        console.error("There was an error with the fetch operation:", error);
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            content: "Error occurred",
            role: "assistant",
          },
        ]);
        setIsSending(false);
        setTyping(false);
      }
    }
  };

  // console.log(websearch, "websearch");

  // useEffect(() => {
  //   // console.log(searchResult, "searchResult ",searchResult.search, ' ',searchResult.search !== "");
  //   if(searchResult.search !== "" && searchResult.search !== undefined && searchResult.search !== null && searchResult.radius !== "" && searchResult.radius !== undefined && searchResult.radius !== null && searchResult.service !== "" && searchResult.service !== undefined && searchResult.service !== null && isSearchTypeComplete){
  //     // console.log(isSearchTypeComplete, " isSearchTypeComplete",searchResult);
  //    router.push(`/search?search=${searchResult.search}&radius=${searchResult.radius}&service=${searchResult.service}&isChat=true&isExpandedCheck=${isExpanded}&spaceType=none`)
  //   }
  // }, [searchResult,isSearchTypeComplete]);
  // console.log(searchResult, "searchResult");
  const toggleDialog = () => {
    setIsDialogOpen(!isDialogOpen);

    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const getHistory = async () => {
    const userId = localStorage.getItem("userId");
    const apiUrl = `${ChatUrl}/history`;

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: userId,
      }),
    });

    const data = await response.json();
    // console.log(data, "data");
    setMessages(data);
    // scrollToBottom();
  };

  useEffect(() => {
    getHistory();
  }, []);

  const clearHistory = async () => {
    if (messages.length === 0) {
      return;
    }
    const userId = localStorage.getItem("userId");
    const apiUrl = `${ChatUrl}/clear`;

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: userId,
      }),
    });

    const data = await response.json();
    if (response.ok) {
      // console.log(data, "data");
    }
    setMessages([]);
    getHistory();
  };

  return (
    <>
      {!isDialogOpen && (
        <div
          className="flex rounded-full justify-center items-center fixed bottom-6 right-12 max-sm:right-3 w-16 max-sm:w-12 max-sm:h-12 h-16 bg-primary hover:bg-[#1958a5] transition-all duration-200 ease-in-out cursor-pointer  z-[1000] shadow-lg "
          onClick={toggleDialog}
        >
          <MessageSquare className="fill-white text-white max-sm:w-5" size={28} 
          
          />
        </div>
      )}

      <div
        className={cn(
          "transition-all z-20 duration-300 ease-in-out origin-bottom-right fixed bottom-6 right-14 max-sm:right-2.5  rounded-3xl flex flex-col shadow-xl overflow-hidden",
          isDialogOpen
            ? "w-[400px] max-xxs:w-[90%] max-sm:w-[340px] max-sm:h-[534px] h-[560px] 3xl:w-[500px] 2xl:h-[640px] scale-100 visible opacity-100"
            : "w-16 h-16 scale-0 invisible opacity-0",
          isExpanded ? "h-[660px] 3xl:h-[730px] 3xl:w-[800px] w-[720px]" : ""
        )}
      >
        <div
          className=" text-white font-semibold flex w-full justify-between items-center px-7 py-6 max-sm:px-4 max-sm:py-2"
          style={{
            background: "linear-gradient(135deg, #2a27da 0%, #00ccff 100%)",
          }}
        >
          <div className="flex items-center gap-x-6">
            <div>
              <img
                src="https://e7.pngegg.com/pngimages/730/861/png-clipart-call-centre-graphy-customer-service-business-business-black-hair-service-thumbnail.png"
                alt="avatar"
                className="w-12 h-12 rounded-full"
              />
            </div>
            <h3 className="text-lg max-sm:text-base inline-flex">
              Hi there! <HISvg />
            </h3>
          </div>
          <div className="flex items-center  gap-x-4">
            <button onClick={() => setIsExpanded(!isExpanded)}
            className="max-md:hidden"
            >
              {isExpanded ? <Minimize2 /> : <Maximize2 />}
            </button>
            <button onClick={toggleDialog}>
              <ChevronDown />
            </button>
          </div>
        </div>
        <div
          className="relative pt-16 "
          style={{
            background: "linear-gradient(135deg, #2a27da 0%, #00ccff 100%)",
          }}
        >
          <span className="text-white max-sm:text-xs absolute top-4 left-10  inline-flex items-center">
            <span className="relative flex gap-1 h-3 w-3 mr-3 max-sm:h-2 max-sm:w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#81C784] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 max-sm:h-2 max-sm:w-2 w-3 bg-[#81C784]"></span>
            </span>
            We are online
          </span>
          <svg
            viewBox="0 0 1440 180"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute top-9"
          >
            <path
              style={{ transform: "translate(0, 0px)", opacity: "1" }}
              fill="#fff"
              d="M0,54L80,51C160,48,320,42,480,45C640,48,800,60,960,57C1120,54,1280,36,1440,27C1600,18,1760,18,1920,27C2080,36,2240,54,2400,66C2560,78,2720,84,2880,99C3040,114,3200,138,3360,129C3520,120,3680,78,3840,60C4000,42,4160,48,4320,57C4480,66,4640,78,4800,75C4960,72,5120,54,5280,51C5440,48,5600,60,5760,66C5920,72,6080,72,6240,72C6400,72,6560,72,6720,63C6880,54,7040,36,7200,48C7360,60,7520,102,7680,99C7840,96,8000,48,8160,39C8320,30,8480,60,8640,69C8800,78,8960,66,9120,63C9280,60,9440,66,9600,75C9760,84,9920,96,10080,93C10240,90,10400,72,10560,57C10720,42,10880,30,11040,42C11200,54,11360,90,11440,108L11520,126L11520,180L11440,180C11360,180,11200,180,11040,180C10880,180,10720,180,10560,180C10400,180,10240,180,10080,180C9920,180,9760,180,9600,180C9440,180,9280,180,9120,180C8960,180,8800,180,8640,180C8480,180,8320,180,8160,180C8000,180,7840,180,7680,180C7520,180,7360,180,7200,180C7040,180,6880,180,6720,180C6560,180,6400,180,6240,180C6080,180,5920,180,5760,180C5600,180,5440,180,5280,180C5120,180,4960,180,4800,180C4640,180,4480,180,4320,180C4160,180,4000,180,3840,180C3680,180,3520,180,3360,180C3200,180,3040,180,2880,180C2720,180,2560,180,2400,180C2240,180,2080,180,1920,180C1760,180,1600,180,1440,180C1280,180,1120,180,960,180C800,180,640,180,480,180C320,180,160,180,80,180L0,180Z"
            ></path>
          </svg>
        </div>
        <div className="flex-grow  bg-white py-3 px-6 pt-12 max-sm:pt-6 overflow-x-hidden overflow-y-auto scrollbar-thin">
          {messages && messages?.map((message, index) => (
            <div
              key={index}
              className={cn(
                "flex",
                message.role === "assistant" ? "justify-start" : "justify-end"
              )}
            >
              <div className="flex-grow flex flex-col">
                <div
                  className={cn(
                    "rounded-xl p-4 max-w-[70%] max-sm:max-w-[90%] mb-2",
                    message.role === "assistant"
                      ? "bg-[#f0f2f7] opacity-70 text-white self-start"
                      : "bg-gradient-to-r from-sky-600 to-primary self-end"
                  )}
                >
                  <div
                    className={cn(
                      // message.isHTML ? "whitespace-pre-line" : "",
                      message.role === "assistant" ? "text-black" : "text-white",
                      "max-sm:text-xs"
                    )}
                  >
                    <Markdown
                    // className='whitespace-pre-line'
                   components={
                      {
                        a: ({node, ...props}) => {
                          return <a {...props} target="_blank" rel="noreferrer" className="text-primary hover:underline">{props.children}</a>
                        },
                        p: ({node, ...props}) => {
                          return <p {...props} className="mb-1">{props.children}</p>
                        },
                        li: ({node, ...props}) => {
                          return <li {...props} className="mt-1 list-disc ml-4">{props.children}</li>
                        },
                        h3: ({node, ...props}) => {
                          return <h3 {...props} className="mt-8 font-semibold">{props.children}</h3>
                        },
                        h4: ({node, ...props}) => {
                          return <h4 {...props} className="mt-2 font-semibold">{props.children}</h4>
                        },
                        h5: ({node, ...props}) => {
                          return <h5 {...props} className="mt-1">{props.children}</h5>
                        },

                      }
                   }
                    >{message.content}</Markdown>
                
                  </div>
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        <div className="bg-white py-2 flex justify-between px-6">
          <div className="flex gap-3">
            <div className="flex items-center gap-2 ">
              <Switch 
             checked={websearch}
              onCheckedChange={(checked) => {
                setWebsearch(checked);}
              }
              />
              <span className="text-sm max-sm:text-[10px]">Web Search</span>
            </div>
          </div>
          <div
            className=" hover:text-red-600 hover:font-medium cursor-pointer"
            onClick={clearHistory}
          >
            <div className="flex items-center gap-1 ">
              <Trash2 className="max-sm:w-4" />
              <span className="text-sm max-sm:text-[10px]">Clear</span>
            </div>
          </div>
        </div>
        <form
          onSubmit={handleSendMessage}
          className="relative py-3.5 px-6  bg-white"
        >
          {" "}
          <div className="relative pb-3">
            {isSending && !typing && (
              <div className="mb-5 flex items-center">
                <span className="text-primary mr-2">Thinking</span>
                <div className="h-1.5 w-1.5 bg-primary rounded-full  mr-1 animate-bounce"></div>
                <div className="h-1.5 w-1.5 bg-primary rounded-full  mr-1 animate-bounce"></div>
                <div className="h-1.5 w-1.5 bg-primary rounded-full  animate-bounce"></div>
              </div>
            )}
            {typing && (
              <div className="mb-5 flex ">
                <span className="text-primary">Typing...</span>
              </div>
            )}
            <input
              type="text"
              placeholder="Write your message"
              value={newMessage}
              onChange={(e) => {
                setNewMessage(e.target.value);
              }}
              disabled={isSending}
              className="w-full h-12 px-4 pr-12 bg-white border-t-2 border-gray-200 focus:outline-none pt-4"
              ref={searchInputRef}
            />
            <button
              onClick={handleSendMessage}
              disabled={isSending}
              style={{
                boxShadow: "rgba(0, 77, 255, 0.5) 0px 4px 24px",
              }}
              className="absolute bg-[linear-gradient(135deg,_#2a27da,_#00ccff)] hover:scale-110  w-14 h-14 flex justify-center items-center -right-4 z-[1000] rounded-full top-1/2 transform -translate-y-1/2 text-primary focus:outline-none transition-all duration-300 ease-linear "
            >
              <SendSvg />
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ChatAi;

const HISvg = () => {
  return (
    <>
      <svg
        width={28}
        height={28}
        // style={{
        //   enableBackground: "new 0 0 128 128",
        // }}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 28 28"
        className="ml-2 max-sm:w-5"
      >
        <path
          d="M8.555 17.404c-0.241 0.225 -0.483 -0.044 -0.483 -0.044S4.029 13.077 3.767 12.884c-0.37 -0.269 -1.162 -0.691 -1.953 0.125 -0.33 0.339 -0.868 1.094 0.131 2.31 0.217 0.263 6.514 6.899 6.882 7.258 0 0 2.909 2.831 4.67 3.896 0.488 0.295 1.037 0.608 1.678 0.827 0.639 0.219 1.361 0.37 2.122 0.37 0.761 0.009 1.551 -0.138 2.297 -0.411 0.746 -0.276 1.442 -0.676 2.074 -1.137 0.155 -0.118 0.313 -0.236 0.459 -0.363l0.424 -0.35a12.834 12.834 0 0 0 0.836 -0.772c0.532 -0.529 1.011 -1.096 1.433 -1.676 0.42 -0.582 0.777 -1.183 1.061 -1.783 0.284 -0.599 0.483 -1.201 0.604 -1.77 0.127 -0.567 0.162 -1.103 0.142 -1.571 -0.004 -0.468 -0.098 -0.868 -0.175 -1.188 -0.088 -0.319 -0.182 -0.558 -0.256 -0.715 -0.072 -0.158 -0.112 -0.241 -0.112 -0.241 -0.101 -0.282 -0.197 -0.551 -0.282 -0.794a194.605 194.605 0 0 0 -0.987 -2.728l0.002 0.007c-1.061 -2.881 -2.201 -5.849 -2.201 -5.849 -0.173 -0.523 -0.809 -0.704 -1.277 -0.367 -1.352 0.971 -1.765 2.389 -1.288 3.9l1.223 3.351c0.173 0.374 -0.304 0.807 -0.623 0.547 -1.004 -0.818 -3.128 -3.073 -3.128 -3.073 -0.949 -0.91 -6.307 -6.403 -6.665 -6.737 -0.722 -0.672 -1.632 -1.017 -2.325 -0.507 -0.709 0.521 -0.906 1.326 -0.221 2.205 0.186 0.238 5.6 5.959 5.6 5.959 0.315 0.33 -0.057 0.798 -0.405 0.477 0 0 -6.735 -7.026 -7.039 -7.354 -0.689 -0.748 -1.796 -0.912 -2.452 -0.295 -0.641 0.602 -0.626 1.588 0.074 2.363 0.223 0.245 4.968 5.254 6.867 7.306 0.127 0.138 0.225 0.322 0.037 0.494 -0.002 0.002 -0.193 0.208 -0.438 -0.055 -0.516 -0.551 -5.672 -5.924 -5.959 -6.215 -0.658 -0.669 -1.542 -0.987 -2.253 -0.335 -0.647 0.593 -0.752 1.628 -0.009 2.358l6.245 6.602s0.203 0.241 -0.024 0.453z"
          style={{
            fill: "#fac036",
          }}
        />
        <path
          d="M13.843 2.231s1.271 0.193 2.448 1.452c1.177 1.262 1.722 2.883 1.722 2.883M16.94 0.766s1.065 0.536 1.888 1.859c0.823 1.323 1.022 2.855 1.022 2.855m-12.038 18.742s-1.282 0.085 -2.702 -0.895 -2.301 -2.446 -2.301 -2.446m4.088 5.491s-1.19 0.05 -2.555 -0.704 -2.284 -1.995 -2.284 -1.995"
          style={{
            fill: "none",
            stroke: "#2e6ab3",
            strokeWidth: 0.5,
            strokeLinecap: "round",
            strokeMiterlimit: 10,
          }}
        />
      </svg>
    </>
  );
};

const SendSvg = () => {
  return (
    <>
      <svg
        stroke="#fff"
        fill="#fff"
        strokeWidth="0"
        viewBox="0 0 512 512"
        height="28px"
        width="28px"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M48 448l416-192L48 64v149.333L346 256 48 298.667z"></path>
      </svg>
    </>
  );
};
