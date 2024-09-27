"use client";

import { ColumnDef } from "@tanstack/react-table";


export type History = {
  sharedVenueVendorId: string;
  sharedDate: string;
  type: string;
  userEmail: string;
};

export const columns: ColumnDef<History>[] = [
  {
    accessorKey: "type",
    header: "Shared ",
    cell: ({ row }) => {
      const type = row.getValue("type") as string;
      return <div className="font-medium">{type}</div>;
    },
  },
  {
    accessorKey: "userEmail",
    header: "To User",
    cell: ({ row }) => {
      const userEmail = row.getValue("userEmail") as string;
      return <div className="font-medium">{userEmail}</div>;
    },
  },
  {
    accessorKey: "sharedDate",
    header: "Share Date",
    cell: ({ row }) => {
      const sharedDate = row.getValue("sharedDate") as number;
      const formatted = new Date(sharedDate).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
      return <div className="font-medium">{formatted}</div>;
    },
  },
];
