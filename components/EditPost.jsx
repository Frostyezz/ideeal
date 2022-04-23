import React from "react";

import { UserContext } from "../contexts/userContext";

import EditPostModal from "./EditPostModal";

import { PencilFill } from "react-bootstrap-icons";

import { useDisclosure, MenuItem } from "@chakra-ui/react";

const EditPost = ({ post, id }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <MenuItem onClick={onOpen} icon={<PencilFill className="text-blue" />}>
        Modifică
      </MenuItem>
      <EditPostModal onClose={onClose} isOpen={isOpen} post={post} id={id} />
    </>
  );
};

export default EditPost;
