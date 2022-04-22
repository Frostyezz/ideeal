import React from "react";

import axios from "axios";

import { mutate } from "swr";

import { useToast, Button } from "@chakra-ui/react";

import { ArrowUpSquareFill, XSquareFill } from "react-bootstrap-icons";

const VoteButton = ({ id, user, upvoters }) => {
  const toast = useToast();

  const upvote = async () => {
    const { data } = await axios.patch(`/api/post/stats/${id}`, {
      upvoter: user,
    });
    if (data.status === "SUCCESS") {
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
        <Button
          onClick={upvote}
          leftIcon={<ArrowUpSquareFill className="text-blue" />}
          colorScheme="gray"
          className="my-2"
        >
          Votează
        </Button>
      ) : (
        <Button
          onClick={removeVote}
          leftIcon={<XSquareFill className="text-white" />}
          colorScheme="red"
          className="my-2"
        >
          Șterge votul
        </Button>
      )}
    </>
  );
};

export default VoteButton;
