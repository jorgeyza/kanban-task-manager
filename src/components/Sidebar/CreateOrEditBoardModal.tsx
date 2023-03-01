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
import type * as z from "zod";
import { useEffect, type KeyboardEvent } from "react";
import { useAtom } from "jotai";

import { selectedBoardIdAtom } from "~/pages/_app";
import { CrossIcon } from "~/assets";
import { api } from "~/utils/api";
import { createBoardSchema } from "~/schema/board.schema";
import type { DynamicChakraModalProps } from "~/types";
import { DynamicChakraModalAction } from "~/constants";

const MODAL_HEADER = {
  [DynamicChakraModalAction.CREATE]: "Create New Board",
  [DynamicChakraModalAction.EDIT]: "Edit Board",
};

const SUBMIT_FORM_BUTTON = {
  [DynamicChakraModalAction.CREATE]: "Create New Board",
  [DynamicChakraModalAction.EDIT]: "Save Changes",
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
    reset,
    getValues,
    control,
    formState: { errors, isSubmitting, isSubmitSuccessful },
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

  const [, setSelectedBoardId] = useAtom(selectedBoardIdAtom);

  const utils = api.useContext();

  const createBoard = api.board.create.useMutation({
    onSuccess({ id }) {
      void utils.board.getAll.invalidate();
      setSelectedBoardId(id);
      onClose();
    },
  });

  const onSubmit: SubmitHandler<FormData> = (data) => {
    // Prevent submit if I am focusing on adding new columns
    if (document.activeElement?.id.startsWith("field")) {
      return;
    }

    const columns = data.columns.map((column) =>
      column.title === "" ? { title: "Untitled" } : { title: column.title }
    );
    return createBoard.mutate({
      title: data.title,
      columns,
    });
  };

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

  useEffect(() => {
    reset();
  }, [isSubmitSuccessful, reset]);

  return (
    <Modal
      isCentered
      isOpen={isOpen}
      onClose={onClose}
      size="lg"
      {...createOrEditBoardModalDisclosureProps}
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
            // https://github.com/react-hook-form/react-hook-form/discussions/8020
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
              <Flex direction="column" rowGap={3} overflow="auto" maxH={250}>
                {fields.map((boardColumn, index) => {
                  return (
                    <Flex key={boardColumn.id} columnGap={4}>
                      <Input
                        onKeyDown={(event) => handleOnKeyDown(event, index)}
                        placeholder="e.g Todo"
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
              w="full"
              onClick={handleAddNewBoardColumn}
              variant="secondary"
            >
              Add New Column
            </Button>
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

export default CreateOrEditBoardModal;
