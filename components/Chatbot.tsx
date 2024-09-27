"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { SendHorizonal, X } from "lucide-react";
import Markdown from "react-markdown";
import { ChatUrl } from "@/utils/constant";

interface Message {
  text: string;
  sender: "user" | "bot";
}

const Chatbot = ({ closeChatbot }: { closeChatbot: () => void }) => {
  const [inputValue, setInputValue] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([
    { text: "Hello! How can I help you today?", sender: "bot" },
  ]);
  const [botMessages, setBotMessages] = useState<string>("");
  const [eventType, setEventType] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const messageContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scroll to the bottom of the message container when messages change
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop =
        messageContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const emit = (event: string, data?: any) => {
    // Define your implementation of emit here
    console.log(`Event emitted: ${event}`, data);

    if (event === "START") {
      setEventType("START");
      setLoading(true);
    }

    if (event === "MESSAGE") {
      setLoading(false);
      setBotMessages((prevBotMessages) => prevBotMessages + data);
    }

    if (event === "END") {
      setEventType("END");
    }
  };

  // useEffect(() => {
  //   if (botMessages !== "" && eventType === "END") {
  //     setMessages((prevMessages) => [
  //       ...prevMessages,
  //       { text: botMessages, sender: "bot" },
  //     ]);
  //     setBotMessages("");
  //   }
  // }, [eventType]);

  useEffect(() => {
    if (botMessages !== "") {
      //  setMessages((prevMessages) => [
      //     ...prevMessages,
      //     { text: botMessages, sender: "bot" },
      //   ]);
      if (botMessages.startsWith(messages[messages.length - 1].text)) {
        messages[messages.length - 1].text = botMessages;
      } else {
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: botMessages, sender: "bot" },
        ]);
      }
    }
    if (eventType === "END") {
      setBotMessages("");
    }
  }, [botMessages]);

  console.log(messages, "messages");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSendClick = () => {
    sendMessage();
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  const sendMessage = async () => {
    if (inputValue.trim() !== "") {
      // Add user message to the messages state
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: inputValue, sender: "user" },
      ]);
      setInputValue("");

      try {
        const response = await postMessage(inputValue, emit);
        // Handle the response from the API here
        // console.log("API response:", response);
      } catch (error) {
        console.error("Error sending message:", error);
      }

      // Clear the input field after sending the message
      setInputValue("");
    }
  };

  return (
    <div className="w-fit max-w-[360px] xl:max-w-[640px] xl:min-w-[400px] 2xl:min-w-[560px]">
      <div className="bg-neutral-50 flex max-sm:w-[96%] flex-col pb-6 rounded-3xl ">
        <div className="bg-primary self-stretch flex w-full flex-col justify-center items-stretch px-5 2xl:px-6 py-2.5 2xl:py-5 rounded-t-3xl">
          <div className="items-center flex w-full justify-between gap-5">
            <div className="flex items-stretch justify-between gap-3.5">
              <div className="h-12 w-12 2xl:h-16 2xl:w-16 bg-white rounded-full flex justify-center items-center">
                <Image src="/drop.svg" width={24} height={38} alt="logo" />
              </div>
              <div className="self-center flex grow basis-[0%] flex-col items-stretch my-auto">
                <div className="text-white text-base 2xl:text-lg whitespace-nowrap">
                  Gluey
                </div>
                <div className="flex justify-between gap-1 2xl:pt-1 items-center">
                  <span className="relative flex gap-1 h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#81C784] opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-[#81C784]"></span>
                  </span>
                  <div className="text-gray-200 text-sm 2xl:text-base grow whitespace-nowrap">
                    online
                  </div>
                </div>
              </div>
            </div>
            <div
              className="cursor-pointer hover:opacity-60"
              onClick={closeChatbot}
            >
              <X className="text-white" />
            </div>
          </div>
        </div>
        <div
          className="px-6 overflow-y-auto 2xl:h-[28rem] h-96  max-w-[360px] xl:max-w-[640px] xl:min-w-[400px] 2xl:min-w-[560px]"
          ref={messageContainerRef}
        >
          <div className="mt-20" />

          {/* Display messages */}

          {messages.map((message, index) => (
            <div
              key={index}
              className={`w-full flex ${
                message.sender === "user" ? "justify-end" : "justify-start"
              } mt-3`}
            >
              <span
                className={`text-sm max-w-[360px] xl:max-w-[640px]  w-fit 2xl:text-lg rounded px-2.5 2xl:px-4 py-1 2xl:py-1.5 ${
                  message.sender === "user"
                    ? "bg-primary text-white"
                    : "bg-neutral-200 text-zinc-800"
                }`}
              >
                {/* {message.text} */}
                {message.sender === "bot" && index === messages.length - 1 ? (
                  <>
                    <Markdown>{message.text}</Markdown>
                  </>
                ) : (
                  <Markdown>{message.text}</Markdown>
                )}
              </span>
            </div>
          ))}

          {!loading && (
            <div className="w-full flex justify-start mt-3">
              <span
                className={` rounded px-2.5 2xl:px-16 py-2 2xl:py-4 bg-neutral-200`}
              >

                <LoadingDots />
              </span>
            </div>
          )}
        </div>

        <div className="self-center border-t border-primary border-solid pt-5 flex max-w-[360px] xl:max-w-[640px] xl:min-w-[400px] 2xl:min-w-[560px] justify-between gap-5 mt-5 px-5 items-start">
          <input
            className="text-zinc-600 text-sm w-full bg-transparent px-5 ring-0 focus-within:outline-none mt-1.5"
            placeholder="Ask your question..."
            value={inputValue}
            onChange={handleInputChange}
            // disabled={completedTyping}
            onKeyPress={handleKeyPress}
          />
          <button
            className="cursor-pointer hover:opacity-60 disabled:pointer-events-none disabled:opacity-60"
            onClick={handleSendClick}
            // disabled={completedTyping}
          >
            <SendHorizonal className="text-[#2E6AB3]" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;

export async function postMessage(
  message: string,
  emit: (event: string, data?: any) => void
) {
  emit("START");

  try {
    const response = await fetch(
      `${ChatUrl}/chat`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "text/event-stream",
          // Add other headers as needed
        },
        body: JSON.stringify({
          message: message,
          userId: "123",
        }),
      }
    );

    const reader = response.body?.getReader(); // Added optional chaining to avoid error if response.body is null
    const decoder = new TextDecoder();
    let finalData = "";

    if (!reader) {
      emit("MESSAGE", "Response body is empty");
      emit("END");
      return;
    }

    const processStream = async ({
      done,
      value,
    }: ReadableStreamReadResult<Uint8Array>): Promise<void> => {
      if (done) {
        console.log("Stream complete");
        emit("END");
        return;
      }

      const dataStrings = decoder.decode(value).split("data: ").filter(Boolean);
      // console.log("Data strings:", dataStrings);

      for (const data of dataStrings) {
        try {
          const parsedData = JSON.parse(data);
          if (parsedData["token"].startsWith("pr0mpt")) {
            const message = parsedData["token"].slice(6);
            console.log(message, "from API");
            emit("PROMPTS", message);
            emit("END");
            return;
          }
          emit("MESSAGE", parsedData["token"]);
          finalData = finalData + parsedData["token"];
        } catch (error) {
          console.error("Error parsing data:", error);
        }
      }

      return reader.read().then(processStream);
    };

    await reader.read().then(processStream);
  } catch {
    emit("MESSAGE", "Network error occurred");
    emit("END");
    return;
  }
}

//  function CursorSVG() {
//   return (
//     <svg
//       viewBox="8 4 8 16"
//       xmlns="http://www.w3.org/2000/svg"
//       className="inline-block w-3 h-4 fill-current animate-bounce"
//     >
//       <rect x="5" y="6" width="2" height="16" fill="#2E6AB3" />
//     </svg>
//   );
// }

const LoadingDots = () => {
  let circleCommonClasses = "h-1.5 w-1.5 bg-current rounded-full";

  return (
    <div className="flex text-primary">
      <div className={`${circleCommonClasses} mr-1 animate-bounce`}></div>
      <div className={`${circleCommonClasses} mr-1 animate-bounce`}></div>
      <div className={`${circleCommonClasses} animate-bounce`}></div>
    </div>
  );
};
