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

import { TASK_STATUS_ENUM } from "~/constants";
import { CrossIcon } from "~/assets";

import { type DynamicChakraModalProps } from "~/types";

const MODAL_HEADER = {
  CREATE: "Add New Task",
  EDIT: "Edit Task",
};

const SUBMIT_FORM_BUTTON = {
  CREATE: "Edit Task",
  EDIT: "Save Changes",
};

const createTaskSchema = z.object({
  title: z.string().default("Untitled"),
  description: z.string().optional(),
  subtasks: z
    .array(z.object({ title: z.string().default("Unnamed Column") }))
    .max(10)
    .optional(),
  status: z.enum(TASK_STATUS_ENUM),
});

type FormData = z.infer<typeof createTaskSchema>;

const CreateOrEditTaskModal = ({
  isOpen,
  onClose,
  getDisclosureProps,
  action,
}: DynamicChakraModalProps) => {
  const backgroundColor = useColorModeValue("white", "darkerGray");

  const createOrEditTaskModalDisclosureProps = getDisclosureProps();

  const {
    handleSubmit,
    register,
    control,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(createTaskSchema),
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
            <FormControl isInvalid={Boolean(errors.status)}>
              <FormLabel htmlFor="status" variant="modal-subtitle">
                Status
              </FormLabel>
              <Select
                fontSize="13px"
                borderColor="lightGrayAlpha25"
                iconColor="customPurple.500"
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