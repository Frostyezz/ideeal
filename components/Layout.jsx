import React, { useState } from "react";

import Navbar from "./Navbar";
import NavPopUp from "./NavPopUp";

const Layout = ({ children }) => {
  const [nav, showNav] = useState(false);

  return (
    <>
      <Navbar showNav={() => showNav(!nav)} />
      {nav && <NavPopUp />}
      {children}
    </>
  );
};

export default Layout;
