import React, { useContext, useState } from "react";

import Image from "next/image";

import axios from "axios";
import useSWR from "swr";

import PostBody from "../../components/Post/PostBody";
import CommentSection from "../../components/Post/CommentSection";
import ShareButton from "../../components/Post/ShareButton";
import FavoriteButton from "../../components/Post/FavoriteButton";
import VoteButton from "../../components/Post/VoteButton";
import NotFound from "../404";

import { ButtonGroup } from "@chakra-ui/react";

import { UserContext } from "../../contexts/userContext";

import { Lightbox } from "react-modal-image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper";

const PostPage = ({ post }) => {
  const [url, setUrl] = useState(null);

  const fetcher = async (url) => await axios.get(url).then((res) => res.data);
  const { data, error } = useSWR(`/api/post/stats/${post._id}`, fetcher, {
    refreshInterval: 60000,
  });

  const { user } = useContext(UserContext);

  return (
    <>
      {data?.stats ? (
        <div
          className={`w-screen bg-blue h-screen w-content flex flex-col lg:flex-row justify-center items-center ${
            !post.files && "pt-24"
          }`}
        >
          {post.files && (
            <div className="bg-white lg:h-full min-h-screen w-full flex lg:w-1/2">
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
                      <Image
                        priority
                        className="cursor-pointer"
                        src={file}
                        layout="fill"
                        objectFit="cover"
                        onClick={() => setUrl(file)}
                      />
                    ) : (
                      <video controls className="h-full w-full">
                        <source src={file} type="video/mp4" />
                      </video>
                    )}
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          )}
          <div className="lg:w-1/2 flex bg-blue flex-col w-full h-full animate__animated animate__slideInLeft shadow-shadow_nav">
            <div className="p-3">
              <PostBody data={data} post={post} lines={10} />
            </div>
            {user && (
              <div className="flex justify-evenly w-1/2 mx-auto flex-wrap">
                <ButtonGroup size="md">
                  <VoteButton
                    id={post?._id}
                    user={user?._id}
                    upvoters={data ? data.stats?.upvoters : []}
                  />
                  <ShareButton id={post._id} />
                  <FavoriteButton
                    id={post?._id}
                    user={user?._id}
                    favorites={data ? data.stats?.favorites : []}
                  />
                </ButtonGroup>
              </div>
            )}

            <div className="p-3 h-full bg-white no-scrollbar overflow-y-auto">
              <CommentSection
                comments={data ? data.stats?.comments : []}
                id={post._id}
              />
            </div>
          </div>
        </div>
      ) : (
        <NotFound />
      )}
      {url && (
        <Lightbox
          large={url}
          onClose={() => setUrl(null)}
          hideDownload
          hideZoom="false"
        />
      )}
    </>
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
    if (data.status === "SUCCESS" && data.post)
      return { props: { post: data.post } };
    return {
      redirect: {
        permanent: false,
        destination: "/404",
      },
      props: {},
    };
  } catch (error) {
    return {
      redirect: {
        permanent: false,
        destination: "/404",
      },
      props: {},
    };
  }
}

export default PostPage;
