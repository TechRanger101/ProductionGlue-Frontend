"use client";
import React from "react";
import { APIProvider, AdvancedMarker, Map, Pin } from "@vis.gl/react-google-maps";

const AroundMap = ({
  position,
}: {
  position: { lat: number; lng: number };
}) => {
  const MapId = "33de9bfcb9ef84a4";
  return (
    <>
      <APIProvider apiKey={process.env.NEXT_GOOGLE_API_KEY || ""}>
        <div
          // style={{ width: "100%", height: "80vh" }}
          className="lg:h-[730px] w-full h-[400px] max-lg:overflow-hidden "
        >
          <Map mapId={MapId} defaultCenter={position} defaultZoom={13}>
            <AdvancedMarker position={position} >
                <Pin
                  background="blue"
                  borderColor="blue"
                  glyphColor={"white"}
                />
            </AdvancedMarker>
          </Map>
        </div>
      </APIProvider>
    </>
  );
};

export default AroundMap;
