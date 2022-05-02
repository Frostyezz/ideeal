import React, { useState, useContext } from "react";

import { useRouter } from "next/router";

import axios from "axios";

import { mutate } from "swr";

import { UserContext } from "../../contexts/userContext";

import { Trash3Fill } from "react-bootstrap-icons";

import DeletePostDialog from "./DeletePostDialog";

import { useDisclosure, useToast, MenuItem } from "@chakra-ui/react";

const DeletePost = ({ id }) => {
  const { user } = useContext(UserContext);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const router = useRouter();

  const toast = useToast();

  const [loading, setLoading] = useState(false);

  const deletePost = async () => {
    setLoading(true);
    const { data } = await axios.delete(`/api/post/${id}`);
    setLoading(false);
    if (data.status === "SUCCESS") {
      if (!router.pathname.includes("/post")) {
        mutate(
          `/api/feed/${user._id}`,
          fetch(`/api/feed/${user._id}`).then((res) => res.json())
        );
        onClose();
        toast({
          title: `Postarea a fost ștearsă!`,
          status: "success",
          duration: 4000,
          isClosable: true,
        });
      } else {
        onClose();
        toast({
          title: `Postarea a fost ștearsă!`,
          status: "success",
          duration: 4000,
          isClosable: true,
        });
        router.push("/feed");
      }
    } else {
      onClose();
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
      <MenuItem onClick={onOpen} icon={<Trash3Fill className="text-blue" />}>
        Șterge
      </MenuItem>
      <DeletePostDialog
        loading={loading}
        handler={deletePost}
        isOpen={isOpen}
        onClose={onClose}
      />
    </>
  );
};

export default DeletePost;
