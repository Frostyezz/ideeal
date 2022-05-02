import React, { useState } from "react";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Divider,
  useToast,
} from "@chakra-ui/react";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper";

import { mutate } from "swr";

import ShowMoreText from "react-show-more-text";
import axios from "axios";

const ReportedPostModal = ({ isOpen, onClose, post, user }) => {
  const toast = useToast();
  const [loading, setLoading] = useState(0);

  const removeReports = async () => {
    setLoading(1);
    const { data } = await axios.put(`/api/post/report/${post._id}`);
    setLoading(0);
    if (data.status === "SUCCESS") {
      mutate(
        `/api/post/report/${user._id}`,
        fetch(`/api/post/report/${user._id}`).then((res) => res.json())
      );
      onClose();
      toast({
        title: `Problemele raportate au fost șterse cu succes!`,
        status: "success",
        duration: 4000,
        isClosable: true,
      });
    } else {
      toast({
        title: `A apărut o eroare. Vă rugam încercați din nou mai târziu!`,
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    }
  };

  const removePost = async () => {
    setLoading(2);
    const { data } = await axios.delete(`/api/post/report/${post._id}`);
    setLoading(0);
    if (data.status === "SUCCESS") {
      mutate(
        `/api/post/report/${user._id}`,
        fetch(`/api/post/report/${user._id}`).then((res) => res.json())
      );
      onClose();
      toast({
        title: `Postarea au fost ștearsă cu succes!`,
        status: "success",
        duration: 4000,
        isClosable: true,
      });
    } else {
      toast({
        title: `A apărut o eroare. Vă rugam încercați din nou mai târziu!`,
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    }
  };

  return (
    <Modal isCentered isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Gestionare postare raportată</ModalHeader>
        <ModalCloseButton />
        <ModalBody className="flex flex-col">
          <b>Probleme raportate:</b>
          <ul className="ml-4" style={{ listStyleType: "disc" }}>
            {post.reports.map((report, i) => (
              <li key={i}>{report}</li>
            ))}
          </ul>
          <Divider className="border-blue my-2" />
          <b>Postare:</b>
          <h1>Titlu: {post.title}</h1>
          <ShowMoreText
            lines={3}
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
          <Button
            onClick={removeReports}
            isLoading={loading === 1}
            colorScheme="green"
            mr={3}
          >
            Șterge problemele
          </Button>
          <Button
            onClick={removePost}
            isLoading={loading === 2}
            colorScheme="red"
          >
            Șterge postarea
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ReportedPostModal;
