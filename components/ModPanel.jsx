import React, { useState } from "react";

import ReportMenu from "./ReportMenu";
import ModeratorMenu from "./ModeratorMenu";

const ModPanel = ({ user }) => {
  const [menu, setMenu] = useState("menu");
  return (
    <>
      {menu === "menu" && <ModeratorMenu user={user} setMenu={setMenu} />}
      {menu === "reports" && <ReportMenu user={user} setMenu={setMenu} />}
    </>
  );
};

export default ModPanel;
