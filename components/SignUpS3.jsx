import React from "react";

import {
  FormLabel,
  Alert,
  FormControl,
  Input,
  Button,
  AlertIcon,
} from "@chakra-ui/react";

import Upload from "../components/Upload";

const SignUpS3 = ({ error, id }) => {
  return (
    <div className="lg:w-1/2 w-full h-2/3 bg-white p-5">
      <div className="h-1/3 flex flex-col justify-center border-b-2 border-t-blue items-center text-center">
        <h1 className="text-7xl font-bold border-2 rounded-full px-4 border-darkBlue mb-3">
          3
        </h1>
        <h2>Introduceți infromațiile personale</h2>
      </div>
      <div className="h-2/3 h-max flex items-center mt-5">
        <FormControl className="2xl:px-48 ">
          <form onSubmit={(e) => {}}>
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
                <FormLabel className="mt-5" htmlFor="last">
                  Nume
                </FormLabel>
                <Input
                  className="border-blue"
                  isRequired
                  type="text"
                  id="last"
                  name="last"
                />
              </div>
              <div className="lg:w-1/2 mr-3">
                <FormLabel className="mt-5" htmlFor="first">
                  Prenume
                </FormLabel>
                <Input
                  className="border-blue"
                  isRequired
                  type="text"
                  id="first"
                  name="first"
                />
              </div>
            </div>
            <Upload text="Trageți sau încărcați o poza de profil (opțional)" />
            <br />
            <Upload text="Trageți sau încărcați o poza cu buletinul dvs. (obligatoriu)" />
            <Button className="w-full my-5 shadow " type="submit">
              Salvează
            </Button>
          </form>
        </FormControl>
      </div>
    </div>
  );
};

export default SignUpS3;
