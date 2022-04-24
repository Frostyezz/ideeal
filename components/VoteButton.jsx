import React from "react";

import axios from "axios";

import { mutate } from "swr";

import { useToast, Button, Tooltip } from "@chakra-ui/react";

import { ArrowDownSquareFill, ArrowUpSquareFill } from "react-bootstrap-icons";

const VoteButton = ({ id, user, upvoters }) => {
  const toast = useToast();

  const upvote = async () => {
    const { data } = await axios.patch(`/api/post/stats/${id}`, {
      upvoter: user,
    });
    if (data.status === "SUCCESS") {
      mutate(
        `/api/feed/${user}`,
        fetch(`/api/feed/${user}`).then((res) => res.json())
      );
      mutate(
        `/api/post/stats/${id}`,
        fetch(`/api/post/stats/${id}`).then((res) => res.json())
      );
    } else {
      toast({
        title: `A apărut o eroare. Vă rugam încercați din nou mai târziu!`,
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    }
  };

  const removeVote = async () => {
    const { data } = await axios.put(`/api/post/stats/${id}`, {
      upvoter: user,
    });
    if (data.status === "SUCCESS") {
      mutate(
        `/api/feed/${user}`,
        fetch(`/api/feed/${user}`).then((res) => res.json())
      );
      mutate(
        `/api/post/stats/${id}`,
        fetch(`/api/post/stats/${id}`).then((res) => res.json())
      );
    } else {
      toast({
        title: `A apărut o eroare. Vă rugam încercați din nou mai târziu!`,
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    }
  };

  return (
    <>
      {!upvoters.includes(user) ? (
        <Tooltip hasArrow label="Votează" bg="white" color="black">
          <Button onClick={upvote} colorScheme="gray" className="my-2 ">
            <ArrowUpSquareFill />
          </Button>
        </Tooltip>
      ) : (
        <Tooltip hasArrow label="Șterge votul" bg="red" color="white">
          <Button onClick={removeVote} colorScheme="red" className="my-2 ">
            <ArrowDownSquareFill className="text-white" />
          </Button>
        </Tooltip>
      )}
    </>
  );
};

export default VoteButton;
