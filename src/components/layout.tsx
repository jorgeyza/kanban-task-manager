import { Flex } from '@chakra-ui/react';

import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';

const Layout = ({ children, className }: { children: React.ReactNode; className: string }) => {
  return (
    <Flex overflow='hidden' data-test='app-layout' className={className}>
      <Sidebar />
      <Flex flexDirection='column' width='full' data-test='right-side' overflow='auto'>
        <Header />
        <Flex as='main' padding={6} flexGrow={1}>
          {children}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Layout;
