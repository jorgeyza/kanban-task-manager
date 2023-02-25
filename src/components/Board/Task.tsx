import {
  Flex,
  Heading,
  Text,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";

import TaskModal from "./TaskModal";

import { type HTMLProps } from "~/types";
import { api } from "~/utils/api";

interface Props {
  id: string;
}

const Task = ({ id }: Props) => {
  const taskBackgroundColor = useColorModeValue("white", "darkerGray");
  const taskHoverBackgroundColor = useColorModeValue("whiteSoft", "darkGray");
  const { isOpen, onOpen, onClose, getButtonProps, getDisclosureProps } =
    useDisclosure();

  const taskModalButtonProps = getButtonProps() as HTMLProps;

  const { data: task } = api.task.getOne.useQuery({
    id,
  });
  const { data: allSubtasks } = api.subtask.getAllByTaskId.useQuery({
    taskId: id,
  });

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
          {task?.title}
        </Heading>
        <Text variant="basic-text">{`${
          allSubtasks?.filter((subtask) => subtask.isDone).length ?? 0
        } of ${allSubtasks?.length ?? 0} subtasks`}</Text>
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
