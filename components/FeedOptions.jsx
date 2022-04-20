import React from "react";

import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
} from "@chakra-ui/react";

import CreatePost from "./CreatePost";

const FeedOptions = ({ addPost }) => {
  return (
    <div className="sticky z-10 top-0 bg-white shadow-shadow_nav">
      <Accordion allowToggle>
        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box flex="1" textAlign="center">
                Creează o postare
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            <CreatePost addPost={addPost} />
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem className="border-b-0">
          <h2>
            <AccordionButton>
              <Box flex="1" textAlign="center">
                Sortează postările
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default FeedOptions;
