import React, { useContext } from "react";

import axios from "axios";
import useSWR, { mutate } from "swr";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper";

import { Button, Avatar, useToast } from "@chakra-ui/react";

import Moment from "react-moment";
import "moment/locale/ro";

import ShowMoreText from "react-show-more-text";

import { UserContext } from "../contexts/userContext";

import {
  ArrowUpSquareFill,
  FlagFill,
  PencilSquare,
  ShareFill,
  XSquareFill,
} from "react-bootstrap-icons";

const Post = ({ post }) => {
  const { user } = useContext(UserContext);
  const fetcher = async (url) => await axios.get(url).then((res) => res.data);
  const { data, error } = useSWR(`/api/post/stats/${post._id}`, fetcher, {
    refreshInterval: 60000,
  });
  const toast = useToast();
  const upvote = async () => {
    const { data } = await axios.patch(`/api/post/stats/${post._id}`, {
      upvoter: user._id,
    });
    if (data.status === "SUCCESS") {
      mutate(
        `/api/post/stats/${post._id}`,
        fetch(`/api/post/stats/${post._id}`).then((res) => res.json())
      );
    } else {
      toast({
        title: `A apărut o eroare. Vă rugam încercați din nou mai târziu!`,
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    }
  };

  const removeVote = async () => {
    const { data } = await axios.put(`/api/post/stats/${post._id}`, {
      upvoter: user._id,
    });
    if (data.status === "SUCCESS") {
      mutate(
        `/api/post/stats/${post._id}`,
        fetch(`/api/post/stats/${post._id}`).then((res) => res.json())
      );
    } else {
      toast({
        title: `A apărut o eroare. Vă rugam încercați din nou mai târziu!`,
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    }
  };

  return (
    <li className="my-2 md:p-0 p-3 flex flex-col bg-blue shadow-shadow_nav">
      <div className="flex flex-col">
        <div className="flex flex-row md:p-3 border-b border-white pb-3 items-center">
          <Avatar
            size="md"
            name={`${post.author.firstName} ${post.author.lastName}`}
            src={post.author.img}
            className="mr-3"
          />

          <div className="flex flex-col">
            <div className="flex flex-row">
              <h1 className="font-bold">{`${post.author.firstName} ${post.author.lastName}`}</h1>
              {post.author.role !== "USER" && (
                <span className="bg-orange ml-2 rounded-xl px-2">
                  {post.author.role.replace("_", " ")}
                </span>
              )}
            </div>
            <div className="flex flex-row">
              <span>
                Postat acum{" "}
                <Moment fromNow locale="ro">
                  {post.postedAt}
                </Moment>
              </span>
            </div>
            <div>
              <span>
                {data ? data.stats.upvoters.length : 0}{" "}
                {data && data.stats.upvoters.length !== 1 ? "voturi" : "vot"}
              </span>
            </div>
          </div>
        </div>
        <div className="flex flex-col md:px-3 pt-3">
          <h1 className="font-bold text-xl ml-3">{post.title}</h1>
          <ShowMoreText
            lines={3}
            more="Mai mult"
            less="Mai puțin"
            anchorClass="underline"
            expanded={false}
            truncatedEndingComponent={"... "}
          >
            <p>{post.desc}</p>
          </ShowMoreText>
        </div>
        {post.files && (
          <div className="md:my-0 my-3">
            <Swiper
              spaceBetween={30}
              centeredSlides={true}
              pagination={{ clickable: true }}
              modules={[Pagination]}
              className="h-96 bg-white"
            >
              {post.files.map((file, i) => (
                <SwiperSlide key={i}>
                  {file.includes("/image/") ? (
                    <Image
                      priority
                      src={file}
                      layout="fill"
                      objectFit="cover"
                    />
                  ) : (
                    <video controls className="h-full w-full object-cover">
                      <source src={file} type="video/mp4" />
                    </video>
                  )}
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        )}
        <div className="flex justify-evenly flex-wrap">
          {data && !data.stats.upvoters.includes(user._id) ? (
            <Button
              onClick={upvote}
              leftIcon={<ArrowUpSquareFill className="text-blue" />}
              colorScheme="gray"
              className="my-2"
            >
              Votează
            </Button>
          ) : (
            <Button
              onClick={removeVote}
              leftIcon={<XSquareFill className="text-white" />}
              colorScheme="red"
              className="my-2"
            >
              Șterge votul
            </Button>
          )}
          <Button
            leftIcon={<PencilSquare className="text-blue" />}
            colorScheme="gray"
            className="my-2"
          >
            Comentarii
          </Button>
          <Button
            leftIcon={<ShareFill className="text-blue" />}
            colorScheme="gray"
            className="my-2"
          >
            Distribuie
          </Button>
          <Button
            leftIcon={<FlagFill className="text-blue" />}
            colorScheme="gray"
            className="my-2"
          >
            Raportează
          </Button>
        </div>
      </div>
    </li>
  );
};

export default Post;
