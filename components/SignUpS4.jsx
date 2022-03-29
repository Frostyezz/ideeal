import React from "react";

import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";

const SignUpS4 = () => {
  return (
    <div className="lg:w-1/2 w-full h-full bg-white p-5 animate__animated animate__slideInLeft">
      <div className="h-1/3 flex flex-col justify-center border-b-2 border-t-blue items-center text-center">
        <h1 className="text-7xl font-bold border-2 rounded-full px-5 py-2 border-darkBlue mb-3">
          4
        </h1>
        <h2 className="pb-4">Validarea contului</h2>
      </div>
      <div className="h-2/3 flex items-center justify-center">
        <div className="2xl:px-48 ">
          <Alert
            status="success"
            variant="subtle"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            textAlign="center"
            className="h-full"
          >
            <AlertIcon boxSize="40px" mr={0} />
            <AlertTitle mt={4} mb={1} fontSize="lg">
              Contul a fost creat cu succes!
            </AlertTitle>
            <AlertDescription maxWidth="sm">
              Îți mulțumim {sessionStorage.getItem("name")}. Înainte să puteți
              accesa contul, va fi nevoie să fie validat de către echipa noastră
              de administratori.
            </AlertDescription>
            <Alert status="info" className="mt-3">
              <AlertIcon />
              Veți primi un mail atunci când contul va fi validat. În general,
              acest proces durează câteva ore.
            </Alert>
          </Alert>
        </div>
      </div>
    </div>
  );
};

export default SignUpS4;
