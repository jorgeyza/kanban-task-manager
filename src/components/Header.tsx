import { Box, Button, Flex, Heading, useColorModeValue } from '@chakra-ui/react';
import Image from 'next/image';

import { verticalEllipsisIcon } from '@/assets';

const Header = () => {
  const borderColor = useColorModeValue('lightGray', 'lightGrayAlpha25');
  const backgroundColor = useColorModeValue('white', 'darkerGray');
  return (
    <Flex
      as='header'
      backgroundColor={backgroundColor}
      justifyContent='space-between'
      height='96px'
      alignItems='center'
      padding={5}
      borderBottomColor={borderColor}
      borderBottomWidth='thin'>
      <Heading as='h2' size='md'>
        Platform Launch
      </Heading>
      <Flex alignItems='center' columnGap={6}>
        <Button variant='primary' size='lg'>
          + Add New Task
        </Button>
        <Box position='relative'>
          <Image src={verticalEllipsisIcon} alt='options menu' />
        </Box>
      </Flex>
    </Flex>
  );
};

export default Header;
