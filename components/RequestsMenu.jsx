import React, { useState, useEffect } from "react";

import axios from "axios";

import {
  Avatar,
  Alert,
  AlertIcon,
  CircularProgress,
  useDisclosure,
  Button,
} from "@chakra-ui/react";

import Moment from "react-moment";
import "moment/locale/ro";

import RequestModal from "./RequestModal";

const RequestsMenu = ({ setMenu, user }) => {
  const [selected, setSelected] = useState(null);
  const [requests, setRequests] = useState(null);
  const [loading, setLoading] = useState(true);
  const [_loading, _setLoading] = useState(0);

  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    axios
      .put("/api/account/pending", {
        city: user.location.city,
        county: user.location.county,
      })
      .then(({ data }) => {
        if (data.status === "SUCCESS") {
          setRequests(data.pending);
          setLoading(false);
        }
      });
  }, []);

  const approve = async () => {
    _setLoading(1);
    const { data } = await axios.patch(`/api/account/pending/${selected._id}`);
    if (data.status === "SUCCESS") {
      const updated = requests.filter(
        (request) => request._id !== selected._id
      );
      setRequests(updated);
      setSelected(null);
    }
    _setLoading(0);
  };

  const reject = async () => {
    _setLoading(2);
    const { data } = await axios.delete(`/api/account/pending/${selected._id}`);
    if (data.status === "SUCCESS") {
      const updated = requests.filter(
        (request) => request._id !== selected._id
      );
      setRequests(updated);
      setSelected(null);
    }
    _setLoading(0);
  };

  return (
    <div className="flex flex-col p-5 shadow-shadow_nav bg-white animate__animated animate__fadeIn">
      <h1 className="md:text-3xl text-xl font-bold text-center mb-4">
        Cereri de înregistrare pentru {user.location.city},{" "}
        {user.location.county}
      </h1>

      {!loading ? (
        <>
          {requests.length ? (
            <>
              <Alert className="mb-4" status="info">
                <AlertIcon />
                Apasă pe cererea pe care dorești să o vizualizezi.
              </Alert>
              <ul className="flex flex-col max-h-96 overflow-y-auto no-scrollbar p-3">
                {requests.map((request, i) => (
                  <li
                    onClick={() => {
                      setSelected(request);
                      onOpen();
                    }}
                    key={i}
                    className={`animate__animated animate__fadeIn hover:-translate-y-1 transition duration-500 rounded-xl mt-4 flex items-center p-3 bg-blue cursor-pointer shadow-shadow_nav`}
                  >
                    <Avatar
                      className="mr-3"
                      size="md"
                      name={`${request.firstName} ${request.lastName}`}
                      src={request.img}
                    />
                    <div className="flex flex-col">
                      <b>
                        {request.firstName} {request.lastName}
                      </b>
                      <span>
                        Trimisă cu{" "}
                        <Moment fromNow locale="ro">
                          {request.verified.sent}
                        </Moment>
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <h1 className="text-center text-xl mt-5">
              Momentan, nu există cereri de înregistrare.
            </h1>
          )}
        </>
      ) : (
        <CircularProgress
          size="50px"
          isIndeterminate
          className="m-auto my-20"
        />
      )}
      {selected && (
        <RequestModal
          request={selected}
          isOpen={isOpen}
          onClose={onClose}
          loading={_loading}
          approve={approve}
          reject={reject}
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

export default RequestsMenu;
