import React from "react";

import { Avatar, Tooltip } from "@chakra-ui/react";

import moment from "moment";
import "moment/locale/ro";

const Message = ({ isUser, user, recipient, message }) => {
  return (
    <div
      className={`flex my-2 ${
        isUser ? "flex-row-reverse" : "flex-row"
      } animate__animated animate__fadeInUp animate__faster`}
    >
      <Avatar
        size="sm"
        name={
          isUser
            ? `${user.firstName} ${user.lastName}`
            : `${recipient.firstName} ${recipient.lastName}`
        }
        src={isUser ? user.img : recipient.img}
        className="mx-2 my-auto"
      />
      <Tooltip
        hasArrow
        placement="top"
        label={moment(message.sent).format("LLL")}
        bg="white"
        color="black"
      >
        <p
          className={`${
            isUser ? "bg-orange text-white" : "bg-blue"
          } rounded-xl shadow p-2 md:max-w-xs max-mobile`}
        >
          {message.text}
        </p>
      </Tooltip>
    </div>
  );
};

export default Message;
