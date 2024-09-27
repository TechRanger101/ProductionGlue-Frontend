"use client";
import React, { useEffect, useState } from "react";
import {
  APIProvider,
  Map,
  AdvancedMarker,
  Pin,
  InfoWindow,
} from "@vis.gl/react-google-maps";
import Image from "next/image";
import Link from "next/link";

const GoogleMapSearch = ({
  mapSearchData,
  mapCenter,
  hovered,
  setHovered,
}: {
  mapSearchData: any[];
  mapCenter: { lat: number; lng: number };
  hovered: string;
  setHovered: (id: string) => void 
}) => {

  const [selected, setSelected] = useState<any>(null);  
  const [newCenter, setNewCenter] = useState<any>(mapCenter);
  // console.log(hovered, "hovered")
  const MapId = "33de9bfcb9ef84a4";

  useEffect(() => {
    hovered && setNewCenter(
      mapSearchData.find((item) => item.eventEntityId === hovered) ?
      {
        lat: Number(mapSearchData.find((item) => item.eventEntityId === hovered
        ).lat),
        lng: Number(mapSearchData.find((item) => item.eventEntityId === hovered
        ).lng)
      } : mapCenter
    );
  }
  , [hovered])

  useEffect(() => {
    console.log("mapCenter", mapCenter)
  }
  , [newCenter])



  return (
    <>
      <APIProvider apiKey={process.env.NEXT_GOOGLE_API_KEY || ""}>
        <div
          // style={{ width: "100%", height: "80vh" }}
          className="lg:h-[730px] w-full h-[400px] max-lg:overflow-hidden "
        >
          <Map  
          mapId={MapId}
          draggableCursor={hovered ? "pointer" : "grab"}
          defaultCenter={newCenter}
          center={newCenter}
          defaultZoom={11}
          >
            {mapSearchData.map((item: any) => {
              return (
                <AdvancedMarker
                  key={item.eventEntityId}
                  zIndex={selected && selected.eventEntityId === item.eventEntityId ? 100 : 0}
                  position={{ lat: item.lat ? Number(item.lat) : 0, lng: item.lng ? Number(item.lng) : 0 }}
                  onClick={() => {
                    item === selected ? setSelected(null) : setSelected(item);
                    setHovered(item.eventEntityId);
                  }}
                  
                >
                  <Pin
                    background={
                        hovered && hovered === item.eventEntityId
                        ? "red"
                        : "blue"
                    }
                    scale={hovered && hovered === item.eventEntityId ? 1.5 : 1}
                    borderColor={hovered && hovered === item.eventEntityId ? "red" : "#2E6AB3"}
                    glyphColor={hovered && hovered === item.eventEntityId ? "white" : "white"}
                  />
                  {selected && selected.eventEntityId === item.eventEntityId && (
                    <InfoWindow
                      onCloseClick={() => setSelected(null)}
                      minWidth={200}
                      zIndex={50}
                      position={{ lat: item.lat, lng: item.lng }}

                    >
                  
                      <VenueCard data={selected} />
                    </InfoWindow>
                  )}
                </AdvancedMarker>
              );
            })}
          </Map>
        </div>
      </APIProvider>
    </>
  );
};

export default GoogleMapSearch;

const VenueCard = ({ data }: { data: any }) => {
  return (
    <>
    <Link href={`/profile/${data?.eventEntityId}?type=venue`}>
      <div className="flex-col min-w-[340px] overflow-hidden relative flex  px-8 py-4 items-start mt-2">
        {data?.images?.length > 0 ? (
          <Image
            // src="/venue/venue-new.jpeg"
            src={data?.images[0]}
            loading="lazy"
            alt="Venue"
            width={300}
            height={440}
            className="absolute rounded-xl h-full w-full object-cover object-center inset-0 aspect-[4/5]"
          />
        ) : (
          <div className="absolute rounded-xl h-full w-full object-cover object-center inset-0 aspect-[4/5] bg-gray-950"></div>
        )}

        <div
          className="relative text-zinc-900 text-base font-medium whitespace-nowrap justify-center items-stretch bg-white px-2.5 py-1.5 rounded-xl"
          aria-label="Category"
        >
          {data?.spaceName || "Space Name"}
        </div>

        <button
          className="relative w-fit text-white text-xl font-medium justify-center items-stretch self-stretch mt-40 py-2 "
          aria-label="Venue Name"
        >
          {data?.name ? data?.name?.slice(0, 20) : "Venue Name"}
        </button>

        <div className="relative justify-between items-stretch self-stretch flex gap-5 mt-4">
      

          <div
            className="text-white text-base font-medium leading-5 mt-2 self-end"
            aria-label="Location"
          >
            {data?.address ? data?.address?.slice(0, 18) : "Address"}
          </div>
        </div>
      </div>
      </Link>
    </>
  );
};
