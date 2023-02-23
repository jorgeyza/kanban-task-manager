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
      <Flex
        direction="column"
        overflow="auto"
        w="full"
        data-test="right-side"
      >
        <Header />
        <Flex
          as="main"
          align="flex-start"
          direction="column"
          flexGrow={1}
          rowGap={4}
          overflow="auto"
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
