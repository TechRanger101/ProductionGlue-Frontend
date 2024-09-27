"use client";

import { debounce } from "@/utils/debounce";
import axios from "axios";
import React, { useState, useEffect } from "react";

interface Props {
    searchTerm: string;
    setSearchTerm: (value: string) => void;
}

const AutoCompleteInput = (
    { searchTerm, setSearchTerm }: Props
) => {
  const [query, setQuery] = useState("");
  const [predictions, setPredictions] = useState([]);
  const [selectedPlace, setSelectedPlace] = useState("");
  const [selectedPredictionIndex, setSelectedPredictionIndex] =
    useState<number>(-1);


  const handleInputChange = (value: string) => {
    setQuery(value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedPredictionIndex((prevIndex) =>
        prevIndex < predictions.length - 1 ? prevIndex + 1 : prevIndex
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedPredictionIndex((prevIndex) =>
        prevIndex > 0 ? prevIndex - 1 : prevIndex
      );
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (selectedPredictionIndex !== -1) {
        handlePredictionClick(predictions[selectedPredictionIndex]);
      }
    } else if (e.key === "Escape") {
      setPredictions([]);
    } 
  };

  const handlePredictionClick = (prediction: any) => {
    setQuery(prediction?.zipCode || prediction?.address );
    setSearchTerm(prediction?.zipCode || prediction?.address);
    // setSelectedPlace(prediction.place_id);
    setPredictions([]);
    setSelectedPredictionIndex(-1);
    console.log("prediction ", predictions);
  };

  const debouncedFetchPredictions = debounce(async (value: string) => {
    try {
      const response = await axios.get(
        `/api/auto-complete-search-text?input=${value}&type=venue`
      );
      //   console.log("response", response.data.data);
      setPredictions(response.data.data);
    } catch (error) {
      console.error("Autocomplete Error:", error);
    }
  }, 400);

  useEffect(() => {
    if (query.trim() !== "" && query.length > 3) {
      debouncedFetchPredictions(query);
    } else {
      setPredictions([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);


  return (
    <>
      <div className="relative w-full">
        <input
          type="text"
          className="text-zinc-500 w-full text-base font-medium leading-6 whitespace-nowrap items-stretch border border-gray-200 backdrop-blur-7 bg-white mt-2.5 pl-4 pr-16 py-4 rounded-[30px] border-solid max-md:pr-6 active:ring-0 focus:ring-0 focus:outline-none"
          placeholder="Enter your zip-code/address"
          value={query}
          onChange={(e) => handleInputChange(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={() => {
            setTimeout(() => {
              setPredictions([]);
              // timeout to prevent the click event on the prediction from firing before the onBlur event
            }, 800);
          }}
        />
        {predictions.length > 0 && (
          <ul className="absolute z-40 top-[4.4rem] max-h-[120px] overflow-y-scroll left-0 w-full bg-white border border-gray-200 backdrop-blur-7 rounded-xl border-solid max-md:pr-6 active:ring-0 focus:ring-0 focus:outline-none">
            {predictions.map((prediction: any, index: number) => (
              <li
                key={index}
                className={`px-4 py-1 text-sm border-b border-gray-200 cursor-pointer hover:bg-primary rounded-xl hover:text-white ${
                  index === selectedPredictionIndex
                    ? "bg-primary text-white"
                    : ""
                }`}
                onClick={() => handlePredictionClick(prediction)}
              >
                { prediction?.zipCode || prediction?.address }
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};

export default AutoCompleteInput;
