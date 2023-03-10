import { type AppType } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { Plus_Jakarta_Sans } from "@next/font/google";
import { atom, Provider } from "jotai";

import Layout from "~/components/layout";

import { api } from "~/utils/api";

import theme from "~/theme";

const plusJakartaSans = Plus_Jakarta_Sans({
  weight: ["500", "700"],
  subsets: ["latin"],
});

export const drawerAtom = atom(true);
export const selectedTaskIdAtom = atom("");

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <ChakraProvider theme={theme}>
      <Provider>
        <Layout className={plusJakartaSans.className}>
          <Component {...pageProps} />
        </Layout>
      </Provider>
    </ChakraProvider>
  );
};

export default api.withTRPC(MyApp);
