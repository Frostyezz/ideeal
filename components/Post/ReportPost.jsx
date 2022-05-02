import React from "react";
import { useDisclosure, MenuItem } from "@chakra-ui/react";
import { FlagFill } from "react-bootstrap-icons";

import ReportPostModal from "./ReportPostModal";

const ReportPost = ({ id }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <MenuItem onClick={onOpen} icon={<FlagFill className="text-blue" />}>
        Raportează
      </MenuItem>
      <ReportPostModal id={id} isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default ReportPost;
