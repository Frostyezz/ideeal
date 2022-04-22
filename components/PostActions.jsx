import React, { useContext } from "react";

import { useRouter } from "next/router";

import { UserContext } from "../contexts/userContext";

import { Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";

import DeletePost from "./DeletePost";

import {
  ThreeDotsVertical,
  FlagFill,
  PencilFill,
  PostcardFill,
} from "react-bootstrap-icons";

const PostActions = ({ author, id }) => {
  const { user } = useContext(UserContext);

  const router = useRouter();

  return (
    <div className="ml-auto z-10">
      <Menu>
        <MenuButton>
          <ThreeDotsVertical className="text-xl " />
        </MenuButton>
        <MenuList>
          {router.pathname.includes("/post") && (
            <MenuItem
              onClick={() => router.push(`/post/${id}`)}
              icon={<PostcardFill className="text-blue" />}
            >
              Deschide
            </MenuItem>
          )}
          {user?._id === author && (
            <>
              <MenuItem icon={<PencilFill className="text-blue" />}>
                Modifică
              </MenuItem>
              <DeletePost id={id} />
            </>
          )}
          <MenuItem icon={<FlagFill className="text-blue" />}>
            Raportează
          </MenuItem>
        </MenuList>
      </Menu>
    </div>
  );
};

export default PostActions;
