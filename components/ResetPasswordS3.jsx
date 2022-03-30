import React, { useState } from "react";

import {
  FormLabel,
  Alert,
  FormControl,
  Input,
  Button,
  AlertIcon,
  CircularProgress,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";

const ResetPasswordS3 = ({
  error,
  loading,
  sendPassword,
  setResetPassword,
}) => {
  const [success, setSuccess] = useState(false);
  return (
    <div className="h-full flex flex-col items-center lg:justify-center animate__animated animate__slideInLeft">
      {!success && (
        <h1 className="font-bold text-center text-2xl">
          Introduceți noua parolă
        </h1>
      )}

      <FormControl className="2xl:px-48">
        {!success ? (
          <form
            onSubmit={(e) => {
              setSuccess(true);
              sendPassword(e);
            }}
          >
            {error && (
              <Alert
                status="error"
                className="rounded animate__animated animate__fadeInDown animate__faster mt-5"
              >
                <AlertIcon />
                {error}
              </Alert>
            )}
            <FormLabel className="mt-5" htmlFor="password">
              Parolă
            </FormLabel>
            <Input
              className="border-blue"
              isRequired
              type="password"
              id="password"
              name="password"
            />
            <FormLabel className="mt-5" htmlFor="confirm">
              Confirmare parolă
            </FormLabel>
            <Input
              className="border-blue"
              isRequired
              type="password"
              id="confirm"
              name="confirm"
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
                Schimbă parola
              </Button>
            )}
          </form>
        ) : (
          <Alert
            status="success"
            variant="subtle"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            textAlign="center"
            className="h-full animate__animated animate__slideInLeft"
          >
            <AlertIcon boxSize="40px" mr={0} />
            <AlertTitle mt={4} mb={1} fontSize="lg">
              Parola a fost schimbată cu succes!
            </AlertTitle>
            <AlertDescription maxWidth="sm">
              Acum te poți loga folosind noua parolă.
            </AlertDescription>
            <Button
              colorScheme="blue"
              className="w-full mt-5 shadow"
              onClick={setResetPassword}
            >
              Loghează-te
            </Button>
          </Alert>
        )}
      </FormControl>
    </div>
  );
};

export default ResetPasswordS3;
