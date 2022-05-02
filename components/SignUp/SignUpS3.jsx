import React, { useState } from "react";

import {
  FormLabel,
  Alert,
  FormControl,
  Input,
  Button,
  AlertIcon,
  CircularProgress,
} from "@chakra-ui/react";

import Upload from "../../components/Upload/Upload";
import axios from "axios";

const SignUpS3 = ({ error, setFiles, files, saveUser, loading }) => {
  const sendIC = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "fiicode");
    const { data } = await axios.post(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_NAME}/auto/upload`,
      formData
    );
    setFiles({ ...files, ic: data.url });
  };

  const sendProfileImg = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "fiicode");
    const { data } = await axios.post(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_NAME}/auto/upload`,
      formData
    );
    setFiles({ ...files, profileImg: data.url });
  };

  return (
    <div className="lg:w-1/2 w-full h-2/3 bg-white p-5 animate__animated animate__slideInLeft">
      <div className="h-1/3 flex flex-col justify-center border-b-2 border-t-blue items-center text-center">
        <h1 className="text-7xl font-bold border-2 rounded-full px-4 border-darkBlue mb-3">
          3
        </h1>
        <h2>Introduceți infromațiile personale</h2>
      </div>
      <div className="h-100 flex items-center mt-5">
        <FormControl className="2xl:px-48 ">
          <form onSubmit={(e) => saveUser(e)}>
            {error && (
              <Alert
                status="error"
                className="rounded animate__animated animate__fadeInDown animate__faster"
              >
                <AlertIcon />
                {error}
              </Alert>
            )}
            <div className="flex flex-col lg:flex-row mb-5">
              <div className="lg:w-1/2 mr-3">
                <FormLabel htmlFor="last">Nume</FormLabel>
                <Input
                  className="border-blue"
                  isRequired
                  type="text"
                  id="last"
                  name="last"
                />
              </div>
              <div className="lg:w-1/2 mr-3">
                <FormLabel htmlFor="first">Prenume</FormLabel>
                <Input
                  className="border-blue"
                  isRequired
                  type="text"
                  id="first"
                  name="first"
                />
              </div>
            </div>
            {files.profileImg ? (
              <Alert status="success">
                <AlertIcon className="rounded animate__animated animate__fadeInDown animate__faster" />
                Imaginea a fost încărcată cu succes!
              </Alert>
            ) : (
              <Upload
                onFileAccepted={(file) => sendProfileImg(file)}
                text="Trageți sau încărcați o poza de profil (opțional)"
              />
            )}
            <br />

            {loading ? (
              <Button isDisabled className="w-full mt-5 shadow">
                <CircularProgress size="30px" isIndeterminate />
              </Button>
            ) : (
              <Button colorScheme="blue" className="w-full mt-5 shadow" type="submit">
                Salvează
              </Button>
            )}
          </form>
        </FormControl>
      </div>
    </div>
  );
};

export default SignUpS3;
