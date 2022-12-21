import { type NextPage } from 'next';
import Head from 'next/head';

import { trpc } from '@/utils/trpc';

import Board from '@/components/Board';

const Home: NextPage = () => {
  const hello = trpc.example.hello.useQuery({ text: 'from tRPC' });

  return (
    <>
      <Head>
        <title>Kanban task manager</title>
        <meta name='description' content='Kanban task manager' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Board />
    </>
  );
};

export default Home;
