"use client";

import { ColumnDef } from "@tanstack/react-table";

import { ArrowUpDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export type Vendors = {
  name: string;
  category: string;
  status: string;
  address: string;
  representativeContactName: string;
  representativeEmail: string;
  updatedAt: number;
  country: string;
  rating: string;
  eventEntityId: string;
};

export const columns: ColumnDef<Vendors>[] = [
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
    cell: ({ row }) => {
      const name = row.getValue("name") as string;
      const formatted = name;
      return <div className="font-medium w-max">{formatted}</div>;
    },
  },
  {
    accessorKey: "serviceCategory",
    header: "Category",
  },
  // {
  //   accessorKey: "address",
  //   header: "Address",
  //   cell: ({ row }) => {
  //     const address = row.getValue("address") as string | "Venue Address";
  //     const formatted = address;
  //     return <div className="font-medium">{formatted}</div>;
  //   },
  // },
  // {
  //   accessorKey: "representativeContactName",
  //   header: "Representative Contact Name",
  // },
  {
    accessorKey: "representativeEmail",
    header: "Representative Email",
  
  },
  {
    accessorKey: "country",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="2xl:text-xl"
        >
          Country
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "rating",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="2xl:text-xl"
          
        >
          Rating
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const rating = row.getValue("rating") as string;
      const formatted = rating;
      return <div className="font-medium text-center">{formatted}</div>;
    }
  },
  {
    accessorKey: "lastModifiedTime",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="2xl:text-xl"
        >
          Updated At
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const updatedAt = row.getValue("lastModifiedTime") as any ;
      // const formatted = new Date(updatedAt).toDateString();
      return <div className="font-medium">{updatedAt}</div>;
    },
  },
  {
    accessorKey: "actions",
    header: "",
    cell: ({ row }) => {
      // console.log(row?.original?.eventEntityId);
      const eventEntityId = row?.original?.eventEntityId;
      return (
        <Link
          href={`/dashboard/edit/vendor/${eventEntityId}`}
          className="cursor-pointer 2xl:text-xl"
          // target="_blank"
          // rel="noopener noreferrer"
        >
          <p className="text-primary">Edit</p>
        </Link>
      );
    },
  },
];
