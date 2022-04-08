import React, { useContext } from "react";

import Link from "next/link";

import axios from "axios";

import {
  HouseFill,
  PersonPlusFill,
  PersonCheckFill,
  PersonFill,
  PersonXFill,
  FileRichtextFill,
  ShieldFillCheck,
} from "react-bootstrap-icons";

import { useRouter } from "next/router";

import { UserContext } from "../contexts/userContext";

const NavPopUp = ({ showNav }) => {
  const { user, removeUser } = useContext(UserContext);

  const router = useRouter();

  const logOut = async () => {
    const { data } = await axios.get("/api/account/logout");
    if (data.status === "SUCCESS") {
      removeUser();
      showNav();
      router.push("/");
    }
  };

  return (
    <div className="fixed w-screen h-screen z-20 bg-white flex justify-center items-center flex flex-col pt-9 animate__animated animate__slideInLeft">
      <h1 className="text-6xl font-bold ml-20 md:ml-0 animate__animated animate__fadeIn animate__delay-1s">
        IdeeRO
      </h1>
      <ul className="flex flex-col justify-evenly h-full text-2xl md:text-3xl text-center">
        {!user ? (
          <>
            <li>
              <Link href="/">
                <a
                  onClick={showNav}
                  className="flex justify-center items-center"
                >
                  <HouseFill className="mr-3 text-blue" />
                  ACASĂ
                </a>
              </Link>
            </li>
            <li>
              <Link href="/signup">
                <a
                  onClick={showNav}
                  className="flex justify-center items-center"
                >
                  <PersonPlusFill className="mr-3 text-blue" />
                  ÎNREGISTREAZĂ-TE
                </a>
              </Link>
            </li>
            <li>
              <Link href="/signin">
                <a
                  onClick={showNav}
                  className="flex justify-center items-center"
                >
                  <PersonCheckFill className="mr-3 text-blue" />
                  LOGHEAZĂ-TE
                </a>
              </Link>
            </li>
          </>
        ) : (
          <>
            {user.role !== "USER" && (
              <li>
                <Link href={`/admin`}>
                  <a
                    onClick={showNav}
                    className="flex justify-center items-center"
                  >
                    <ShieldFillCheck className="mr-3 text-blue" />
                    PANOU DE ADMINISTRARE
                  </a>
                </Link>
              </li>
            )}
            <li>
              <Link href="/feed">
                <a
                  onClick={logOut}
                  className="flex justify-center items-center"
                >
                  <FileRichtextFill className="mr-3 text-blue" />
                  POSTĂRI
                </a>
              </Link>
            </li>
            <li>
              <Link href={`/account/${user._id}`}>
                <a
                  onClick={showNav}
                  className="flex justify-center items-center"
                >
                  <PersonFill className="mr-3 text-blue" />
                  CONTUL MEU
                </a>
              </Link>
            </li>
            <li>
              <div className="flex justify-center items-center">
                <div
                  onClick={logOut}
                  className="flex justify-center items-center cursor-pointer"
                >
                  <PersonXFill className="mr-3 text-blue" />
                  IEȘI DIN CONT
                </div>
              </div>
            </li>
          </>
        )}
      </ul>
    </div>
  );
};

export default NavPopUp;
