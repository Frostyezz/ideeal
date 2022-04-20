import React, { useState } from "react";

import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
  Button,
} from "@chakra-ui/react";

import {
  Clipboard2CheckFill,
  Clipboard2PlusFill,
  ShareFill,
} from "react-bootstrap-icons";

const ShareButton = ({ id }) => {
  const [copied, setCopied] = useState(false);
  const url = `${
    process.env.NEXT_PUBLIC_VERCEL_URL
      ? process.env.NEXT_PUBLIC_VERCEL_URL
      : "http://localhost:3000"
  }/post/${id}`;
  return (
    <Popover placement="top-start" onClose={() => setCopied(false)}>
      <PopoverTrigger>
        <Button
          leftIcon={<ShareFill className="text-blue" />}
          colorScheme="gray"
          className="my-2"
        >
          Distribuie
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverHeader>Distribuie această postare</PopoverHeader>
        <PopoverBody>
          {copied ? (
            <Button
              leftIcon={<Clipboard2CheckFill />}
              colorScheme="yellow"
              disabled
              className="w-full"
              onClick={() => {
                navigator.clipboard.writeText(url);
              }}
            >
              Copiat
            </Button>
          ) : (
            <Button
              leftIcon={<Clipboard2PlusFill />}
              colorScheme="blue"
              className="w-full"
              onClick={() => {
                navigator.clipboard.writeText(url);
                setCopied(true);
              }}
            >
              Copiază codul
            </Button>
          )}
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default ShareButton;
