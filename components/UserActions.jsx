import React, { useContext } from "react";

import { UserContext } from "../contexts/userContext";

import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useToast,
} from "@chakra-ui/react";
import {
  ChatDotsFill,
  PersonDashFill,
  PersonPlusFill,
  ThreeDotsVertical,
} from "react-bootstrap-icons";

import { mutate } from "swr";
import axios from "axios";

const UserActions = ({ account }) => {
  const { user } = useContext(UserContext);

  const toast = useToast();

  const sendRequest = async () => {
    const { data } = await axios.post("/api/account/friends", {
      sender: user._id,
      recipient: account._id,
    });
    if (data.status === "SUCCESS") {
      mutate(
        `/api/account/${account._id}`,
        fetch(`/api/account/${account._id}`).then((res) => res.json())
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
      recipient: account._id,
    });
    if (data.status === "SUCCESS") {
      mutate(
        `/api/account/${account._id}`,
        fetch(`/api/account/${account._id}`).then((res) => res.json())
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

  if (user?._id === account._id) return null;
  return (
    <Menu>
      <MenuButton>
        <ThreeDotsVertical className="text-3xl rotate-90 md:rotate-0" />
      </MenuButton>
      <MenuList>
        {!account.requests?.includes(user?._id) ? (
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
            {!account.friends.includes(user._id)
              ? "Elimină prietenia"
              : "Șterge cererea de prietenie"}
          </MenuItem>
        )}
        <MenuItem icon={<ChatDotsFill className="text-blue text-xl" />}>
          Trimite mesaj
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default UserActions;
