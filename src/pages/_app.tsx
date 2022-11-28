import { type AppType } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';

import { trpc } from '@/utils/trpc';

import '../styles/globals.css';

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <ChakraProvider>
      <Component {...pageProps} />
    </ChakraProvider>
  );
};

export default trpc.withTRPC(MyApp);
