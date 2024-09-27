"use client";
import React from "react";
import { APIProvider, AdvancedMarker, Map, Pin } from "@vis.gl/react-google-maps";

const ProfileMap = ({
  position,
}: {
  position: { lat: number; lng: number };
}) => {
  const MapId = "33de9bfcb9ef84a4";
  return (
    <>
      <APIProvider apiKey={process.env.NEXT_GOOGLE_API_KEY || ""}>
        <div
          className="lg:h-[290px] h-[290px] w-full max-lg:overflow-hidden "
        >
          <Map mapId={MapId} defaultCenter={position} defaultZoom={13}>
            {
              position.lat !== 0 && position.lng !== 0 ? (<AdvancedMarker position={position} >
                <Pin
                  background="blue"
                  borderColor="blue"
                  glyphColor={"white"}
                />
            </AdvancedMarker>) : null
            }
          </Map>
        </div>
      </APIProvider>
    </>
  );
};

export default ProfileMap;
