import React, { useState, useEffect } from "react";

import {
  FileEarmarkPersonFill,
  ShieldShaded,
  FileEarmarkPostFill,
} from "react-bootstrap-icons";

import axios from "axios";

const AdminMenu = ({ user, setMenu }) => {
  const [requests, setRequests] = useState(null);
  const [mods, setMods] = useState(null);
  useEffect(() => {
    axios
      .post("/api/account/pending", {
        city: user.location.city,
        county: user.location.county,
      })
      .then(({ data }) => data.status === "SUCCESS" && setRequests(data.count));
    axios
      .post("/api/account/mod", {
        city: user.location.city,
        county: user.location.county,
      })
      .then(({ data }) => data.status === "SUCCESS" && setMods(data.count));
  }, []);

  return (
    <div className="p-5 w-full h-full ">
      <h1 className="text-3xl mt-2 text-center animate__animated animate__slideInDown">
        Salutări, {user.firstName}!
      </h1>
      <div className="flex md:flex-row flex-col justify-around items-center flex-wrap">
        <div className="animate__animated animate__fadeInLeft animate__delay-0.7s">
          <div
            onClick={() => setMenu("requests")}
            className="text-center cursor-pointer hover:-rotate-3 hover:bg-blue transition duration-500 flex flex-col bg-white rounded p-5 items-center justify-center mt-5 h-72 w-72 shadow-shadow_nav"
          >
            <FileEarmarkPersonFill className="text-9xl" />
            <h1 className="text-xl mt-10 font-bold">Cereri de înregistrare</h1>
            {requests !== null && (
              <p>
                {requests ? `Există ${requests}` : "Nu există"}{" "}
                {requests === 1 ? "cerere" : "cereri"} în așteptare.
              </p>
            )}
          </div>
        </div>
        <div className="animate__animated animate__fadeIn animate__delay-0.7s">
          <div
            onClick={() => setMenu("mods")}
            className="mt-5 text-center cursor-pointer  hover:bg-blue transition duration-500 flex flex-col bg-white rounded p-5 items-center justify-center h-72 w-72 shadow-shadow_nav"
          >
            <ShieldShaded className="text-9xl" />
            <h1 className="text-xl mt-10 font-bold">Gestionare moderatori</h1>
            {mods !== null && (
              <p>
                {mods ? `Există ${mods}` : "Nu există"}{" "}
                {mods === 1 ? "moderator" : "moderatori"}.
              </p>
            )}
          </div>
        </div>
        <div className="animate__animated animate__fadeInRight animate__delay-0.7s">
          <div
            onClick={() => setMenu("posts")}
            className="mt-5 text-center cursor-pointer hover:rotate-3 hover:bg-blue transition duration-500 flex flex-col bg-white rounded p-5 items-center justify-center h-72 w-72 shadow-shadow_nav"
          >
            <FileEarmarkPostFill className="text-9xl" />
            <h1 className="text-xl mt-10 font-bold">Gestionare postări</h1>
            <p>Nu există postări</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminMenu;
