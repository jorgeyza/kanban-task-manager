import {
  chakra,
  Button,
  Heading,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Select,
  Textarea,
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  useColorModeValue,
  Flex,
  Center,
} from "@chakra-ui/react";
import { useFieldArray, useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, type KeyboardEvent } from "react";
import { type z } from "zod";
import { useAtom } from "jotai";

import { CrossIcon } from "~/assets";

import { type DynamicChakraModalProps } from "~/types";
import { createTaskSchema } from "~/schema/task.schema";
import { api } from "~/utils/api";
import { selectedBoardIdAtom } from "~/pages/_app";
import { DynamicChakraModalAction } from "~/constants";

const MODAL_HEADER = {
  [DynamicChakraModalAction.CREATE]: "Add New Task",
  [DynamicChakraModalAction.EDIT]: "Edit Task",
} as const;

const SUBMIT_FORM_BUTTON = {
  [DynamicChakraModalAction.CREATE]: "Create Task",
  [DynamicChakraModalAction.EDIT]: "Save Changes",
} as const;

type FormData = z.infer<typeof createTaskSchema>;

const CreateOrEditTaskModal = ({
  isOpen,
  onClose,
  getDisclosureProps,
  action,
  task,
  subtasks,
}: DynamicChakraModalProps) => {
  const backgroundColor = useColorModeValue("white", "darkerGray");

  const createOrEditTaskModalDisclosureProps = getDisclosureProps();

  const [selectedBoardId] = useAtom(selectedBoardIdAtom);

  const { data: selectedBoard } = api.board.getOne.useQuery({
    id: selectedBoardId,
  });

  const utils = api.useContext();
  const createTask = api.task.create.useMutation({
    onSuccess(data) {
      void utils.task.getAllByColumnId.invalidate({ columnId: data.columnId });
      onClose();
    },
  });
  const updateTask = api.task.update.useMutation({
    onSuccess() {
      void utils.task.getOne.invalidate({ id: task?.id });
      onClose();
    },
  });

  const defaultValues =
    task && subtasks
      ? {
          title: task.title,
          description: task.description,
          subtasks,
          columnId: task.columnId,
        }
      : {
          title: "",
          description: "",
          subtasks: [{ title: "", isDone: false }],
          columnId: "",
        };

  const {
    handleSubmit,
    register,
    reset,
    getValues,
    control,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<FormData>({
    resolver: zodResolver(createTaskSchema),
    defaultValues,
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "subtasks",
  });

  const onSubmit: SubmitHandler<FormData> = (data) => {
    // Prevent submit if I am focusing on adding new columns
    if (document.activeElement?.id.startsWith("field")) {
      return;
    }

    const modifiedSubtasks = data.subtasks.map((subtask) => {
      return subtask.title === ""
        ? { title: "Untitled", isDone: subtask.isDone }
        : { title: subtask.title, isDone: subtask.isDone };
    });

    switch (action) {
      case DynamicChakraModalAction.CREATE:
        return createTask.mutate({
          title: data.title,
          description: data.description,
          columnId: data.columnId,
          subtasks: modifiedSubtasks,
        });

      case DynamicChakraModalAction.EDIT:
        if (task) {
          return updateTask.mutate({
            id: task.id,
            title: data.title,
            description: data.description,
            columnId: data.columnId,
            subtasks: modifiedSubtasks,
          });
        }
        break;

      default:
        const exhaustiveCheck: never = action;
        throw new Error(exhaustiveCheck);
    }
  };

  const handleAddNewSubtask = () => {
    append({ title: "", isDone: false });
  };

  const handleDeleteSubtask = (index: number) => {
    remove(index);
  };

  const handleOnKeyDown = (
    event: KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (
      event.key === "Enter" &&
      getValues(`subtasks.${index}.title`).length > 0
    ) {
      handleAddNewSubtask();
    }
  };

  useEffect(() => {
    reset();
  }, [isSubmitSuccessful, reset]);

  return (
    <Modal
      isCentered
      isOpen={isOpen}
      onClose={onClose}
      size="lg"
      {...createOrEditTaskModalDisclosureProps}
    >
      <ModalOverlay />
      <ModalContent rowGap={6} p={8} bgColor={backgroundColor}>
        <ModalHeader p={0}>
          <Heading as="h4" variant="modal-title">
            {MODAL_HEADER[action]}
          </Heading>
        </ModalHeader>
        <ModalBody flexDir="column" rowGap={6} display="flex" p={0}>
          <chakra.form
            display="flex"
            flexDirection="column"
            rowGap={6}
            onSubmit={handleSubmit(onSubmit)}
          >
            <FormControl
              borderColor="lightGrayAlpha25"
              isInvalid={Boolean(errors.title)}
            >
              <FormLabel htmlFor="title" variant="modal-subtitle">
                Title
              </FormLabel>
              <Input
                id="title"
                placeholder="e.g Take coffee break"
                {...register("title")}
              />
              <FormErrorMessage>
                {errors.title && errors.title.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl
              borderColor="lightGrayAlpha25"
              isInvalid={Boolean(errors.description)}
            >
              <FormLabel htmlFor="description" variant="modal-subtitle">
                Description
              </FormLabel>
              <Textarea
                id="description"
                placeholder="It's always good to take a break. This  15 minute break will  recharge the batteries  a little."
                {...register("description")}
              />
              <FormErrorMessage>
                {errors.description && errors.description.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl
              borderColor="lightGrayAlpha25"
              isInvalid={Boolean(errors.subtasks)}
            >
              <FormLabel htmlFor="subtask" variant="modal-subtitle">
                Subtasks
              </FormLabel>
              <Flex direction="column" rowGap={3} overflow="auto" maxH={250}>
                {fields.map((subtask, index) => {
                  return (
                    <Flex key={subtask.id} columnGap={4}>
                      <Input
                        onKeyDown={(event) => handleOnKeyDown(event, index)}
                        placeholder="e.g Make coffee"
                        {...register(`subtasks.${index}.title` as const)}
                      />
                      <Center
                        cursor="pointer"
                        onClick={() => handleDeleteSubtask(index)}
                      >
                        <CrossIcon />
                      </Center>
                    </Flex>
                  );
                })}
              </Flex>
              <FormErrorMessage>
                {errors.subtasks && errors.subtasks.message}
              </FormErrorMessage>
            </FormControl>
            <Button w="full" onClick={handleAddNewSubtask} variant="secondary">
              Add New Subtask
            </Button>
            <FormControl isInvalid={Boolean(errors.columnId)}>
              <FormLabel htmlFor="columnId" variant="modal-subtitle">
                Status
              </FormLabel>
              <Select
                fontSize="13px"
                borderColor="lightGrayAlpha25"
                iconColor="customPurple.500"
                {...register("columnId")}
              >
                {selectedBoard?.columns?.map((column) => {
                  return (
                    <option key={column.id} value={column.id}>
                      {column.title}
                    </option>
                  );
                })}
              </Select>
              <FormErrorMessage>
                {errors.columnId && errors.columnId.message}
              </FormErrorMessage>
            </FormControl>
            <Button
              w="full"
              isLoading={isSubmitting}
              type="submit"
              variant="primary"
            >
              {SUBMIT_FORM_BUTTON[action]}
            </Button>
          </chakra.form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default CreateOrEditTaskModal;
