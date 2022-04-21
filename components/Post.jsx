import React, { useContext } from "react";

import axios from "axios";
import useSWR, { mutate } from "swr";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper";

import { Button, useToast } from "@chakra-ui/react";

import PostBody from "./PostBody";
import ShareButton from "./ShareButton";

import { UserContext } from "../contexts/userContext";

import {
  ArrowUpSquareFill,
  FlagFill,
  PencilSquare,
  ShareFill,
  XSquareFill,
} from "react-bootstrap-icons";

import { useRouter } from "next/router";

const Post = ({ post }) => {
  const router = useRouter();
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
        <PostBody post={post} data={data} lines={3} />
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
            onClick={() => router.push(`/post/${post._id}`)}
          >
            Comentarii
          </Button>
          <ShareButton id={post._id} />
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
