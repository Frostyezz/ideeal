import React from "react";

import Link from "next/link";

import {
  HouseFill,
  PersonPlusFill,
  PersonCheckFill,
} from "react-bootstrap-icons";

const NavPopUp = () => {
  return (
    <div className="fixed w-screen h-screen z-20 bg-white flex justify-center items-center flex flex-col pt-9 animate__animated animate__slideInLeft">
      <h1 className="text-6xl font-bold ml-20 md:ml-0 animate__animated animate__fadeIn animate__delay-1s">
        IdeeRO
      </h1>
      <ul className="flex flex-col justify-evenly h-full text-3xl text-center">
        <li>
          <Link href="/">
            <a className="flex justify-center items-center">
              <HouseFill className="mr-3 text-blue" />
              ACASĂ
            </a>
          </Link>
        </li>
        <li>
          <Link href="/signup">
            <a className="flex justify-center items-center">
              <PersonPlusFill className="mr-3 text-blue" />
              ÎNREGISTREAZĂ-TE
            </a>
          </Link>
        </li>
        <li>
          <Link href="/signin">
            <a className="flex justify-center items-center">
              <PersonCheckFill className="mr-3 text-blue" />
              LOGHEAZĂ-TE
            </a>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default NavPopUp;
