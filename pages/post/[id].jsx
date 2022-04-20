import React, { useContext } from "react";

import Image from "next/image";

import axios from "axios";
import useSWR, { mutate } from "swr";

import PostBody from "../../components/postBody";
import ShareButton from "../../components/ShareButton";

import { UserContext } from "../../contexts/userContext";

import { Button, useToast } from "@chakra-ui/react";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper";

import {
  ArrowUpSquareFill,
  FlagFill,
  PencilSquare,
  XSquareFill,
} from "react-bootstrap-icons";

const PostPage = ({ post }) => {
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
  const { user } = useContext(UserContext);
  return (
    <div className="w-screen bg-white h-screen w-content flex flex-col lg:flex-row justify-center items-center">
      {post.files && (
        <div className="bg-white lg:h-full h-1/2 w-full flex lg:w-1/2">
          <Swiper
            spaceBetween={30}
            centeredSlides={true}
            pagination={{ clickable: true }}
            modules={[Pagination]}
            className="h-full w-full bg-white"
          >
            {post.files.map((file, i) => (
              <SwiperSlide key={i}>
                {file.includes("/image/") ? (
                  <Image priority src={file} layout="fill" objectFit="cover" />
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
      <div className="lg:w-1/2 flex bg-blue flex-col p-3 md:p-0 w-full h-full animate__animated animate__slideInLeft">
        <PostBody data={data} post={post} lines={10} />
        {user && (
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
            <ShareButton id={post._id} />
            <Button
              leftIcon={<FlagFill className="text-blue" />}
              colorScheme="gray"
              className="my-2"
            >
              Raportează
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export async function getServerSideProps(ctx) {
  try {
    const { id } = ctx.params;
    const baseURL = !process.env.VERCEL_URL
      ? "http://localhost:3000"
      : `https://${process.env.VERCEL_URL}`;
    const res = await fetch(`${baseURL}/api/post/${id}`);
    const data = await res.json();
    return { props: { post: data.post } };
  } catch (error) {
    return { props: { post: null } };
  }
}

export default PostPage;
