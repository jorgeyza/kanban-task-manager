import { type NextPage } from "next";
import Head from "next/head";
import { Box, Button } from "@chakra-ui/react";

import { api } from "~/utils/api";

import Board from "~/components/Board";
import { ShowSidebarIcon } from "~/assets";
import { useAtom } from "jotai";
import { drawerAtom } from "./_app";

const Home: NextPage = () => {
  const { data: allBoards } = api.board.getAll.useQuery();
  const [isDrawerOpen, setIsDrawerOpen] = useAtom(drawerAtom);

  const handleOpenDrawer = () => {
    setIsDrawerOpen(true);
  };

  return (
    <>
      <Head>
        <title>Kanban task manager</title>
        <meta name="description" content="Kanban task manager" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Board />
      <pre>{JSON.stringify(allBoards, null, 2)}</pre>
      {!isDrawerOpen && (
        <Button transform="auto" translateX="-40px" onClick={handleOpenDrawer}>
          <Box paddingLeft={3}>
            <ShowSidebarIcon />
          </Box>
        </Button>
      )}
    </>
  );
};

export default Home;
