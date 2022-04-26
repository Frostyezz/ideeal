import React, { useState } from "react";

import useSWR from "swr";

import UserProfile from "../../components/UserProfile";

const Account = ({ account }) => {
  const fetcher = async (url) => await axios.get(url).then((res) => res.data);
  const { data, error } = useSWR(`/api/account/${account._id}`, fetcher, {
    refreshInterval: 60000,
  });
  const [profile, setProfile] = useState(
    data?.status === "SUCCESS" ? data.user : account
  );
  return (
    <div className="flex flex-col min-h-screen md:justify-center items-center">
      <UserProfile account={profile} />
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
      return { props: { account: data.user } };
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

export default Account;
