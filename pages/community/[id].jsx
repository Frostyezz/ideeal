import React, { useState } from "react";

import CommunityMenu from "../../components/CommunityMenu";
import Chat from "../../components/Chat";

const Community = ({ user }) => {
  const [chat, setChat] = useState(null);
  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="md:w-4/5 w-full flex md:flex-row flex-col bg-white shadow-shadow_nav">
        <CommunityMenu user={user} setChat={(id) => setChat(id)} />
        <div className="md:w-2/3 ">
          <Chat chat={chat} recipient={chat?.recipient} user={user} />
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
