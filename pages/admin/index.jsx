import React, { useContext, useEffect } from "react";

import { useRouter } from "next/router";

import { UserContext } from "../../contexts/userContext";

import AdminPanel from "../../components/AdminPanel";
import SuperAdminPanel from "../../components/SuperAdminPanel";

const Admin = () => {
  const router = useRouter();
  const { user } = useContext(UserContext);
  useEffect(() => {
    if (!user || user.role === "USER") router.push("/feed");
  }, []);
  return (
    <div className="w-screen min-h-screen flex justify-center items-center bg-gray overflow-x-hidden">
      {user && user.role === "ADMIN" && <AdminPanel user={user} />}
      {user && user.role === "SUPER_ADMIN" && <SuperAdminPanel user={user} />}
    </div>
  );
};

export default Admin;
