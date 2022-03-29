import React, { useState } from "react";

import {
  Alert,
  FormControl,
  Button,
  AlertIcon,
  CircularProgress,
  Select,
} from "@chakra-ui/react";

import Upload from "../components/Upload";
import axios from "axios";

import regions from "../data/regions.json";

const counties = Object.keys(regions).map((key) => key);

const SignUpS5 = ({
  error,
  setFiles,
  files,
  loading,
  location,
  setLocation,
  saveLocation,
}) => {
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

  return (
    <div className="lg:w-1/2 w-full h-2/3 bg-white p-5 animate__animated animate__slideInLeft">
      <div className="h-1/3 flex flex-col justify-center border-b-2 border-t-blue items-center text-center">
        <h1 className="text-7xl font-bold border-2 rounded-full px-5 py-2 border-darkBlue mb-3">
          4
        </h1>
        <h2>Introduceți-vă domiciliul</h2>
      </div>
      <div className="h-100 flex items-center mt-5">
        <FormControl className="2xl:px-48 ">
          <form onSubmit={(e) => saveLocation(e)}>
            <Alert status="info" className="mb-5">
              <AlertIcon />
              Vom folosi poza cu buletinul dvs. strict pentru a vă valida
              domiciliul.
            </Alert>
            {error && (
              <Alert
                status="error"
                className="rounded animate__animated animate__fadeInDown animate__faster mb-5"
              >
                <AlertIcon />
                {error}
              </Alert>
            )}
            <Select
              placeholder="Alegeți județul"
              onChange={(e) =>
                setLocation({ ...location, county: e.target.value })
              }
            >
              {counties.map((county, i) => (
                <option value={county} key={i}>
                  {county}
                </option>
              ))}
            </Select>
            <br />
            {location.county && (
              <Select
                className="animate__animated animate__fadeInDown animate__faster"
                placeholder="Alegeți localitatea"
                onChange={(e) =>
                  setLocation({ ...location, city: e.target.value })
                }
              >
                {regions[location.county].map((county, i) => (
                  <option value={county.name} key={i}>
                    {county.name}
                  </option>
                ))}
              </Select>
            )}
            <br />
            {files.ic ? (
              <Alert status="success">
                <AlertIcon className="rounded animate__animated animate__fadeInDown animate__faster" />
                Imaginea buletinului a fost încărcată cu succes!
              </Alert>
            ) : (
              <Upload
                onFileAccepted={(file) => sendIC(file)}
                text="Trageți sau încărcați o poza cu buletinul dvs. (obligatoriu)"
              />
            )}

            {loading ? (
              <Button isDisabled className="w-full mt-5 shadow">
                <CircularProgress size="30px" isIndeterminate />
              </Button>
            ) : (
              <Button
                colorScheme="blue"
                className="w-full mt-5 shadow"
                type="submit"
              >
                Salvează
              </Button>
            )}
          </form>
        </FormControl>
      </div>
    </div>
  );
};

export default SignUpS5;
