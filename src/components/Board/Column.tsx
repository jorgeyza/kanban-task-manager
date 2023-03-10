import {
  Box,
  Center,
  Flex,
  Heading,
  Skeleton,
  Spinner,
  useDisclosure,
} from "@chakra-ui/react";
import { useEffect, useRef } from "react";
import { useAtom } from "jotai";
import { useVirtualizer } from "@tanstack/react-virtual";

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

  const { data: task } = api.task.getOne.useQuery({
    id: selectedTaskId,
  });
  const { data: allSubtasks } = api.subtask.getAllByTaskId.useQuery({
    taskId: selectedTaskId,
  });
  const {
    data,
    status,
    error,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = api.task.getInfiniteByColumnId.useInfiniteQuery(
    {
      columnId: id,
      limit: 10,
    },
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor,
    }
  );

  const allTasks = data ? data.pages.flatMap((page) => page.tasks) : [];

  const parentRef = useRef<HTMLDivElement>(null);

  const taskVirtualizer = useVirtualizer({
    count: hasNextPage ? allTasks.length + 1 : allTasks.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 77.5 + 20,
    overscan: 5,
  });

  const virtualTasks = taskVirtualizer.getVirtualItems();

  useEffect(() => {
    const [lastItem] = [...taskVirtualizer.getVirtualItems()].reverse();

    if (!lastItem) {
      return;
    }

    if (
      lastItem.index >= allTasks.length - 1 &&
      hasNextPage &&
      !isFetchingNextPage
    ) {
      void fetchNextPage();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    hasNextPage,
    fetchNextPage,
    allTasks.length,
    isFetchingNextPage,
    taskVirtualizer.getVirtualItems(),
  ]);

  return status === "loading" ? (
    <Flex columnGap={3}>
      <Skeleton w="280px" maxH="900px" />
    </Flex>
  ) : status === "error" ? (
    <p>Error: {error.message}</p>
  ) : (
    <>
      <Flex direction="column" rowGap={5} data-test="column">
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
        <Box
          ref={parentRef}
          overflowY="auto"
          w={280}
          data-test="virtualizer-container"
        >
          <Box
            sx={{
              contain: "strict",
            }}
            pos="relative"
            w="100%"
            h={`${
              taskVirtualizer.getTotalSize() + virtualTasks.length * 20 - 20
            }px`}
            data-test="inner-virtualizer-container"
          >
            <Flex
              pos="absolute"
              top={0}
              left={0}
              direction="column"
              rowGap={5}
              w="100%"
              transform={`translateY(${virtualTasks?.[0]?.start as number}px)`}
              data-test="task-container"
            >
              {virtualTasks.map((virtualTask) => {
                const isLoaderTask = virtualTask.index > allTasks.length - 1;
                const task = allTasks[virtualTask.index];
                if (!task) return;

                return (
                  <Box
                    key={task.id}
                    ref={taskVirtualizer.measureElement}
                    data-index={virtualTask.index}
                  >
                    {isLoaderTask ? (
                      hasNextPage ? (
                        <Center justifyContent="center" w="full">
                          <Spinner size="lg" />
                        </Center>
                      ) : (
                        "Nothing more to load"
                      )
                    ) : (
                      <Task
                        id={task?.id}
                        getTaskViewModalButtonProps={
                          getTaskViewModalButtonProps
                        }
                      />
                    )}
                  </Box>
                );
              })}
            </Flex>
          </Box>
        </Box>
      </Flex>
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
    </>
  );
};

export default Column;
