import React, { useState, useEffect } from "react";
import axios from "axios";

import {
  Avatar,
  Alert,
  AlertIcon,
  CircularProgress,
  useDisclosure,
  Button,
  useToast,
  Input,
} from "@chakra-ui/react";

import Moment from "react-moment";
import "moment/locale/ro";

const ModMenu = ({ user, setMenu }) => {
  const toast = useToast();
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState({
    mods: [],
    users: [],
  });
  const [query, setQuery] = useState({
    mods: "",
    users: "",
  });
  useEffect(() => {
    axios
      .put("/api/account/mod", {
        city: user.location.city,
        county: user.location.county,
      })
      .then(({ data }) => {
        const { status, users, mods } = data;
        if (status === "SUCCESS") {
          setUsers({ mods, users });
        }
        setLoading(false);
      });
  }, []);

  const addMod = async (user) => {
    const { data } = await axios.put(`/api/account/mod/${user._id}`);
    if (data.status === "SUCCESS") {
      let updated = users;
      updated.mods.push(user);
      updated.users = users.users.filter((_user) => _user._id !== user._id);
      setUsers(updated);
      setQuery({ ...query, users: "" });
      toast({
        title: `${user.firstName} ${user.lastName} este acum moderator!`,
        status: "success",
        duration: 4000,
        isClosable: true,
      });
    } else
      toast({
        title: "A apărut o eroare!",
        description: "Încercați din nou mai târziu.",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
  };

  const removeMod = async (user) => {
    const { data } = await axios.patch(`/api/account/mod/${user._id}`);
    if (data.status === "SUCCESS") {
      let updated = users;
      updated.users.push(user);
      updated.mods = users.mods.filter((_user) => _user._id !== user._id);
      setUsers(updated);
      setQuery({ ...query, mods: "" });
      toast({
        title: `${user.firstName} ${user.lastName} este acum utilizator!`,
        status: "success",
        duration: 4000,
        isClosable: true,
      });
    } else
      toast({
        title: "A apărut o eroare!",
        description: "Încercați din nou mai târziu.",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
  };

  return (
    <div className="flex flex-col p-5 shadow-shadow_nav bg-white animate__animated animate__fadeIn md:mt-0 mt-24">
      <h1 className="md:text-3xl text-xl font-bold text-center mb-4">
        Gestionare moderatori pentru {user.location.city},{" "}
        {user.location.county}
      </h1>
      {!loading ? (
        <>
          <h2>Moderatori:</h2>
          <Input
            onChange={(e) => setQuery({ ...query, mods: e.target.value })}
            className="border-blue w-52"
            placeholder="Caută moderatori"
          />
          <ul className="flex flex-col max-h-96 overflow-y-auto no-scrollbar p-3 mb-3">
            {users.mods ? (
              users.mods.map(
                (mod, i) =>
                  `${mod.firstName} ${mod.lastName}`
                    .toLowerCase()
                    .includes(query.mods.toLowerCase().trim()) && (
                    <li
                      key={i}
                      className={`animate__animated animate__fadeIn rounded-xl mt-4 flex flex-col md:flex-row items-center p-3 bg-blue shadow-shadow_nav`}
                    >
                      <Avatar
                        className="mr-3"
                        size="md"
                        name={`${mod.firstName} ${mod.lastName}`}
                        src={mod.img}
                      />
                      <div className="flex flex-col md:my-0 my-3 md:text-left text-center">
                        <b>
                          {mod.firstName} {mod.lastName}
                        </b>
                        <span>
                          S-a alăturat acum{" "}
                          <Moment fromNow locale="ro">
                            {mod.joined}
                          </Moment>
                        </span>
                      </div>
                      <Button
                        onClick={() => removeMod(mod)}
                        className="md:ml-auto"
                        colorScheme="gray"
                      >
                        Șterge
                      </Button>
                    </li>
                  )
              )
            ) : (
              <h2>Nu există moderatori</h2>
            )}
          </ul>
          <hr className="mb-3" />
          <h2>Utilizatori:</h2>
          <Input
            onChange={(e) => setQuery({ ...query, users: e.target.value })}
            className="border-blue w-52"
            placeholder="Caută utilizatori"
          />
          <ul className="flex flex-col max-h-96 overflow-y-auto no-scrollbar p-3">
            {users.users.length ? (
              users.users.map(
                (user, i) =>
                  `${user.firstName} ${user.lastName}`
                    .toLowerCase()
                    .includes(query.users.toLowerCase().trim()) && (
                    <li
                      key={i}
                      className={`animate__animated animate__fadeIn rounded-xl mt-4 flex flex-col md:flex-row items-center p-3 bg-blue shadow-shadow_nav`}
                    >
                      <Avatar
                        className="mr-3"
                        size="md"
                        name={`${user.firstName} ${user.lastName}`}
                        src={user.img}
                      />
                      <div className="flex flex-col md:my-0 my-3 md:text-left text-center">
                        <b>
                          {user.firstName} {user.lastName}
                        </b>
                        <span>
                          S-a alăturat acum{" "}
                          <Moment fromNow locale="ro">
                            {user.joined}
                          </Moment>
                        </span>
                      </div>
                      <Button
                        onClick={() => addMod(user)}
                        className="md:ml-auto"
                        colorScheme="gray"
                      >
                        Adaugă
                      </Button>
                    </li>
                  )
              )
            ) : (
              <h2>Nu există utilizatori</h2>
            )}
          </ul>
        </>
      ) : (
        <CircularProgress
          size="50px"
          isIndeterminate
          className="m-auto my-20"
        />
      )}
      <Button
        onClick={() => setMenu("menu")}
        className="mt-5"
        colorScheme="gray"
      >
        Înapoi
      </Button>
    </div>
  );
};

export default ModMenu;
