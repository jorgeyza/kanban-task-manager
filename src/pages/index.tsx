import { type NextPage } from 'next';
import Head from 'next/head';

import { trpc } from '@/utils/trpc';

const Home: NextPage = () => {
  const hello = trpc.example.hello.useQuery({ text: 'from tRPC' });

  return (
    <>
      <Head>
        <title>Kanban Manager</title>
        <meta name='description' content='Kanban task manager' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <div>Here goes a project</div>
    </>
  );
};

export default Home;
