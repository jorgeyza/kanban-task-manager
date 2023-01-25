import { Flex } from "@chakra-ui/react";

import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";

const Layout = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className: string;
}) => {
  return (
    <Flex overflow="hidden" data-test="app-layout" className={className}>
      <Sidebar />
      <Flex
        flexDirection="column"
        width="full"
        overflow="auto"
        data-test="right-side"
      >
        <Header />
        <Flex
          as="main"
          flexGrow={1}
          flexDirection="column"
          alignItems="flex-start"
          rowGap={4}
          height="calc(100vh - 97px)"
          padding={6}
          data-test="main-container"
        >
          {children}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Layout;
