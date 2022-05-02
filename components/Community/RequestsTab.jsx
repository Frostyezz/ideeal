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
import { Trash3Fill, PersonCheckFill } from "react-bootstrap-icons";

import axios from "axios";
import { mutate } from "swr";

const RequestsTab = ({ requests, id }) => {
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

  const accept = async (sender) => {
    const { data } = await axios.post("/api/account/friends", {
      sender: id,
      recipient: sender,
    });
    if (data.status === "SUCCESS") {
      mutate(
        `/api/account/friends/${id}`,
        fetch(`/api/account/friends/${id}`).then((res) => res.json())
      );
      toast({
        title: `Acum sunteți prieteni!`,
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

  if (!requests)
    return (
      <div className="md:h-96 flex items-center justify-center">
        <CircularProgress size="50px" isIndeterminate className="mx-auto" />
      </div>
    );

  if (!requests.length)
    return (
      <div className="md:h-96 flex items-center justify-center">
        <Alert status="info">
          <AlertIcon />
          <AlertTitle>Nu aveți cereri de prietenie!</AlertTitle>
        </Alert>
      </div>
    );

  return (
    <ul className="md:h-96 overflow-auto no-scrollbar flex flex-col animate__animated animate__fadeIn">
      {requests?.map((request, i) => (
        <li
          key={i}
          className="flex flex-row items-center my-1 bg-white p-2 rounded-xl shadow"
        >
          <Avatar
            size="sm"
            name={`${request.firstName} ${request.lastName}`}
            src={request.img}
            className="mr-1"
          />
          <Link
            href={`/account/${request._id}`}
          >{`${request.firstName} ${request.lastName}`}</Link>
          <div className="flex flex-row ml-auto">
            <Tooltip
              hasArrow
              label="Acceptă cererea de prietenie"
              bg="white"
              color="black"
            >
              <Button
                onClick={() => accept(request._id)}
                colorScheme="blue"
                size="sm"
                className="mr-1"
              >
                <PersonCheckFill className="text-white" />
              </Button>
            </Tooltip>
            <Tooltip
              hasArrow
              label="Șterge cererea de prietenie"
              bg="red"
              color="white"
            >
              <Button
                onClick={() => remove(request._id)}
                colorScheme="red"
                size="sm"
              >
                <Trash3Fill className="text-white" />
              </Button>
            </Tooltip>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default RequestsTab;
