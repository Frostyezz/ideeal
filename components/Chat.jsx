import React, { useState, useEffect, useRef } from "react";

import Link from "next/link";

import { ChatDotsFill, SendFill } from "react-bootstrap-icons";

import Message from "./Message";

import { Avatar, Input, Button } from "@chakra-ui/react";
import axios from "axios";

import Pusher from "pusher-js";

const Chat = ({ recipient, user }) => {
  const [chat, setChat] = useState(null);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (!recipient) return;
    axios
      .post("/api/chat", { sender: user._id, recipient: recipient._id })
      .then(({ data }) => {
        if (data.status === "SUCCESS") {
          setChat(data.chat);

          Pusher.logToConsole = true;
          const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY, {
            cluster: "eu",
          });
          const channel = pusher.subscribe(data?.chat._id);
          channel.bind("message", function (data) {
            const message = JSON.parse(data.message);
            const messages = chat.messages;
            messages.push(message);
            setChat({
              ...chat,
              messages,
            });
          });
        }
      });
  }, [recipient]);

  useEffect(() => {
    if (chat && "messages" in chat) {
    }
  }, [chat]);

  const onSend = async (e) => {
    e.preventDefault();
    const message = {
      authorID: user._id,
      text: e.target.text.value,
    };
    setLoading(true);
    const { data } = await axios.patch(`/api/chat/${chat._id}`, { message });
    setLoading(false);
    if (data.status === "SUCCESS") {
      document.getElementById("text").reset();
      inputRef?.current?.focus();
    }
  };

  if (!recipient)
    return (
      <div className="w-full h-full my-5 md:my-0 flex flex-col justify-center items-center">
        <ChatDotsFill className="text-blue text-9xl mb-5" />
        <h1 className="text-center">
          Deschide o conversație pentru a trimite mesaje.
        </h1>
      </div>
    );

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
        {chat?.messages.map((message, i) => (
          <Message
            key={i}
            isUser={message.authorID === user._id}
            user={user}
            recipient={recipient}
            message={message.text}
          />
        ))}
      </div>
      <form
        id="text"
        onSubmit={(e) => onSend(e)}
        className="mt-auto flex flex-row m-2"
      >
        <Input
          isRequired
          ref={inputRef}
          className="border-blue mr-2"
          placeholder="Scrie un mesaj..."
          name="text"
        />
        <Button colorScheme="blue" type="submit">
          <SendFill />
        </Button>
      </form>
    </div>
  );
};

export default Chat;
