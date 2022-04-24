import React, { useState } from "react";

import AdminMenu from "./AdminMenu";
import RequestsMenu from "./RequestsMenu";
import ModMenu from "./ModMenu";
import PostMenu from "./PostMenu";

const AdminPanel = ({ user }) => {
  const [menu, setMenu] = useState("menu");
  return (
    <>
      {menu === "menu" && <AdminMenu user={user} setMenu={setMenu} />}
      {menu === "requests" && <RequestsMenu user={user} setMenu={setMenu} />}
      {menu === "mods" && <ModMenu user={user} setMenu={setMenu} />}
      {menu === "posts" && <PostMenu user={user} setMenu={setMenu} />}
    </>
  );
};

export default AdminPanel;
