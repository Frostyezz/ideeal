import React from "react";

import { Avatar } from "@chakra-ui/react";

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
      <p className="rounded-xl bg-blue shadow p-2 md:max-w-xs max-mobile">
        {message}
      </p>
    </div>
  );
};

export default Message;
