"use client";
import { cn } from "@/lib/utils";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

const ProtectAdmin = ({
  children,
  isAdminV,
}: {
  children: React.ReactNode;
  isAdminV: boolean;
}) => {
  const router = useRouter();
  useEffect(() => {
    if (!isAdminV) {
      router.push("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <div className={cn(isAdminV ? "block" : "hidden")}>{children}</div>;
};

export default ProtectAdmin;
