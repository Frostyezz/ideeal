import React from "react";

import { List } from "react-bootstrap-icons";

const Navbar = ({ showNav }) => {
  return (
    <nav
      onClick={showNav}
      className="fixed top inset-5 md:inset-10 text-5xl hover:translate-y-1 transition duration-500 bg-white z-50 w-max h-max rounded shadow-shadow_nav cursor-pointer"
    >
      <List />
    </nav>
  );
};

export default Navbar;
