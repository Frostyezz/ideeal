import React, { useContext } from "react";

import { UserContext } from "../../contexts/userContext";

import useSWR from "swr";

import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useToast,
} from "@chakra-ui/react";
import {
  PersonDashFill,
  PersonPlusFill,
  ThreeDotsVertical,
} from "react-bootstrap-icons";

import { mutate } from "swr";
import axios from "axios";

const UserActions = ({ id }) => {
  const { user } = useContext(UserContext);

  const fetcher = async (url) => await axios.get(url).then((res) => res.data);
  const { data, error } = useSWR(`/api/account/${id}`, fetcher, {
    refreshInterval: 60000,
  });

  const toast = useToast();

  const sendRequest = async () => {
    const { data } = await axios.post("/api/account/friends", {
      sender: user._id,
      recipient: id,
    });
    if (data.status === "SUCCESS") {
      mutate(
        `/api/account/${id}`,
        fetch(`/api/account/${id}`).then((res) => res.json())
      );
      toast({
        title: `Cererea de prietenie a fost trimisă cu succes!`,
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

  const remove = async () => {
    const { data } = await axios.put("/api/account/friends", {
      sender: user._id,
      recipient: id,
    });
    if (data.status === "SUCCESS") {
      mutate(
        `/api/account/${id}`,
        fetch(`/api/account/${id}`).then((res) => res.json())
      );
      toast({
        title: `Cererea de prietenie a fost ștearsă cu succes!`,
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

  if (user?._id === id || !user) return null;
  return (
    <Menu>
      <MenuButton>
        <ThreeDotsVertical className="text-3xl rotate-90 md:rotate-0" />
      </MenuButton>
      <MenuList>
        {!data?.user.requests?.includes(user?._id) &&
        !data?.user.friends?.includes(user?._id) ? (
          <MenuItem
            onClick={sendRequest}
            icon={<PersonPlusFill className="text-blue text-xl" />}
          >
            Trimite cerere de prietenie
          </MenuItem>
        ) : (
          <MenuItem
            onClick={remove}
            className="text-red-500"
            icon={<PersonDashFill className="text-red-500 text-xl" />}
          >
            {data?.user.friends.includes(user._id)
              ? "Elimină prietenia"
              : "Șterge cererea de prietenie"}
          </MenuItem>
        )}
      </MenuList>
    </Menu>
  );
};

export default UserActions;
