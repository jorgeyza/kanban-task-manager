import {
  chakra,
  Button,
  Heading,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
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
import { KeyboardEvent } from "react";

import { createBoardSchema } from "~/schema/board.schema";
import type { DynamicChakraModalProps } from "~/types";
import { CrossIcon } from "~/assets";

const MODAL_HEADER = {
  CREATE: "Create New Board",
  EDIT: "Edit Board",
};

const SUBMIT_FORM_BUTTON = {
  CREATE: "Create New Board",
  EDIT: "Save Changes",
};

type FormData = z.infer<typeof createBoardSchema>;

const CreateOrEditBoardModal = ({
  isOpen,
  onClose,
  getDisclosureProps,
  action,
}: DynamicChakraModalProps) => {
  const backgroundColor = useColorModeValue("white", "darkerGray");

  const createOrEditBoardModalDisclosureProps = getDisclosureProps();

  const {
    handleSubmit,
    register,
    getValues,
    control,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(createBoardSchema),
    defaultValues: {
      title: "",
      columns: [{ title: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "columns",
  });

  const onSubmit: SubmitHandler<FormData> = (data) => console.log(data);

  const handleAddNewBoardColumn = () => {
    append({ title: "" });
  };

  const handleDeleteBoardColumn = (index: number) => {
    remove(index);
  };

  const handleOnKeyDown = (
    event: KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (
      event.key === "Enter" &&
      getValues(`columns.${index}.title`).length > 0
    ) {
      handleAddNewBoardColumn();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      isCentered
      size="lg"
      {...createOrEditBoardModalDisclosureProps}
    >
      <ModalOverlay />
      <ModalContent backgroundColor={backgroundColor} padding={8} rowGap={6}>
        <ModalHeader padding={0}>
          <Heading as="h4" variant="modal-title">
            {MODAL_HEADER[action]}
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
                Board Name
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
              isInvalid={Boolean(errors.columns)}
            >
              <FormLabel htmlFor="subtask" variant="modal-subtitle">
                Board Columns
              </FormLabel>
              <Flex
                flexDirection="column"
                rowGap={3}
                maxHeight={250}
                overflow="auto"
              >
                {fields.map((boardColumn, index) => {
                  return (
                    <Flex key={boardColumn.id} columnGap={4}>
                      <Input
                        placeholder="e.g Todo"
                        onKeyDown={(event) => handleOnKeyDown(event, index)}
                        {...register(`columns.${index}.title` as const)}
                      />
                      <Center
                        cursor="pointer"
                        onClick={() => handleDeleteBoardColumn(index)}
                      >
                        <CrossIcon />
                      </Center>
                    </Flex>
                  );
                })}
              </Flex>
              <FormErrorMessage>
                {errors.columns && errors.columns.message}
              </FormErrorMessage>
            </FormControl>
            <Button
              width="full"
              variant="secondary"
              onClick={handleAddNewBoardColumn}
            >
              Add New Column
            </Button>
            <Button
              width="full"
              variant="primary"
              isLoading={isSubmitting}
              type="submit"
            >
              {SUBMIT_FORM_BUTTON[action]}
            </Button>
          </chakra.form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default CreateOrEditBoardModal;
