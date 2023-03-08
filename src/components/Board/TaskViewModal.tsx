import {
  chakra,
  Box,
  Checkbox,
  CheckboxGroup,
  Flex,
  Heading,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Select,
  Text,
  useColorModeValue,
  VStack,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import { type z } from "zod";
import { type SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router";

import { VerticalEllipsisIcon } from "~/assets";
import { api, type RouterOutputs } from "~/utils/api";

import type { ChakraModalProps, HTMLProps } from "~/types";
import { updateTaskSchema } from "~/schema/task.schema";
import { type MouseEventHandler, useEffect, useMemo } from "react";

type Task = RouterOutputs["task"]["getAllByColumnId"][0];
type Subtask = RouterOutputs["subtask"]["getAllByTaskId"][0];

type FormData = z.infer<typeof updateTaskSchema>;

interface Props extends ChakraModalProps {
  task: Task;
  subtasks: Subtask[];
  createOrEditTaskModalGetButtonProps: ({
    onClick,
  }: {
    onClick: MouseEventHandler<HTMLDivElement>;
  }) => HTMLProps;
}

const TaskViewModal = ({
  isOpen,
  onClose,
  getDisclosureProps,
  createOrEditTaskModalGetButtonProps,
  task,
  subtasks,
}: Props) => {
  const router = useRouter();
  const selectedBoardId = router.query.boardId as string;

  const taskBackgroundColor = useColorModeValue("white", "darkerGray");
  const checkboxBackgroundColor = useColorModeValue(
    "lighterGray",
    "lightBlack"
  );

  const createOrEditTaskModalButtonProps = createOrEditTaskModalGetButtonProps({
    onClick: handleEditTask,
  });

  const taskViewModalDisclosureProps = getDisclosureProps();

  const utils = api.useContext();
  const { data: selectedBoard } = api.board.getOne.useQuery(
    {
      id: selectedBoardId,
    },
    { enabled: !!selectedBoardId }
  );
  const deleteTask = api.task.delete.useMutation({
    onSuccess() {
      void utils.task.getAllByColumnId.invalidate({ columnId: task.columnId });
      onClose();
    },
  });
  const updateTask = api.task.update.useMutation({
    onSuccess(data) {
      void utils.subtask.getAllByTaskId.invalidate({ taskId: task.id });
      void utils.task.getOne.invalidate({ id: task.id });
      void utils.task.getAllByColumnId.invalidate({ columnId: task.columnId });
      void utils.task.getAllByColumnId.invalidate({
        columnId: data[0].columnId,
      });
    },
  });

  const defaultValues = useMemo(
    () => ({
      id: task.id,
      title: task.title,
      description: task.description,
      columnId: task.columnId,
      subtasks: subtasks.map((subtask) => ({
        id: subtask.id,
        title: subtask.title,
        isDone: subtask.isDone,
      })),
      subtasksIdsToDelete: [],
    }),
    [subtasks, task]
  );

  const {
    handleSubmit,
    register,
    reset,
    watch,
    formState: { errors, isSubmitSuccessful, isDirty },
  } = useForm<FormData>({
    resolver: zodResolver(updateTaskSchema),
    defaultValues,
  });

  // Need to render everytime subtasks change, or counter (eg: Subtasks (0 of 3)) will get stuck at first render (eg: Subtasks (1 of 3))
  const watchedSubtasks = watch("subtasks");

  const onSubmit: SubmitHandler<FormData> = (data) => {
    if (isDirty)
      return updateTask.mutate({
        id: task.id,
        title: data.title,
        description: data.description,
        columnId: data.columnId,
        subtasks: data.subtasks,
        subtasksIdsToDelete: data.subtasksIdsToDelete,
      });
  };

  function handleDeleteTask() {
    deleteTask.mutate({ id: task.id });
  }

  function handleEditTask() {
    onClose();
  }

  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues, isSubmitSuccessful, reset]);

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        onCloseComplete={handleSubmit(onSubmit)}
        {...taskViewModalDisclosureProps}
        data-test="task-modal"
      >
        <ModalOverlay />
        <ModalContent rowGap={6} p={8} bgColor={taskBackgroundColor}>
          <ModalHeader p={0}>
            <Flex justify="space-between">
              <Heading as="h4" variant="modal-title">
                {task?.title}
              </Heading>
              <Menu>
                <MenuButton as={Box} cursor="pointer">
                  <VerticalEllipsisIcon />
                </MenuButton>
                <MenuList>
                  <MenuItem {...createOrEditTaskModalButtonProps}>
                    Edit Task
                  </MenuItem>
                  <MenuItem color="customRed" onClick={handleDeleteTask}>
                    Delete Task
                  </MenuItem>
                </MenuList>
              </Menu>
            </Flex>
          </ModalHeader>
          <ModalBody p={0}>
            <chakra.form display="flex" flexDirection="column" rowGap={6}>
              <Text as="p" variant="basic-text">
                {task?.description}
              </Text>
              <FormControl
                borderColor="lightGrayAlpha25"
                isInvalid={Boolean(errors.subtasks)}
              >
                <FormLabel htmlFor="subtask" variant="modal-subtitle">
                  {`Subtasks (${
                    watchedSubtasks.filter((subtask) => subtask.isDone).length
                  } of ${subtasks.length})`}
                </FormLabel>

                <Flex direction="column" rowGap={4}>
                  <CheckboxGroup colorScheme="customPurple">
                    <VStack alignItems="start" spacing={2}>
                      {subtasks.map((subtask, index) => (
                        <Checkbox
                          key={subtask.id}
                          w="full"
                          p={3}
                          borderRadius={4}
                          bgColor={checkboxBackgroundColor}
                          {...register(`subtasks.${index}.isDone` as const)}
                        >
                          <Text variant="modal-checkbox">{subtask.title}</Text>
                        </Checkbox>
                      ))}
                    </VStack>
                  </CheckboxGroup>
                </Flex>
              </FormControl>
              <Flex direction="column" rowGap={2}>
                <Heading as="h5" variant="modal-subtitle">
                  Status
                </Heading>
                <Select
                  fontSize="13px"
                  borderColor="lightGrayAlpha25"
                  iconColor="customPurple.500"
                  {...register("columnId")}
                >
                  {selectedBoard?.columns.map((column) => {
                    return (
                      <option key={column.id} value={column.id}>
                        {column.title}
                      </option>
                    );
                  })}
                </Select>
              </Flex>
            </chakra.form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default TaskViewModal;
