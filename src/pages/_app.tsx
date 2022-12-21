import { type AppType } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import { Plus_Jakarta_Sans } from '@next/font/google';

import Layout from '@/components/layout';

import { trpc } from '@/utils/trpc';

import theme from '@/theme';

const plusJakartaSans = Plus_Jakarta_Sans({
  weight: ['500', '700'],
  subsets: ['latin']
});

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <ChakraProvider theme={theme}>
      <Layout className={plusJakartaSans.className}>
        <Component {...pageProps} />
      </Layout>
    </ChakraProvider>
  );
};

export default trpc.withTRPC(MyApp);
