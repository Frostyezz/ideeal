import React from "react";

import Moment from "react-moment";
import "moment/locale/ro";

import { Avatar } from "@chakra-ui/react";

import ShowMoreText from "react-show-more-text";

const PostBody = ({ data, post, lines }) => {
  return (
    <>
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
          lines={lines}
          more="Mai mult"
          less="Mai puțin"
          anchorClass="underline"
          expanded={false}
          truncatedEndingComponent={"... "}
        >
          <p>{post.desc}</p>
        </ShowMoreText>
      </div>
    </>
  );
};

export default PostBody;
