import {
  Flex,
  Heading,
  Text,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";

import TaskModal from "./TaskModal";

const Task = () => {
  const taskBackgroundColor = useColorModeValue("white", "darkerGray");
  const taskHoverBackgroundColor = useColorModeValue("whiteSoft", "darkGray");
  const { isOpen, onOpen, onClose, getButtonProps, getDisclosureProps } =
    useDisclosure();

  const taskModalButtonProps = getButtonProps();

  return (
    <>
      <Flex
        as="button"
        flexDirection="column"
        rowGap={2}
        paddingX={6}
        paddingY={4}
        width="280px"
        borderRadius={8}
        backgroundColor={taskBackgroundColor}
        cursor="pointer"
        _hover={{ backgroundColor: taskHoverBackgroundColor }}
        onClick={onOpen}
        {...taskModalButtonProps}
      >
        <Heading as="h3" variant="task-heading">
          Create paper prototypes and conduct 10 usability tests with potential
          customers
        </Heading>
        <Text variant="basic-text">1 of 3 subtasks</Text>
      </Flex>
      <TaskModal
        isOpen={isOpen}
        onClose={onClose}
        getDisclosureProps={getDisclosureProps}
      />
    </>
  );
};

export default Task;
