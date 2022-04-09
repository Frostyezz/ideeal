import React, { useState, useEffect } from "react";

import { FileEarmarkPersonFill, ShieldShaded } from "react-bootstrap-icons";

import axios from "axios";

const AdminMenu = ({ user, setMenu }) => {
  const [count, setCount] = useState(null);
  useEffect(() => {
    axios
      .post("/api/account/pending", {
        city: user.location.city,
        county: user.location.county,
      })
      .then(({ data }) => data.status === "SUCCESS" && setCount(data.count));
  }, []);

  return (
    <div className="p-5 w-full h-full md:w-2/3">
      <h1 className="text-3xl mb-10 text-center animate__animated animate__slideInDown">
        Salutări, {user.firstName}!
      </h1>
      <div className="flex md:flex-row flex-col justify-evenly items-center">
        <div className="animate__animated animate__fadeInLeft animate__delay-0.7s">
          <div
            onClick={() => setMenu("requests")}
            className="text-center cursor-pointer hover:-rotate-3 hover:bg-blue transition duration-500 flex flex-col bg-white rounded p-5 items-center justify-center md:mb-0 mb-5 h-72 w-72 shadow-shadow_nav"
          >
            <FileEarmarkPersonFill className="text-9xl" />
            <h1 className="text-xl mt-10 font-bold">Cereri de înregistrare</h1>
            {count !== null && (
              <p>
                {count ? `Există ${count}` : "Nu există"}{" "}
                {count === 1 ? "cerere" : "cereri"} în așteptare.
              </p>
            )}
          </div>
        </div>
        <div className="animate__animated animate__fadeInRight animate__delay-0.7s">
          <div
            onClick={() => setMenu("mods")}
            className="text-center cursor-pointer hover:rotate-3 hover:bg-blue transition duration-500 flex flex-col bg-white rounded p-5 items-center justify-center h-72 w-72 shadow-shadow_nav"
          >
            <ShieldShaded className="text-9xl" />
            <h1 className="text-xl mt-10 font-bold">Gestionare moderatori</h1>
            <p>Nu există moderatori desemnați</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminMenu;
