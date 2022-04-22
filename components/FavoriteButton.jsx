import React from "react";

import axios from "axios";

import { mutate } from "swr";

import { useToast, Button } from "@chakra-ui/react";

import { StarFill } from "react-bootstrap-icons";

const FavoriteButton = ({ favorites, user, id }) => {
  const toast = useToast();

  const addToFavorites = async () => {
    const { data } = await axios.patch(`/api/post/stats/${id}`, {
      user,
    });
    if (data.status === "SUCCESS") {
      mutate(
        `/api/post/stats/${id}`,
        fetch(`/api/post/stats/${id}`).then((res) => res.json())
      );
      toast({
        title: `Postarea a fost adăugată cu succes la favorite!`,
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

  const removeFromFavorites = async () => {
    const { data } = await axios.put(`/api/post/stats/${id}`, {
      user,
    });
    if (data.status === "SUCCESS") {
      mutate(
        `/api/post/stats/${id}`,
        fetch(`/api/post/stats/${id}`).then((res) => res.json())
      );
      toast({
        title: `Postarea a fost ștearsă cu succes de la favorite!`,
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
  return (
    <>
      {!favorites.includes(user) ? (
        <Button
          leftIcon={<StarFill className="text-blue" />}
          colorScheme="gray"
          className="my-2"
          onClick={addToFavorites}
        >
          Adaugă la favorite
        </Button>
      ) : (
        <Button
          leftIcon={<StarFill className="text-white" />}
          colorScheme="red"
          className="my-2"
          onClick={removeFromFavorites}
        >
          Șterge de la favorite
        </Button>
      )}
    </>
  );
};

export default FavoriteButton;
