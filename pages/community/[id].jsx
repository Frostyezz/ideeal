import React, { useState } from "react";

import { ChatDotsFill } from "react-bootstrap-icons";

import CommunityMenu from "../../components/Community/CommunityMenu";
import Chat from "../../components/Community/Chat";

const Community = ({ user }) => {
  const [chat, setChat] = useState(null);
  return (
    <div className="min-h-screen flex justify-center md:items-center md:pt-0 pt-20">
      <div className="md:w-4/5 w-full flex md:flex-row flex-col bg-white shadow-shadow_nav">
        <CommunityMenu user={user} setChat={setChat} />
        <div className="md:w-2/3 ">
          {chat ? (
            <Chat chat={chat} recipient={chat?.recipient} user={user} />
          ) : (
            <div className="w-full h-full my-5 md:my-0 flex flex-col justify-center items-center">
              <ChatDotsFill className="text-blue text-9xl mb-5" />
              <h1 className="text-center">
                Deschide o conversație pentru a trimite mesaje.
              </h1>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export async function getServerSideProps(ctx) {
  try {
    const { id } = ctx.params;
    const baseURL = !process.env.VERCEL_URL
      ? "http://localhost:3000"
      : `https://${process.env.VERCEL_URL}`;
    const res = await fetch(`${baseURL}/api/account/${id}`);
    const data = await res.json();
    if (data.status === "SUCCESS" && data.user)
      return { props: { user: data.user } };
    return {
      redirect: {
        permanent: false,
        destination: "/404",
      },
      props: {},
    };
  } catch (error) {
    return {
      redirect: {
        permanent: false,
        destination: "/404",
      },
      props: {},
    };
  }
}

export default Community;
