import React from "react";

const NoVenueVendors = () => {
  return (
    <>
      <div
        key="1"
        className="flex flex-col items-center justify-center h-full p-4"
      >
        <BuildingIcon className="text-gray-400 w-48 h-48" />
        <h1 className="mt-4 text-xl 2xl:text-4xl font-semibold text-gray-800">
          No Venues and Vendors Found
        </h1>
        <p className="mt-2 text-center 2xl:text-lg text-gray-600">
          Your search did not match any venues or vendors.
          <br />
          Please try again.
        </p>
      </div>
    </>
  );
};

export default NoVenueVendors;

function BuildingIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="16" height="20" x="4" y="2" rx="2" ry="2" />
      <path d="M9 22v-4h6v4" />
      <path d="M8 6h.01" />
      <path d="M16 6h.01" />
      <path d="M12 6h.01" />
      <path d="M12 10h.01" />
      <path d="M12 14h.01" />
      <path d="M16 10h.01" />
      <path d="M16 14h.01" />
      <path d="M8 10h.01" />
      <path d="M8 14h.01" />
    </svg>
  );
}
