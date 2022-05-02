import React, { useState, useContext } from "react";

import { useRouter } from "next/router";

import axios from "axios";

import { mutate } from "swr";

import { UserContext } from "../../contexts/userContext";

import UploadMultiple from "../Upload/UploadMultiple";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Input,
  Textarea,
  useToast,
} from "@chakra-ui/react";

const EditPostModal = ({ isOpen, onClose, post, id }) => {
  const router = useRouter();

  const { user } = useContext(UserContext);

  const toast = useToast();

  const [loading, setLoading] = useState(false);

  const [files, setFiles] = useState(post.files);

  const [values, setValues] = useState({ title: post.title, desc: post.desc });

  const saveFiles = async (media) => {
    const saved = [];
    media.forEach(async (file) => {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "fiicode");
      const { data } = await axios.post(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_NAME}/auto/upload`,
        formData
      );
      saved.push(data.url);
    });
    setFiles(saved);
    toast({
      title: `Fișierele au fost încărcate!`,
      status: "success",
      duration: 4000,
      isClosable: true,
    });
  };

  const removeFiles = () => {
    setFiles(null);
    toast({
      title: `Fișierele încărcate au fost șterse!`,
      status: "success",
      duration: 4000,
      isClosable: true,
    });
  };
  const editPost = async (e) => {
    e.preventDefault();
    const { title, desc } = values;
    setLoading(true);
    const { data } = await axios.patch(`/api/post/${id}`, {
      title,
      desc,
      files,
    });
    setLoading(false);
    if (data.status === "SUCCESS") {
      if (router.pathname.includes("/post")) {
        router.reload(window.location.pathname);
      } else {
        mutate(
          `/api/feed/${user._id}`,
          fetch(`/api/feed/${user._id}`).then((res) => res.json())
        );
      }
      onClose();
      toast({
        title: `Postarea a fost modificată!`,
        status: "success",
        duration: 4000,
        isClosable: true,
      });
    } else {
      onClose();
      toast({
        title: `A apărut o eroare. Vă rugam încercați din nou mai târziu!`,
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    }
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <form onSubmit={(e) => editPost(e)}>
            <ModalHeader>Modifică postarea</ModalHeader>
            <ModalCloseButton />
            <ModalBody className="flex flex-col items-center mx-auto w-full">
              <Input
                isRequired
                name="title"
                placeholder="Introduceți titlul"
                className="border-blue"
                value={values.title}
                onChange={(e) =>
                  setValues({ ...values, title: e.target.value })
                }
              />
              <Textarea
                isRequired
                name="desc"
                className="no-scrollbar my-3 border-blue"
                placeholder="Introduceți descrierea"
                size="sm"
                resize="none"
                value={values.desc}
                onChange={(e) => setValues({ ...values, desc: e.target.value })}
              />
              <UploadMultiple
                onFileAccepted={saveFiles}
                text="Trageți sau apăsați pentru a încărca poze sau videoclipuri"
              />
              {files ? (
                <Button
                  className="mt-3 w-full animate__animated animate__fadeIn shadow"
                  colorScheme="gray"
                  onClick={removeFiles}
                >
                  Șterge fișierele încărcate
                </Button>
              ) : null}
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="gray" mr={3} onClick={onClose}>
                Anulează
              </Button>
              <Button type="submit" isLoading={loading} colorScheme="blue">
                Salvează
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
};

export default EditPostModal;
