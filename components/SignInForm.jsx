import React from "react";

import {
  FormLabel,
  Alert,
  FormControl,
  Input,
  Button,
  AlertIcon,
  CircularProgress,
} from "@chakra-ui/react";

const SignInForm = ({ error, loading, setResetPassword, logIn }) => {
  return (
    <div className="h-full flex flex-col items-center lg:justify-center">
      <h1 className="font-bold text-center text-2xl">
        Completați câmpurile pentru a intra in cont
      </h1>
      <FormControl className="2xl:px-48">
        <form onSubmit={(e) => logIn(e)}>
          {error && (
            <Alert
              status="error"
              className="rounded mt-5 animate__animated animate__fadeInDown animate__faster"
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
              Loghează-te
            </Button>
          )}
          <Button onClick={setResetPassword} className="w-full mt-5 shadow">
            Resetează-ți parola
          </Button>
        </form>
      </FormControl>
    </div>
  );
};

export default SignInForm;
