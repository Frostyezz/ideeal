import React, { useState } from "react";

import Head from "next/head";

import Navbar from "./Navbar";
import NavPopUp from "./NavPopUp";

const Layout = ({ children }) => {
  const [nav, showNav] = useState(false);
  return (
    <>
      <Head>
        <title>IdeeRO</title>
      </Head>
      <Navbar showNav={() => showNav(!nav)} />
      {nav && <NavPopUp showNav={() => showNav(!nav)} />}
      {children}
    </>
  );
};

export default Layout;
