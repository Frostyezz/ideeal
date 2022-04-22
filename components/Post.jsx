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
import FavoriteButton from "./FavoriteButton";
import VoteButton from "./VoteButton";

import { UserContext } from "../contexts/userContext";

import { PencilSquare } from "react-bootstrap-icons";

import { useRouter } from "next/router";

const Post = ({ post, removePost }) => {
  const router = useRouter();
  const { user } = useContext(UserContext);
  const fetcher = async (url) => await axios.get(url).then((res) => res.data);
  const { data, error } = useSWR(`/api/post/stats/${post._id}`, fetcher, {
    refreshInterval: 60000,
  });

  return (
    <li className="my-2 md:p-0 p-3 flex flex-col bg-blue shadow-shadow_nav">
      <div className="flex flex-col">
        <PostBody removePost={removePost} post={post} data={data} lines={3} />
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
          <VoteButton
            id={post?._id}
            user={user?._id}
            upvoters={data ? data?.stats?.upvoters : []}
          />
          <Button
            leftIcon={<PencilSquare className="text-blue" />}
            colorScheme="gray"
            className="my-2"
            onClick={() => router.push(`/post/${post._id}`)}
          >
            Comentarii
          </Button>
          <ShareButton id={post._id} />
          <FavoriteButton
            id={post?._id}
            user={user?._id}
            favorites={data ? data.stats.favorites : []}
          />
        </div>
      </div>
    </li>
  );
};

export default Post;
