import {
  Flex,
  Heading,
  Text,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";

import TaskModal from "./TaskModal";

import { type HTMLProps } from "~/types";

const Task = () => {
  const taskBackgroundColor = useColorModeValue("white", "darkerGray");
  const taskHoverBackgroundColor = useColorModeValue("whiteSoft", "darkGray");
  const { isOpen, onOpen, onClose, getButtonProps, getDisclosureProps } =
    useDisclosure();

  const taskModalButtonProps = getButtonProps() as HTMLProps;

  return (
    <>
      <Flex
        as="button"
        direction="column"
        rowGap={2}
        w="280px"
        px={6}
        py={4}
        borderRadius={8}
        _hover={{ backgroundColor: taskHoverBackgroundColor }}
        cursor="pointer"
        bgColor={taskBackgroundColor}
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
