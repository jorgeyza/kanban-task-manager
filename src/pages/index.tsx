import { type NextPage } from "next";
import Head from "next/head";
import { Box, Button } from "@chakra-ui/react";

import Board from "~/components/Board";
import { ShowSidebarIcon } from "~/assets";
import { useAtom } from "jotai";
import { drawerAtom } from "./_app";

const Home: NextPage = () => {
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
      {!isDrawerOpen && (
        <Button transform="auto" onClick={handleOpenDrawer} translateX="-40px">
          <Box pl={3}>
            <ShowSidebarIcon />
          </Box>
        </Button>
      )}
    </>
  );
};

export default Home;
