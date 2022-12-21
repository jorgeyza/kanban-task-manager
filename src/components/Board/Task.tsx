import {
  Box,
  Checkbox,
  CheckboxGroup,
  Flex,
  Heading,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Select,
  Text,
  useColorModeValue,
  useDisclosure,
  VStack
} from '@chakra-ui/react';

import { VerticalEllipsisIconSVG } from '@/assets';

const Task = () => {
  const taskBackgroundColor = useColorModeValue('white', 'darkerGray');
  const checkboxBackgroundColor = useColorModeValue('lighterGray', 'lightBlack');
  const { isOpen, onOpen, onClose, getButtonProps, getDisclosureProps } = useDisclosure();

  const taskmodalButtonProps = getButtonProps();
  const taskmodalDisclosureProps = getDisclosureProps();

  return (
    <>
      <Flex
        as='button'
        flexDirection='column'
        rowGap={2}
        width='280px'
        paddingX={6}
        paddingY={4}
        borderRadius={8}
        backgroundColor={taskBackgroundColor}
        cursor='pointer'
        onClick={onOpen}
        {...taskmodalButtonProps}
      >
        <Heading as='h3' variant='task-heading'>
          Create paper prototypes and conduct 10 usability tests with potential customers
        </Heading>
        <Text variant='basic-text'>1 of 3 subtasks</Text>
      </Flex>
      <Modal isOpen={isOpen} onClose={onClose} {...taskmodalDisclosureProps}>
        <ModalOverlay />
        <ModalContent backgroundColor={taskBackgroundColor} padding={8} rowGap={6}>
          <ModalHeader padding={0}>
            <Flex justifyContent='space-between'>
              <Heading as='h4' variant='modal-title'>
                Create paper prototypes and conduct 10 usability tests with potential customers
              </Heading>
              <Box flexShrink={0} cursor='pointer'>
                <VerticalEllipsisIconSVG />
              </Box>
            </Flex>
          </ModalHeader>
          <ModalBody display='flex' flexDirection='column' rowGap={6} padding={0}>
            <Text as='p' variant='basic-text'>
              some description goes here lalala alala alalalalalala allalaa al allaa some-tlaas-dfdfssd
            </Text>
            <Flex flexDirection='column' rowGap={4}>
              <Heading as='h5' variant='modal-subtitle'>
                Subtasks (2 of 2)
              </Heading>
              <CheckboxGroup colorScheme='customPurple' defaultValue={['naruto', 'kakashi']}>
                <VStack spacing={2} alignItems='start'>
                  <Checkbox value='naruto' width='full' padding={3} borderRadius={4} backgroundColor={checkboxBackgroundColor}>
                    <Text variant='modal-checkbox'>Meet to review notes from previous tests and plan changes</Text>
                  </Checkbox>
                  <Checkbox value='sasuke' width='full' padding={3} borderRadius={4} backgroundColor={checkboxBackgroundColor}>
                    <Text variant='modal-checkbox'>Make changes to paper prototypes</Text>
                  </Checkbox>
                  <Checkbox value='kakashi' width='full' padding={3} borderRadius={4} backgroundColor={checkboxBackgroundColor}>
                    <Text variant='modal-checkbox'>Conduct 5 usability tests</Text>
                  </Checkbox>
                </VStack>
              </CheckboxGroup>
            </Flex>
            <Flex flexDirection='column' rowGap={2}>
              <Heading as='h5' variant='modal-subtitle'>
                Status
              </Heading>
              <Select placeholder='Select option' iconColor='customPurple.500' borderColor='lightGrayAlpha25' fontSize='13px'>
                <option value='option1'>Option 1</option>
                <option value='option2'>Option 2</option>
                <option value='option3'>Option 3</option>
              </Select>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Task;
