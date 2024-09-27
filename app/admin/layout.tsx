import React, { Fragment } from "react";
import { cookies } from "next/headers";
import ProtectAdmin from "@/components/admin/ProtectAdmin";
const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const cookieStore = cookies();
  const isAdmin = cookieStore.get("userRole");
  let isAdminV: boolean =
    isAdmin === undefined ? false : isAdmin.value === "admin";
  return (
    <Fragment>
      <ProtectAdmin isAdminV={isAdminV}>{children}</ProtectAdmin>
    </Fragment>
  );
};

export default AdminLayout;
