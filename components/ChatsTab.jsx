import React from "react";

import Link from "next/link";

import {
  CircularProgress,
  Avatar,
  Alert,
  AlertIcon,
  AlertTitle,
  Button,
  Tooltip,
  useToast,
} from "@chakra-ui/react";

import { ChatDotsFill } from "react-bootstrap-icons";

const ChatsTab = ({ friends, setChat }) => {
  if (!friends)
    return (
      <div className="md:h-96 flex items-center justify-center">
        <CircularProgress size="50px" isIndeterminate className="mx-auto" />
      </div>
    );

  if (!friends.length)
    return (
      <div className="md:h-96 flex items-center justify-center">
        <Alert status="info">
          <AlertIcon />
          <AlertTitle>Nu există conversații!</AlertTitle>
        </Alert>
      </div>
    );

  return (
    <ul className="md:h-96 overflow-auto no-scrollbar flex flex-col animate__animated animate__fadeIn">
      {friends?.map((friend, i) => (
        <li
          key={i}
          className="flex flex-row items-center my-1 bg-white p-2 rounded-xl shadow"
        >
          <Avatar
            size="sm"
            name={`${friend.firstName} ${friend.lastName}`}
            src={friend.img}
            className="mr-1"
          />
          <Link
            href={`/account/${friend._id}`}
          >{`${friend.firstName} ${friend.lastName}`}</Link>
          <Tooltip
            hasArrow
            label="Deschide conversația"
            bg="white"
            color="black"
          >
            <Button
              onClick={() => setChat(friend)}
              colorScheme="blue"
              size="sm"
              className="ml-auto"
            >
              <ChatDotsFill className="text-white" />
            </Button>
          </Tooltip>
        </li>
      ))}
    </ul>
  );
};

export default ChatsTab;
