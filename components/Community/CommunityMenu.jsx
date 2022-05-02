import React, { useState } from "react";

import {
  Avatar,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Tooltip,
} from "@chakra-ui/react";

import {
  ChatDotsFill,
  PeopleFill,
  PersonPlusFill,
} from "react-bootstrap-icons";

import useSWR from "swr";
import axios from "axios";

import FriendsTab from "./FriendsTab";
import RequestsTab from "./RequestsTab";
import ChatsTab from "./ChatsTab";

const CommunityMenu = ({ user, setChat }) => {
  const fetcher = async (url) => await axios.get(url).then((res) => res.data);
  const { data, error } = useSWR(`/api/account/friends/${user._id}`, fetcher, {
    refreshInterval: 120000,
  });
  return (
    <div className="md:w-1/3 w-full bg-blue flex flex-col p-3">
      <div className="flex flex-row items-center">
        <Avatar
          size="md"
          name={`${user.firstName} ${user.lastName}`}
          src={user.img}
          className="mr-3"
        />
        <h1 className="text-xl">{`Salutări, ${user.firstName}!`}</h1>
      </div>
      <Tabs isLazy colorScheme="blue" className="mt-3">
        <TabList>
          <Tooltip bg="white" color="black" hasArrow label="Conversații">
            <Tab _focus={{}}>
              <ChatDotsFill className="text-xl" />
            </Tab>
          </Tooltip>
          <Tooltip bg="white" color="black" hasArrow label="Prieteni">
            <Tab _focus={{}}>
              <PeopleFill className="text-xl" />
            </Tab>
          </Tooltip>
          <Tooltip
            bg="white"
            color="black"
            hasArrow
            label="Cereri de prietenie"
          >
            <Tab _focus={{}}>
              <PersonPlusFill className="text-xl" />
            </Tab>
          </Tooltip>
        </TabList>
        <TabPanels>
          <TabPanel className="px-0">
            <ChatsTab user={user} setChat={setChat} friends={data?.friends} />
          </TabPanel>
          <TabPanel className="px-0 ">
            <FriendsTab
              setChat={setChat}
              id={user._id}
              friends={data?.friends}
            />
          </TabPanel>
          <TabPanel className="px-0 ">
            <RequestsTab id={user._id} requests={data?.requests} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  );
};

export default CommunityMenu;
