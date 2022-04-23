import React from "react";

import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
} from "@chakra-ui/react";

import SortPosts from "./SortPosts";
import CreatePost from "./CreatePost";

const FeedOptions = ({ sortPosts, resetFilters, create }) => {
  return (
    <div className="sticky z-20 top-0 bg-white shadow-shadow_nav">
      <Accordion allowToggle>
        {create && (
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
              <CreatePost />
            </AccordionPanel>
          </AccordionItem>
        )}

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
            <SortPosts resetFilters={resetFilters} sortPosts={sortPosts} />
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default FeedOptions;
