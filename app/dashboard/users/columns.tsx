"use client";

import { ColumnDef } from "@tanstack/react-table";

import { ArrowUpDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export type User = {
  userId: string;
  name: string;
  email: string;
  role: string;
  address: string;
  profilePic?: string;
};

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "profilePic",
    header: "Profile",
    cell: ({ row }) => {
      const profilePic = row.getValue("profilePic") as string | undefined;
      const name = row.getValue("name") as string | "User Name";
      return (
        <div className="flex items-center gap-x-3">
           {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={profilePic || "https://t3.ftcdn.net/jpg/06/33/54/78/360_F_633547842_AugYzexTpMJ9z1YcpTKUBoqBF0CUCk10.jpg"}
            alt="profile"
            className="h-12 w-12 object-cover  rounded-full"
          />
          {/* <span className="font-medium">{name}</span> */}
        </div>
      );
    },
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="2xl:text-xl"
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "role",
    header: "Access",
  },
  {
    accessorKey: "address",
    header: "Address",
    cell: ({ row }) => {
      const address = row.getValue("address") as string | "User Address";
      const formatted = address;
      return <div className="font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "actions",
    header: "",
    cell: ({ row }) => {
      const email = row.getValue("email") as string | "User Email";
      const formatted = email;
      return (
        <div className="flex gap-x-3 max-md:gap-x-1.5">
          <button className="text-blue-600 max-md:text-xs text-sm 2xl:text-lg font-normal">
            <Link href={`/dashboard/users/${formatted}`}>Edit</Link>
          </button>
          <button className="text-red-600 max-md:text-xs text-sm 2xl:text-lg font-normal">
            <Link href={`/dashboard/users/${formatted}`}>Delete</Link>
          </button>
        </div>
      );
    },
  },
];
