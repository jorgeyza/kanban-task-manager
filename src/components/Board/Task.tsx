import {
  Flex,
  Heading,
  Text,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";

import TaskViewModal from "./TaskViewModal";

import { type HTMLProps } from "~/types";
import { api } from "~/utils/api";

interface Props {
  id: string;
}

const Task = ({ id }: Props) => {
  const taskBackgroundColor = useColorModeValue("white", "darkerGray");
  const taskHoverBackgroundColor = useColorModeValue("whiteSoft", "darkGray");
  const { isOpen, onClose, getButtonProps, getDisclosureProps } =
    useDisclosure();

  const taskViewModalButtonProps = getButtonProps() as HTMLProps;

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
        {...taskViewModalButtonProps}
        data-test="test-card"
      >
        <Heading as="h3" variant="task-heading">
          {task?.title}
        </Heading>
        <Text variant="basic-text">{`${
          allSubtasks?.filter((subtask) => subtask.isDone).length ?? 0
        } of ${allSubtasks?.length ?? 0} subtasks`}</Text>
      </Flex>
      {task && allSubtasks && (
        <TaskViewModal
          isOpen={isOpen}
          onClose={onClose}
          getDisclosureProps={getDisclosureProps}
          task={task}
          subtasks={allSubtasks}
        />
      )}
    </>
  );
};

export default Task;
