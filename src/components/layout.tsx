import { Flex } from "@chakra-ui/react";

import Sidebar from "~/components/Sidebar";
import Header from "~/components/Header";

const Layout = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className: string;
}) => {
  return (
    <Flex className={className} overflow="hidden" data-test="app-layout">
      <Sidebar />
      <Flex direction="column" w="full" maxH="100vh" data-test="right-side">
        <Header />
        <Flex
          as="main"
          align="flex-start"
          direction="column"
          flexGrow={1}
          rowGap={4}
          maxW="calc(100vw - 300px)"
          maxH="calc(100vh - 97px)"
          p={6}
          data-test="main-container"
        >
          {children}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Layout;
