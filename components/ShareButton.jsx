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

import { ShareFill } from "react-bootstrap-icons";

import {
  EmailShareButton,
  EmailIcon,
  FacebookShareButton,
  FacebookMessengerShareButton,
  FacebookMessengerIcon,
  FacebookIcon,
  LinkedinShareButton,
  LinkedinIcon,
  RedditShareButton,
  RedditIcon,
  TwitterShareButton,
  TwitterIcon,
  WhatsappShareButton,
  WhatsappIcon,
} from "react-share";

const ShareButton = ({ id }) => {
  const shareUrl = `${
    process.env.NEXT_PUBLIC_VERCEL_URL
      ? process.env.NEXT_PUBLIC_VERCEL_URL
      : "http://localhost:3000"
  }/post/${id}`;
  return (
    <Popover placement="top-start">
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
        <PopoverBody className="flex flex-row justify-evenly flex-wrap">
          <EmailShareButton
            url={shareUrl}
            subject="Aruncă o privire la această postare de pe IdeeRO."
            body="body"
          >
            <EmailIcon size={32} round />
          </EmailShareButton>
          <FacebookShareButton
            url={shareUrl}
            quote="Aruncă o privire la această postare de pe IdeeRO."
          >
            <FacebookIcon size={32} round />
          </FacebookShareButton>
          <FacebookMessengerShareButton url={shareUrl} appId="521270401588372">
            <FacebookMessengerIcon size={32} round />
          </FacebookMessengerShareButton>
          <TwitterShareButton
            url={shareUrl}
            title="Aruncă o privire la această postare de pe IdeeRO."
          >
            <TwitterIcon size={32} round />
          </TwitterShareButton>
          <WhatsappShareButton
            url={shareUrl}
            title="Aruncă o privire la această postare de pe IdeeRO."
            separator=": "
          >
            <WhatsappIcon size={32} round />
          </WhatsappShareButton>
          <LinkedinShareButton url={shareUrl}>
            <LinkedinIcon size={32} round />
          </LinkedinShareButton>
          <RedditShareButton
            url={shareUrl}
            title="Aruncă o privire la această postare de pe IdeeRO."
            windowWidth={660}
            windowHeight={460}
          >
            <RedditIcon size={32} round />
          </RedditShareButton>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default ShareButton;
