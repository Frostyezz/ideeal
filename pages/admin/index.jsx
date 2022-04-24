import React, { useContext } from "react";

import { useRouter } from "next/router";

import { UserContext } from "../../contexts/userContext";

import AdminPanel from "../../components/AdminPanel";
import SuperAdminPanel from "../../components/SuperAdminPanel";
import ModPanel from "../../components/ModPanel";

const Admin = () => {
  const router = useRouter();
  const { user } = useContext(UserContext);
  return (
    <div className="w-screen min-h-screen flex justify-center items-center bg-gray overflow-x-hidden">
      {user && user.role === "ADMIN" && <AdminPanel user={user} />}
      {user && user.role === "SUPER_ADMIN" && <SuperAdminPanel user={user} />}
      {user && user.role === "MODERATOR" && <ModPanel user={user} />}
    </div>
  );
};

export default Admin;
