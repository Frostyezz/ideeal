import React, { useState } from "react";

import SuperAdminMenu from "./SuperAdminMenu";
import ManageAdmins from "./ManageAdmins";

const SuperAdminPanel = ({ user }) => {
  const [menu, setMenu] = useState("menu");
  return (
    <>
      {menu === "menu" && <SuperAdminMenu user={user} setMenu={setMenu} />}
      {menu === "admins" && <ManageAdmins setMenu={setMenu} />}
    </>
  );
};

export default SuperAdminPanel;
