import React, { useState, useEffect } from "react";

import {
  Button,
  CircularProgress,
  Select,
  Avatar,
  Alert,
  AlertIcon,
  Input,
  useToast,
} from "@chakra-ui/react";

import regions from "../data/regions.json";
import axios from "axios";

import Moment from "react-moment";
import "moment/locale/ro";

const counties = Object.keys(regions).map((key) => key);

const ManageAdmins = ({ setMenu }) => {
  const toast = useToast();
  const [query, setQuery] = useState(" ");
  const [location, setLocation] = useState({ city: null, county: null });
  const [users, setUsers] = useState({ admin: null, users: null });
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (location.city && location.county) {
      setLoading(true);
      axios.post("/api/account/admin", location).then(({ data }) => {
        const { status, admin, users } = data;
        if (status === "SUCCESS") {
          setUsers({ admin, users });
          setLoading(false);
        }
      });
    }
  }, [location]);

  const changeAdmin = async (user) => {
    const { data } = await axios.patch("/api/account/admin", {
      adminID: users.admin._id,
      userID: user._id,
    });
    if (data.status === "SUCCESS") {
      toast({
        title: `${user.firstName} ${user.lastName} este acum administrator!`,
        status: "success",
        duration: 4000,
        isClosable: true,
      });
      setMenu("menu");
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
    <div className="flex flex-col p-5 shadow-shadow_nav bg-white animate__animated animate__fadeIn md:mt-0 mt-24 w-full md:w-2/3">
      <h1 className="md:text-3xl text-xl font-bold text-center mb-4">
        Gestionare administratori
      </h1>
      <Select
        placeholder="Alegeți județul"
        onChange={(e) => setLocation({ ...location, county: e.target.value })}
      >
        {counties.map((county, i) => (
          <option value={county} key={i}>
            {county}
          </option>
        ))}
      </Select>
      <br />
      {location.county && (
        <Select
          className="animate__animated animate__fadeInDown animate__faster"
          placeholder="Alegeți localitatea"
          onChange={(e) => setLocation({ ...location, city: e.target.value })}
        >
          {regions[location.county].map((county, i) => (
            <option value={county.name} key={i}>
              {county.name}
            </option>
          ))}
        </Select>
      )}
      {location.city && location.county && (
        <>
          {!loading ? (
            <>
              {users.admin ? (
                <>
                  <h1 className="text-center mt-5 text-xl">
                    Administratorul acestei comunități este:
                  </h1>
                  <div className="flex flex-col justify-center items-center bg-orange rounded-xl text-white p-3 shadow-shadow_1 mx-auto">
                    <Avatar
                      size="xl"
                      name={`${users.admin.firstName} ${users.admin.lastName}`}
                      src={users.admin.img}
                    />
                    <b className="my-1">{`${users.admin.firstName} ${users.admin.lastName}`}</b>
                    <span>
                      S-a alăturat cu{" "}
                      <Moment fromNow locale="ro">
                        {users.admin.joined}
                      </Moment>
                    </span>
                  </div>
                </>
              ) : (
                <Alert className="my-5" status="warning">
                  <AlertIcon />
                  Această comunitate nu are un administrator!
                </Alert>
              )}
              <hr className="mt-5" />
              {users.users && users.users.length ? (
                <div className="mt-5">
                  <h2>
                    Poți schimba adminstratorul curent cu unul dintre
                    utilizatorii:
                  </h2>
                  <Input
                    onChange={(e) => setQuery(e.target.value)}
                    className="border-blue w-52 mb-4"
                    placeholder="Caută utilizatori"
                  />
                  <ul className="flex flex-col max-h-96 overflow-y-auto no-scrollbar p-3 mb-3">
                    {users.users.map(
                      (user, i) =>
                        `${user.firstName} ${user.lastName}`
                          .toLowerCase()
                          .includes(query.toLowerCase().trim()) && (
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
                              onClick={() => changeAdmin(user)}
                              className="md:ml-auto"
                              colorScheme="gray"
                            >
                              Schimbă
                            </Button>
                          </li>
                        )
                    )}
                  </ul>
                </div>
              ) : (
                <Alert status="info">
                  <AlertIcon />
                  Această comunitate nu are utilizatori!
                </Alert>
              )}
            </>
          ) : (
            <CircularProgress
              size="50px"
              isIndeterminate
              className="m-auto my-20"
            />
          )}
        </>
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

export default ManageAdmins;
