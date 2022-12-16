import { Container, Grid, GridItem } from '@chakra-ui/react';

import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Grid templateColumns='300px 1fr' height='100vh'>
      <GridItem>
        <Sidebar />
      </GridItem>
      <GridItem height={'full'}>
        <Header />
        <Container maxW='container.md' position='relative'>
          {children}
        </Container>
      </GridItem>
    </Grid>
  );
};

export default Layout;
