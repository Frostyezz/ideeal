import React, { useContext, useState } from "react";

import { mutate } from "swr";

import { Avatar, Textarea, Button, useToast } from "@chakra-ui/react";

import { UserContext } from "../contexts/userContext";
import axios from "axios";
import { SendFill } from "react-bootstrap-icons";

const CreateComment = ({ id }) => {
  const { user } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const sendComment = async (e) => {
    e.preventDefault();
    const content = e.target.content.value;
    const comment = {
      content,
      authorID: user._id,
    };
    setLoading(true);
    const { data } = await axios.patch(`/api/post/stats/${id}`, { comment });
    setLoading(false);
    if (data.status === "SUCCESS") {
      mutate(
        `/api/post/stats/${id}`,
        fetch(`/api/post/stats/${id}`).then((res) => res.json())
      );
      toast({
        title: `Comentariul a fost postat cu succes!`,
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
    <div className="flex flex-col bg-blue p-3 rounded-xl  shadow-shadow_nav">
      <div className="flex flex-row items-center">
        <Avatar
          size="sm"
          name={`${user.firstName} ${user.lastName}`}
          src={user.img}
          className="mr-3"
        />
        <h1 className="font-bold">{`${user.firstName} ${user.lastName}`}</h1>
        {user.role !== "USER" && (
          <span className="bg-orange ml-2 rounded-xl px-2 h-6 my-auto">
            {user.role.replace("_", " ")}
          </span>
        )}
      </div>
      <form onSubmit={(e) => sendComment(e)} className="flex flex-row mt-2">
        <Textarea
          size="sm"
          rows={1}
          resize="none"
          name="content"
          required
          placeholder="Scrie un comentariu..."
          className="bg-white rounded no-scrollbar mr-2"
        />
        <Button isLoading={loading} type="submit">
          <SendFill />
        </Button>
      </form>
    </div>
  );
};

export default CreateComment;
