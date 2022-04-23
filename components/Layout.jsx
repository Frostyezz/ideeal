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
        <link rel="shortcut icon" href="/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
      </Head>
      <Navbar showNav={() => showNav(!nav)} />
      {nav && <NavPopUp showNav={() => showNav(!nav)} />}
      {children}
    </>
  );
};

export default Layout;
