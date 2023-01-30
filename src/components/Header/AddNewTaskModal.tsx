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
import * as z from "zod";

import { TASK_STATUS_ENUM } from "@/constants";
import type { ChakraModalProps } from "@/types";
import { CrossIcon } from "@/assets";

const addTaskSchema = z.object({
  title: z.string().default("Untitled"),
  description: z.string().optional(),
  subtasks: z.array(z.object({ title: z.string() })).optional(),
  status: z.enum(TASK_STATUS_ENUM),
});

type FormData = z.infer<typeof addTaskSchema>;

const AddNewTaskModal = ({
  isOpen,
  onClose,
  getDisclosureProps,
}: ChakraModalProps) => {
  const backgroundColor = useColorModeValue("white", "darkerGray");

  const addNewTaskModalDisclosureProps = getDisclosureProps();

  const {
    handleSubmit,
    register,
    control,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(addTaskSchema),
    defaultValues: {
      subtasks: [{ title: "" }],
      status: "To do",
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "subtasks",
  });

  const onSubmit: SubmitHandler<FormData> = (data) => console.log(data);

  const handleAddNewSubtask = () => {
    append({ title: "" });
  };

  const handleDeleteSubtask = (index: number) => {
    remove(index);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      isCentered
      size="lg"
      {...addNewTaskModalDisclosureProps}
    >
      <ModalOverlay />
      <ModalContent backgroundColor={backgroundColor} padding={8} rowGap={6}>
        <ModalHeader padding={0}>
          <Heading as="h4" variant="modal-title">
            Add New Task
          </Heading>
        </ModalHeader>
        <ModalBody display="flex" flexDirection="column" rowGap={6} padding={0}>
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
              <Flex
                flexDirection="column"
                rowGap={3}
                maxHeight={250}
                overflow="auto"
              >
                {fields.map((subtask, index) => {
                  return (
                    <Flex key={subtask.id} columnGap={4}>
                      <Input
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
            <Button
              width="full"
              variant="secondary"
              onClick={handleAddNewSubtask}
            >
              Add New Subtask
            </Button>
            <FormControl isInvalid={Boolean(errors.status)}>
              <FormLabel htmlFor="status" variant="modal-subtitle">
                Status
              </FormLabel>
              <Select
                iconColor="customPurple.500"
                borderColor="lightGrayAlpha25"
                fontSize="13px"
                {...register("status")}
              >
                {TASK_STATUS_ENUM.map((taskStatus) => {
                  return (
                    <option key={taskStatus} value={taskStatus}>
                      {taskStatus}
                    </option>
                  );
                })}
              </Select>
            </FormControl>
            <Button
              width="full"
              variant="primary"
              isLoading={isSubmitting}
              type="submit"
            >
              Create Task
            </Button>
          </chakra.form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default AddNewTaskModal;
