import { type AppType } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import { Plus_Jakarta_Sans } from '@next/font/google';

import { trpc } from '@/utils/trpc';

import theme from '@/theme';
import Layout from '@/components/layout';

const plusJakartaSans = Plus_Jakarta_Sans({
  weight: ['500', '700'],
  subsets: ['latin']
});

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <ChakraProvider theme={theme}>
      <main className={plusJakartaSans.className}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </main>
    </ChakraProvider>
  );
};

export default trpc.withTRPC(MyApp);
