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

const ResetPasswordS1 = ({ error, loading, sendEmail }) => {
  return (
    <div className="h-full flex flex-col items-center lg:justify-center animate__animated animate__slideInLeft">
      <h1 className="font-bold text-center text-2xl">
        Introduceți adresa de email a contului dvs.
      </h1>

      <FormControl className="2xl:px-48">
        <Alert status="info" className="my-5">
          <AlertIcon />
          Vă vom trimite un cod pe adresa de email pentru a verifica dacă
          sunteti proprietarul contului.
        </Alert>
        <form onSubmit={(e) => sendEmail(e)}>
          {error && (
            <Alert
              status="error"
              className="rounded animate__animated animate__fadeInDown animate__faster"
            >
              <AlertIcon />
              {error}
            </Alert>
          )}
          <FormLabel className="mt-5" htmlFor="email">
            Adresă de email
          </FormLabel>
          <Input
            className="border-blue"
            isRequired
            type="email"
            id="email"
            name="email"
          />
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
              Trimite-mi codul
            </Button>
          )}
        </form>
      </FormControl>
    </div>
  );
};

export default ResetPasswordS1;
