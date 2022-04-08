import "../styles/globals.scss";

import Layout from "../components/Layout";

import { ChakraProvider } from "@chakra-ui/react";
import { extendTheme } from "@chakra-ui/react";

import { UserProvider } from "../contexts/userContext";

const colors = {};

const theme = extendTheme({ colors });

import "animate.css";

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <UserProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </UserProvider>
    </ChakraProvider>
  );
}

export default MyApp;
