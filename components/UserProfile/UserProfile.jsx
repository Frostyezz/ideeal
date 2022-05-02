import React from "react";

import Moment from "react-moment";
import "moment/locale/ro";

import { Avatar } from "@chakra-ui/react";

import UserActions from "./UserActions";
import UserStats from "./UserStats";

const UserProfile = ({ account }) => {
  return (
    <div className="w-full md:w-2/3 shadow-shadow_nav animate__animated animate__fadeIn">
      <div className="flex p-3 bg-blue md:flex-row flex-col items-center text-center md:text-left md:items-end">
        <Avatar
          size="2xl"
          name={`${account.firstName} ${account.lastName}`}
          src={account.img}
          className="mr-3 my-auto"
        />
        <div className="flex-col flex mb-5 md:mb-0">
          {account.role !== "USER" && (
            <span className="bg-orange mt-3 max-w-min mx-auto md:mx-0 rounded-xl px-2 h-6 my-auto">
              {account.role}
            </span>
          )}
          <h1 className="text-5xl font-bold my-1">{`${account.firstName} ${account.lastName}`}</h1>
          <div className="flex flex-row text-xl">
            <span>
              S-a alăturat acum{" "}
              <Moment fromNow locale="ro">
                {account.joined}
              </Moment>
            </span>
          </div>
        </div>
        <div className="md:ml-auto md:my-auto ">
          <UserActions id={account._id} />
        </div>
      </div>
      <UserStats account={account} />
    </div>
  );
};

export default UserProfile;
