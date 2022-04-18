import React from "react";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper";

import { Avatar } from "@chakra-ui/react";

import Moment from "react-moment";
import "moment/locale/ro";

const Post = ({ post }) => {
  return (
    <li className="my-2 flex flex-col bg-blue shadow-shadow_nav">
      <div className="flex flex-col">
        <div className="flex flex-row p-3">
          <Avatar
            size="md"
            name={`${post.author.firstName} ${post.author.lastName}`}
            src={post.author.img}
            className="mr-3"
          />

          <div className="flex flex-col">
            <div className="flex flex-row">
              <h1 className="font-bold">{`${post.author.firstName} ${post.author.lastName}`}</h1>
              <span className="bg-orange ml-2 rounded-xl px-2">
                {post.author.role.replace("_", " ")}
              </span>
            </div>
            <div className="flex flex-row">
              <span>
                Postat acum{" "}
                <Moment fromNow locale="ro">
                  {post.postedAt}
                </Moment>
              </span>
            </div>
          </div>
        </div>
        {post.files && (
          <div className="mb-3">
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
      </div>
    </li>
  );
};

export default Post;
