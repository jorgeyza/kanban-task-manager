import { Box, Flex, Heading, useDisclosure } from "@chakra-ui/react";
import { useAtom } from "jotai";

import Task from "./Task";
import TaskViewModal from "./TaskViewModal";
import CreateOrEditTaskModal from "../CreateOrEditTaskModal";

import { api } from "~/utils/api";
import { selectedTaskIdAtom } from "~/pages/_app";
import { DYNAMIC_CHAKRA_MODAL_ACTION } from "~/constants";

interface Props {
  id: string;
  title: string;
}

const Column = ({ id, title }: Props) => {
  const [selectedTaskId] = useAtom(selectedTaskIdAtom);

  const {
    isOpen: taskViewModalIsOpen,
    onClose: taskViewModalOnClose,
    getButtonProps: getTaskViewModalButtonProps,
    getDisclosureProps: taskViewModalGetDisclosureProps,
  } = useDisclosure();

  const {
    isOpen: createOrEditTaskModalIsOpen,
    onClose: createOrEditTaskModalOnClose,
    getButtonProps: createOrEditTaskModalGetButtonProps,
    getDisclosureProps: createOrEditTaskModalGetDisclosureProps,
  } = useDisclosure();

  const { data: allTasks } = api.task.getAllByColumnId.useQuery({
    columnId: id,
  });
  const { data: task } = api.task.getOne.useQuery({
    id: selectedTaskId,
  });
  const { data: allSubtasks } = api.subtask.getAllByTaskId.useQuery({
    taskId: selectedTaskId,
  });

  return (
    <Flex direction="column" rowGap={5}>
      <Flex columnGap={3} data-test="column-header">
        <Box
          w="15px"
          h="15px"
          borderRadius="50%"
          bgColor={`#${Math.floor(Math.random() * 16777215).toString(16)}`}
        />
        <Heading variant="board-column-title">{`${title} (${
          allTasks?.length ?? 0
        })`}</Heading>
      </Flex>
      <Flex
        direction="column"
        rowGap={5}
        overflowY="auto"
        w={280}
        data-test="column"
      >
        {allTasks?.map((task) => (
          <Task
            key={task.id}
            id={task.id}
            getTaskViewModalButtonProps={getTaskViewModalButtonProps}
          />
        ))}
        {task && allSubtasks && (
          <TaskViewModal
            isOpen={taskViewModalIsOpen}
            onClose={taskViewModalOnClose}
            getDisclosureProps={taskViewModalGetDisclosureProps}
            createOrEditTaskModalGetButtonProps={
              createOrEditTaskModalGetButtonProps
            }
            task={task}
            subtasks={allSubtasks}
          />
        )}
        {task && allSubtasks && createOrEditTaskModalIsOpen && (
          <CreateOrEditTaskModal
            isOpen={createOrEditTaskModalIsOpen}
            onClose={createOrEditTaskModalOnClose}
            getDisclosureProps={createOrEditTaskModalGetDisclosureProps}
            action={DYNAMIC_CHAKRA_MODAL_ACTION.EDIT}
            task={task}
            subtasks={allSubtasks}
          />
        )}
      </Flex>
    </Flex>
  );
};

export default Column;
