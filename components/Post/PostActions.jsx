import React, { useContext } from "react";

import { useRouter } from "next/router";

import { UserContext } from "../../contexts/userContext";

import { Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";

import DeletePost from "./DeletePost";
import EditPost from "./EditPost";
import ReportPost from "./ReportPost";

import { ThreeDotsVertical, PostcardFill } from "react-bootstrap-icons";

const PostActions = ({ author, id, post }) => {
  const { user } = useContext(UserContext);

  const router = useRouter();

  return (
    <div className="ml-auto z-10">
      <Menu>
        <MenuButton>
          <ThreeDotsVertical className="text-xl " />
        </MenuButton>
        <MenuList>
          {!router.pathname.includes("/post") && (
            <MenuItem
              onClick={() => router.push(`/post/${id}`)}
              icon={<PostcardFill className="text-blue" />}
            >
              Deschide
            </MenuItem>
          )}
          {user?._id === author && (
            <>
              <EditPost id={id} post={post} />
              <DeletePost id={id} />
            </>
          )}
          <ReportPost id={id} />
        </MenuList>
      </Menu>
    </div>
  );
};

export default PostActions;
