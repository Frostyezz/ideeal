import React, { useState } from "react";

import Countdown from "react-countdown";

import {
  FormLabel,
  Alert,
  FormControl,
  Input,
  Button,
  AlertIcon,
  CircularProgress,
} from "@chakra-ui/react";

import axios from "axios";

const renderer = ({ minutes, seconds, completed }) => {
  if (!completed) {
    return (
      <Button className="w-full mt-5 shadow" isDisabled>
        {minutes}:{seconds}
      </Button>
    );
  } else return <></>;
};

const ResetPasswordS2 = ({ error, loading, verifyToken, setError, email }) => {
  const [cooldown, setCooldown] = useState(false);

  const resendToken = async () => {
    setError(null);
    const { data } = await axios.patch("/api/resetPassword", { email });
    if (data.status === "ERROR")
      setError("A apărut o eroare. Vă rugam încercați din nou mai târziu!");
    else {
      setCooldown(true);
      setTimeout(() => setCooldown(false), 120000);
    }
  };

  return (
    <div className="h-full flex items-center">
      <FormControl className="2xl:px-48">
        <h1 className="font-bold text-center text-2xl">
          Introduceți codul primit pe adresa de email
        </h1>
        <Alert status="info" className="my-5">
          <AlertIcon />
          În cazul în care nu vă apare mail-ul, verificați și secțiunea de spam!
        </Alert>
        <form onSubmit={(e) => verifyToken(e)}>
          {error && (
            <Alert
              status="error"
              className="rounded animate__animated animate__fadeInDown animate__faster"
            >
              <AlertIcon />
              {error}
            </Alert>
          )}
          <FormLabel className="mt-5 text-center" htmlFor="token">
            Cod de verificare
          </FormLabel>
          <Input
            className="border-blue"
            isRequired
            type="text"
            id="token"
            name="token"
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
              Confirmă
            </Button>
          )}
          {cooldown ? (
            <Countdown date={Date.now() + 120000} renderer={renderer} />
          ) : (
            <Button className="w-full mt-5 shadow" onClick={resendToken}>
              Trimite-mi un cod nou
            </Button>
          )}
        </form>
      </FormControl>
    </div>
  );
};

export default ResetPasswordS2;
