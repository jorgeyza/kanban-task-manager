import { Flex, Heading, Text, useColorModeValue } from "@chakra-ui/react";
import { useAtom } from "jotai";

import { type HTMLProps } from "~/types";
import { api } from "~/utils/api";
import { selectedTaskIdAtom } from "~/pages/_app";
import { type MouseEventHandler } from "react";

interface Props {
  id: string;
  getTaskViewModalButtonProps: ({
    onClick,
  }: {
    onClick: MouseEventHandler<HTMLDivElement>;
  }) => HTMLProps;
}

const Task = ({ id, getTaskViewModalButtonProps }: Props) => {
  const taskBackgroundColor = useColorModeValue("white", "darkerGray");
  const taskHoverBackgroundColor = useColorModeValue("whiteSoft", "darkGray");

  const [, setSelectedTaskId] = useAtom(selectedTaskIdAtom);

  const taskViewModalButtonProps = getTaskViewModalButtonProps({
    onClick: handleClickTask,
  });

  const { data: task } = api.task.getOne.useQuery({
    id,
  });
  const { data: allSubtasks } = api.subtask.getAllByTaskId.useQuery({
    taskId: id,
  });

  function handleClickTask() {
    setSelectedTaskId(id);
  }

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
    </>
  );
};

export default Task;
