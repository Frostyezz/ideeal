import React, { useState, useEffect, useRef } from "react";

import Link from "next/link";

import { SendFill } from "react-bootstrap-icons";

import Message from "./Message";

import { Avatar, Input, Button } from "@chakra-ui/react";
import axios from "axios";

import { useChannel } from "../hooks/useChannel";

const Chat = ({ recipient, chat, user }) => {
  const [messages, setMessages] = useState(chat?.messages);
  useEffect(() => setMessages(chat?.messages), [recipient]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef(null);
  let messageEnd = null;

  const [channel, ably] = useChannel(chat?._id, (msg) => {
    setMessages([...messages, msg.data]);
  });

  const onSend = async (e) => {
    e.preventDefault();
    const message = {
      authorID: user._id,
      text: e.target.text.value.trim(),
    };
    setLoading(true);
    const { data } = await axios.patch(`/api/chat/${chat._id}`, { message });
    setLoading(false);
    if (data.status === "SUCCESS") {
      channel.publish({ name: "chat-message", data: message });
      document.getElementById("text").reset();
      inputRef?.current?.focus();
    }
  };

  useEffect(() => {
    messageEnd.scrollIntoView({ behaviour: "smooth" });
  });

  return (
    <div className="w-full h-full flex flex-col animate__animated animate__fadeIn">
      <div className="flex flex-row p-3 items-center bg-blue">
        <Avatar
          size="md"
          name={`${recipient.firstName} ${recipient.lastName}`}
          src={recipient.img}
          className="mr-2"
        />
        <Link href={`/account/${recipient._id}`}>
          <a className="text-2xl">{`${recipient.firstName} ${recipient.lastName}`}</a>
        </Link>
      </div>
      <div className="overflow-y-auto no-scrollbar h-96 p-3 w-full">
        {messages?.map((message, i) => (
          <Message
            key={i}
            isUser={message.authorID === user._id}
            user={user}
            recipient={recipient}
            message={message.text}
          />
        ))}
        <div
          ref={(element) => {
            messageEnd = element;
          }}
        />
      </div>
      <form
        id="text"
        onSubmit={(e) => onSend(e)}
        className="mt-auto flex flex-row m-2"
      >
        <Input
          autoComplete="off"
          isRequired
          ref={inputRef}
          className="border-blue mr-2"
          placeholder="Scrie un mesaj..."
          name="text"
        />
        <Button isLoading={loading} colorScheme="blue" type="submit">
          <SendFill />
        </Button>
      </form>
    </div>
  );
};

export default Chat;
