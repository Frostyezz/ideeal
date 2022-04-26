import React, { useContext, useState } from "react";

import { Avatar, Textarea, Button, useToast } from "@chakra-ui/react";

import Moment from "react-moment";
import "moment/locale/ro";

import ShowMoreText from "react-show-more-text";

import { UserContext } from "../contexts/userContext";

import useSWR, { mutate } from "swr";
import axios from "axios";
import { SendFill } from "react-bootstrap-icons";

const Comment = ({ comment, id }) => {
  const [loading, setLoading] = useState(false);
  const { user } = useContext(UserContext);
  const fetcher = async (url) => await axios.get(url).then((res) => res.data);
  const { data, error } = useSWR(`/api/account/${comment.authorID}`, fetcher, {
    refreshInterval: 120000,
  });
  const toast = useToast();

  const sendReply = async (e) => {
    e.preventDefault();
    setLoading(true);
    const content = e.target.content.value;
    const comment = {
      content,
      authorID: user._id,
      reply: {
        name: data.user.firstName,
        id: data.user._id,
      },
    };
    const res = await axios.patch(`/api/post/stats/${id}`, { comment });
    setLoading(false);
    if (res.data.status === "SUCCESS") {
      mutate(
        `/api/post/stats/${id}`,
        fetch(`/api/post/stats/${id}`).then((res) => res.json())
      );
      toast({
        title: `Răspunsul tău a fost postat cu succes!`,
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
      {data && (
        <li
          id={comment._id}
          className="flex flex-col bg-blue p-3 rounded-xl mt-2 shadow-shadow_nav animate__animated animate__fadeIn animate__faster"
        >
          <div className="flex flex-row border-b border-white pb-3 items-center">
            <Avatar
              size="md"
              name={`${data.user.firstName} ${data.user.lastName}`}
              src={data.user.img}
              className="mr-3"
            />

            <div className="flex flex-col">
              <div className="flex flex-row">
                <h1 className="font-bold">{`${data.user.firstName} ${data.user.lastName}`}</h1>
                {data.user.role !== "USER" && (
                  <div className="bg-orange ml-2 rounded-xl px-2 h-6 my-auto">
                    {data.user.role.replace("_", " ")}
                  </div>
                )}
              </div>
              <div className="flex flex-row">
                <span>
                  Trimis acum{" "}
                  <Moment fromNow locale="ro">
                    {comment.postedAt}
                  </Moment>
                </span>
              </div>
              {comment.reply && (
                <div>
                  {comment.reply.id === user?._id ? (
                    <span className="text-orange">
                      Ți-a răspuns la comentariu
                    </span>
                  ) : (
                    <span>I-a răspuns lui {comment.reply.name}</span>
                  )}
                </div>
              )}
            </div>
          </div>
          <div className="mt-2 flex flex-row">
            <ShowMoreText
              lines={2}
              more="Mai mult"
              less="Mai puțin"
              anchorClass="underline"
              expanded={false}
              truncatedEndingComponent={"... "}
            >
              <p>{comment.content}</p>
            </ShowMoreText>
          </div>
          {user && (
            <form
              onSubmit={(e) => sendReply(e)}
              className="flex flex-row mt-2 pt-2 border-t border-white items-center"
            >
              <Avatar
                size="sm"
                name={`${user.firstName} ${user.lastName}`}
                src={user.img}
                className="mr-3"
              />
              <Textarea
                size="sm"
                rows={1}
                resize="none"
                name="content"
                required
                placeholder="Răspunde..."
                className="bg-white rounded no-scrollbar mr-2"
              />
              <Button isLoading={loading} type="submit">
                <SendFill />
              </Button>
            </form>
          )}
        </li>
      )}
    </>
  );
};

export default Comment;
