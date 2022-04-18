import React, { useState, useContext } from "react";

import {
  Textarea,
  Input,
  Button,
  useToast,
  CircularProgress,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import UploadMultiple from "./UploadMultiple";
import axios from "axios";

import { UserContext } from "../contexts/userContext";

const CreatePost = () => {
  const { user } = useContext(UserContext);
  const [files, setFiles] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const toast = useToast();

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
      console.log(data);
      saved.push(data.url);
    });
    toast({
      title: `Fișierele au fost încărcate!`,
      status: "success",
      duration: 4000,
      isClosable: true,
    });
    setFiles(saved);
  };

  const removeFiles = () => {
    toast({
      title: `Fișierele încărcate au fost șterse!`,
      status: "success",
      duration: 4000,
      isClosable: true,
    });
    setFiles(null);
  };

  const savePost = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const { title, desc } = e.target;
    const draft = {
      title: title.value,
      desc: title.value,
      files,
      author: {
        firstName: user.firstName,
        lastName: user.lastName,
        id: user._id,
        img: user.img,
        joined: user.joined,
        role: user.role,
      },
      location: {
        ...user.location,
      },
    };
    const { data } = await axios.post("/api/post", { draft });
    setLoading(false);
    if (data.status === "SUCCESS") {
      setFiles(null);
    } else
      setError("A apărut o eroare. Vă rugam încercați din nou mai târziu!");
  };
  return (
    <form
      onSubmit={(e) => savePost(e)}
      className="flex flex-col items-center mx-auto w-full md:w-2/3 mt-6 md:mt-0"
    >
      {error && (
        <Alert
          status="error"
          className="rounded animate__animated animate__fadeInDown animate__faster mb-5"
        >
          <AlertIcon />
          {error}
        </Alert>
      )}
      <Input
        isRequired
        name="title"
        placeholder="Introduceți titlul"
        className="border-blue"
      />
      <Textarea
        isRequired
        name="desc"
        className="no-scrollbar my-3 border-blue"
        placeholder="Introduceți descrierea"
        size="sm"
        resize="none"
      />
      <UploadMultiple
        onFileAccepted={saveFiles}
        text="Trageți sau apăsați poze sau videoclipuri"
      />
      {files && (
        <Button
          className="mt-3 w-full animate__animated animate__fadeIn shadow"
          colorScheme="gray"
          onClick={removeFiles}
        >
          Șterge fișierele încărcate
        </Button>
      )}

      {loading ? (
        <Button isDisabled className="w-full mt-3 shadow">
          <CircularProgress size="30px" isIndeterminate />
        </Button>
      ) : (
        <Button className="mt-3 w-full shadow" type="sumbit" colorScheme="blue">
          Postează
        </Button>
      )}
    </form>
  );
};

export default CreatePost;
