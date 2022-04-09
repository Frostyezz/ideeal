import React, { useEffect, useState } from "react";

import AdminMenu from "./AdminMenu";
import RequestsMenu from "./RequestsMenu";
import ModMenu from "./ModMenu";

const AdminPanel = ({ user }) => {
  const [menu, setMenu] = useState("menu");
  return (
    <>
      {menu === "menu" && <AdminMenu user={user} setMenu={setMenu} />}
      {menu === "requests" && <RequestsMenu user={user} setMenu={setMenu} />}
      {menu === "mods" && <ModMenu user={user} setMenu={setMenu} />}
    </>
  );
};

export default AdminPanel;
