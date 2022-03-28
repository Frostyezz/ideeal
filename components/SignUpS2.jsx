import React, { useState } from "react";

import Countdown from "react-countdown";

import {
  FormLabel,
  Alert,
  FormControl,
  Input,
  Button,
  AlertIcon,
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
const SignUpS2 = ({ error, verifyToken, id, setError }) => {
  const [cooldown, setCooldown] = useState(false);

  const resendToken = async () => {
    setError(null);
    const { data } = await axios.patch("/api/verifyEmail", { id });
    console.log(data);
    if (data.status === "ERROR")
      setError("A apărut o eroare. Vă rugam încercați din nou mai târziu!");
    else {
      setCooldown(true);
      setTimeout(() => setCooldown(false), 120000);
    }
  };

  return (
    <div className="lg:w-1/2 w-full h-full bg-white p-5">
      <div className="h-1/3 flex flex-col justify-center border-b-2 border-t-blue items-center text-center">
        <h1 className="text-7xl font-bold border-2 rounded-full px-6 py-2 border-darkBlue mb-3">
          2
        </h1>
        <h2 className="pb-4">
          V-am trimis un cod de verificare pe adresa de email. Introduceți-l mai
          jos!
        </h2>
      </div>
      <div className="h-2/3 flex items-center">
        <FormControl className="2xl:px-48">
          <Alert status="info" className="mb-5">
            <AlertIcon />
            În cazul în care nu vă apare mail-ul, verificați și secțiunea de
            spam!
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
            <Button className="w-full mt-5 shadow" type="submit">
              Confirmă
            </Button>
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
    </div>
  );
};

export default SignUpS2;
