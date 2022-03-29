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

const SignUpS1 = ({ error, sendCredentials, loading }) => {
  return (
    <div className="lg:w-1/2 w-full h-full bg-white p-5 animate__animated animate__slideInLeft">
      <div className="h-1/3 flex flex-col justify-center border-b-2 border-t-blue items-center text-center">
        <h1 className="text-7xl font-bold border-2 rounded-full px-6 border-darkBlue mb-3">
          1
        </h1>
        <h2>Introduceți credențialele pentru noul cont</h2>
      </div>
      <div className="h-2/3 flex items-center">
        <FormControl className="2xl:px-48">
          <form onSubmit={(e) => sendCredentials(e)}>
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
                Mai departe
              </Button>
            )}
          </form>
        </FormControl>
      </div>
    </div>
  );
};

export default SignUpS1;
