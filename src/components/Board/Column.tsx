import {
  Box,
  Center,
  Flex,
  Heading,
  Skeleton,
  Spinner,
  useDisclosure,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { useAtom } from "jotai";
import { useInView } from "react-intersection-observer";

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
  const { ref, inView } = useInView();

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

  const {
    data: allTasks,
    error,
    fetchNextPage,
    isFetchingNextPage,
    status,
  } = api.task.getInfiniteByColumnId.useInfiniteQuery(
    {
      columnId: id,
      limit: 10,
    },
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor,
    }
  );
  const { data: task } = api.task.getOne.useQuery({
    id: selectedTaskId,
  });
  const { data: allSubtasks } = api.subtask.getAllByTaskId.useQuery({
    taskId: selectedTaskId,
  });

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView]);

  return status === "loading" ? (
    <Flex columnGap={3}>
      <Skeleton w="280px" maxH="900px" />
    </Flex>
  ) : status === "error" ? (
    <p>Error: {error.message}</p>
  ) : (
    <Flex direction="column" rowGap={5}>
      <Flex columnGap={3} data-test="column-header">
        <Box
          w="15px"
          h="15px"
          borderRadius="50%"
          bgColor={`#${Math.floor(Math.random() * 16777215).toString(16)}`}
        />
        <Heading variant="board-column-title">{`${title} (${
          allTasks?.pages.length ?? 0
        })`}</Heading>
      </Flex>
      <Flex
        direction="column"
        rowGap={5}
        overflowY="auto"
        w={280}
        data-test="column"
      >
        {allTasks?.pages.map((page) => {
          return page.tasks.map((task) => (
            <Task
              key={task.id}
              id={task.id}
              getTaskViewModalButtonProps={getTaskViewModalButtonProps}
            />
          ));
        })}
        <Center ref={ref} w="full" justifyContent="center">
          {isFetchingNextPage ? <Spinner size="lg" /> : "Nothing more to load"}
        </Center>
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
