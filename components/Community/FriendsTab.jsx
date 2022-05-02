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

import { PersonDashFill } from "react-bootstrap-icons";

import axios from "axios";
import { mutate } from "swr";

const FriendsTab = ({ friends, id, setChat }) => {
  const toast = useToast();

  const remove = async (sender) => {
    const { data } = await axios.put("/api/account/friends", {
      sender,
      recipient: id,
    });
    if (data.status === "SUCCESS") {
      mutate(
        `/api/account/friends/${id}`,
        fetch(`/api/account/friends/${id}`).then((res) => res.json())
      );
      setChat(null);
      toast({
        title: `Cererea de prietenie a fost ștearsă cu succes!`,
        status: "success",
        duration: 4000,
        isClosable: true,
      });
    } else {
      toast({
        title: `A apărut o eroare. Vă rugam încercați din nou mai târziu!`,
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    }
  };

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
          <AlertTitle>Nu aveți prieteni!</AlertTitle>
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
          <Tooltip hasArrow label="Elimină prietenia" bg="red" color="white">
            <Button
              onClick={() => remove(friend._id)}
              colorScheme="red"
              size="sm"
              className="ml-auto"
            >
              <PersonDashFill className="text-white" />
            </Button>
          </Tooltip>
        </li>
      ))}
    </ul>
  );
};

export default FriendsTab;
