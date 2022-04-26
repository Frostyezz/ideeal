import React, { useMemo, useState } from "react";
import {
  Button,
  Avatar,
  Select,
  useToast,
  Alert,
  AlertIcon,
  CircularProgress,
  useDisclosure,
} from "@chakra-ui/react";

import Moment from "react-moment";
import "moment/locale/ro";

import useSWR, { mutate } from "swr";
import axios from "axios";

import PostModal from "./PostModal";

const PostMenu = ({ user, setMenu }) => {
  const toast = useToast();

  const [sort, setSort] = useState(null);

  const [selected, setSelected] = useState(null);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const fetcher = async (url) => await axios.get(url).then((res) => res.data);
  const { data, error } = useSWR(`/api/feed/${user?._id}`, fetcher, {
    refreshInterval: 60000,
  });

  const posts = useMemo(() => {
    const { posts } = data ? data : [];
    if (sort) {
      posts = posts.filter((post) => post.status === sort);
    }
    return posts;
  }, [data, sort]);

  const changeStatus = async (e, id) => {
    const status = e.target.value;
    const { data } = await axios.patch(`/api/post/status/${id}`, { status });
    if (data.status === "SUCCESS") {
      mutate(
        `/api/feed/${user._id}`,
        fetch(`/api/feed/${user._id}`).then((res) => res.json())
      );
      toast({
        title: "Statusul a fost schimbat cu succes!",
        status: "success",
        duration: 4000,
        isClosable: true,
      });
    } else {
      toast({
        title: "A apărut o eroare!",
        description: "Încercați din nou mai târziu.",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    }
  };

  return (
    <div className="flex md:w-2/3 flex-col p-5 shadow-shadow_nav bg-white animate__animated animate__fadeIn">
      <h1 className="md:text-3xl text-xl font-bold text-center mb-4">
        Postări pentru {user.location.city}, {user.location.county}
      </h1>
      {data ? (
        <>
          <Alert className="mb-4" status="info">
            <AlertIcon />
            Apasă pe postarea pe care dorești să o vizualizezi.
          </Alert>
          <Select
            placeholder="Sortează după status..."
            className="border-blue mb-2"
            onChange={(e) => setSort(e.target.value ? e.target.value : null)}
          >
            <option value="NONE">În așteptare</option>
            <option value="SENT">Trimis</option>
            <option value="SEEN">Vizionat</option>
            <option value="IN_PROGRESS">În lucru</option>
            <option value="DONE">Efectuat</option>
          </Select>
          <ul className="flex flex-col max-h-96 overflow-y-auto no-scrollbar p-3">
            {posts.map((post, i) => (
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
                  <span>Status:</span>
                  <Select
                    key={post._id}
                    defaultValue={post.status}
                    onChange={(e) => {
                      changeStatus(e, post._id);
                    }}
                    onClick={(e) => e.stopPropagation()}
                    className="bg-white"
                  >
                    <option value="NONE">În așteptare</option>
                    <option value="SENT">Trimis</option>
                    <option value="SEEN">Vizionat</option>
                    <option value="IN_PROGRESS">În lucru</option>
                    <option value="DONE">Efectuat</option>
                  </Select>
                </div>
              </li>
            ))}
          </ul>
          {selected && (
            <PostModal post={selected} isOpen={isOpen} onClose={onClose} />
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

export default PostMenu;
