import React from "react";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
} from "@chakra-ui/react";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper";
import ShowMoreText from "react-show-more-text";

const PostModal = ({ isOpen, onClose, post }) => {
  return (
    <Modal isCentered isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Vizualizare postare</ModalHeader>
        <ModalCloseButton />
        <ModalBody className="flex flex-col">
          <h1>Titlu: {post.title}</h1>
          <ShowMoreText
            lines={5}
            more="Mai mult"
            less="Mai puțin"
            anchorClass="underline"
            expanded={false}
            truncatedEndingComponent={"... "}
          >
            Descriere: {post.desc}
          </ShowMoreText>
          {post.files && (
            <div className=" my-3">
              <Swiper
                spaceBetween={30}
                centeredSlides={true}
                pagination={{ clickable: true }}
                modules={[Pagination]}
                className="h-52 bg-white"
              >
                {post.files.map((file, i) => (
                  <SwiperSlide key={i}>
                    {file.includes("/image/") ? (
                      <Image
                        priority
                        src={file}
                        layout="fill"
                        objectFit="cover"
                      />
                    ) : (
                      <video controls className="h-full w-full object-cover">
                        <source src={file} type="video/mp4" />
                      </video>
                    )}
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          )}
        </ModalBody>
        <ModalFooter>
          <Button onClick={onClose} colorScheme="gray">
            Închide
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default PostModal;
