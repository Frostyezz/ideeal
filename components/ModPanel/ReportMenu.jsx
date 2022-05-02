import React, { useState } from "react";

import {
  Button,
  Avatar,
  useDisclosure,
  Alert,
  AlertIcon,
  CircularProgress,
} from "@chakra-ui/react";

import Moment from "react-moment";
import "moment/locale/ro";

import useSWR from "swr";
import axios from "axios";

import ReportedPostModal from "./ReportedPostModal";

const ReportMenu = ({ user, setMenu }) => {
  const fetcher = async (url) => await axios.get(url).then((res) => res.data);
  const { data, error } = useSWR(`/api/post/report/${user?._id}`, fetcher, {
    refreshInterval: 60000,
  });

  const [selected, setSelected] = useState(null);

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <div className="flex md:w-2/3 flex-col p-5 shadow-shadow_nav bg-white animate__animated animate__fadeIn">
      <h1 className="md:text-3xl text-xl font-bold text-center mb-4">
        Postări raportate pentru {user.location.city}, {user.location.county}
      </h1>
      {data ? (
        <>
          <Alert className="mb-4" status="info">
            <AlertIcon />
            Apasă pe postarea pe care dorești să o vizualizezi.
          </Alert>
          <ul className="flex flex-col max-h-96 overflow-y-auto no-scrollbar p-3">
            {data.posts.map((post, i) => (
              <li
                key={i + 1}
                onClick={() => {
                  setSelected(post);
                  onOpen();
                }}
                className="animate__animated animate__fadeIn hover:-translate-y-1 transition duration-500 rounded-xl mt-4 flex flex-col md:flex-row text-center md:text-left items-center p-3 bg-blue cursor-pointer shadow-shadow_nav"
              >
                <Avatar
                  className="mr-3"
                  size="md"
                  name={`${post.author.firstName} ${post.author.lastName}`}
                  src={post.author.img}
                />
                <div className="flex flex-col">
                  <b>
                    {post.author.firstName} {post.author.lastName}
                  </b>
                  <span>
                    Postat cu{" "}
                    <Moment fromNow locale="ro">
                      {post.postedAt}
                    </Moment>
                  </span>
                  <span>Titlu: {post.title}</span>
                </div>
                <div className="flex flex-col text-center md:ml-auto md:pl-10">
                  <span>Număr de probleme raportate:</span>
                  <b>{post.reports.length}</b>
                </div>
              </li>
            ))}
          </ul>
          {selected && (
            <ReportedPostModal
              isOpen={isOpen}
              onClose={onClose}
              post={selected}
              user={user}
            />
          )}
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

export default ReportMenu;
