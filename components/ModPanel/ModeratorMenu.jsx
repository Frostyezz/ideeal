import React from "react";
import { FlagFill } from "react-bootstrap-icons";

const ModeratorMenu = ({ user, setMenu }) => {
  return (
    <div className="p-5 w-full h-full ">
      <h1 className="text-3xl mt-2 text-center animate__animated animate__slideInDown">
        Salutări, {user.firstName}!
      </h1>
      <div className="flex md:flex-row flex-col justify-around items-center flex-wrap">
        <div className="animate__animated animate__fadeIn animate__delay-0.7s">
          <div
            onClick={() => setMenu("reports")}
            className="text-center cursor-pointer hover:-rotate-3 hover:bg-blue transition duration-500 flex flex-col bg-white rounded p-5 items-center justify-center mt-5 h-72 w-72 shadow-shadow_nav"
          >
            <FlagFill className="text-9xl" />
            <h1 className="text-xl mt-10 font-bold">
              Gestionare postări raportate
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModeratorMenu;
