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
  Tooltip,
} from "@chakra-ui/react";
import { useFieldArray, useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type * as z from "zod";
import { type ChangeEvent, type KeyboardEvent, useEffect } from "react";
import { useAtom } from "jotai";

import { selectedBoardIdAtom } from "~/pages/_app";
import { CrossIcon } from "~/assets";
import { api } from "~/utils/api";
import { updateBoardSchema } from "~/schema/board.schema";
import type { DynamicChakraModalProps } from "~/types";
import { DYNAMIC_CHAKRA_MODAL_ACTION } from "~/constants";

const MODAL_HEADER = {
  [DYNAMIC_CHAKRA_MODAL_ACTION.CREATE]: "Create New Board",
  [DYNAMIC_CHAKRA_MODAL_ACTION.EDIT]: "Edit Board",
};

const SUBMIT_FORM_BUTTON = {
  [DYNAMIC_CHAKRA_MODAL_ACTION.CREATE]: "Create New Board",
  [DYNAMIC_CHAKRA_MODAL_ACTION.EDIT]: "Save Changes",
};

type FormData = z.infer<typeof updateBoardSchema>;

const CreateOrEditBoardModal = ({
  isOpen,
  onClose,
  getDisclosureProps,
  action,
  board,
}: DynamicChakraModalProps) => {
  const backgroundColor = useColorModeValue("white", "darkerGray");

  const createOrEditBoardModalDisclosureProps = getDisclosureProps();

  const defaultValues = board
    ? {
        id: board.id,
        title: board.title,
        columns: board.columns.map((column) => ({
          id: column.id,
          title: column.title,
        })),
        columnsIdsToDelete: [],
      }
    : {
        title: "",
        columns: [{ id: "", title: "" }],
      };

  const {
    handleSubmit,
    register,
    reset,
    getValues,
    setValue,
    control,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<FormData>({
    resolver: zodResolver(updateBoardSchema),
    defaultValues,
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "columns",
  });

  const [selectedBoardId, setSelectedBoardId] = useAtom(selectedBoardIdAtom);

  const utils = api.useContext();

  const createBoard = api.board.create.useMutation({
    onSuccess({ id }) {
      void utils.board.getAll.invalidate();
      setSelectedBoardId(id);
      onClose();
    },
  });

  const updateBoard = api.board.update.useMutation({
    onSuccess() {
      void utils.board.getAll.invalidate();
      void utils.board.getOne.invalidate({ id: selectedBoardId });
      onClose();
    },
  });

  const onSubmit: SubmitHandler<FormData> = (data) => {
    // Prevent submit if I am focusing on adding new columns
    if (document.activeElement?.id.startsWith("field")) {
      return;
    }

    data.columns = data.columns.map((column) => ({
      id: column.id,
      title: column.title || "Untitled",
    }));

    switch (action) {
      case DYNAMIC_CHAKRA_MODAL_ACTION.CREATE:
        return createBoard.mutate({
          title: data.title,
          columns: data.columns,
        });

      case DYNAMIC_CHAKRA_MODAL_ACTION.EDIT:
        return updateBoard.mutate({
          id: selectedBoardId,
          title: data.title,
          columns: data.columns,
          columnsIdsToDelete: data.columnsIdsToDelete,
        });

      default:
        const exhaustiveCheck: never = action;
        throw new Error(exhaustiveCheck);
    }
  };

  function handleAddNewBoardColumn() {
    append({ id: "", title: "" });
  }

  function handleDeleteBoardColumn({
    index,
    columnIdToBeDeleted,
  }: {
    index: number;
    columnIdToBeDeleted?: string;
  }) {
    remove(index);
    if (!!columnIdToBeDeleted)
      setValue("columnsIdsToDelete", [
        ...getValues("columnsIdsToDelete"),
        columnIdToBeDeleted,
      ]);
  }

  function handleColumnTitleChange(
    event: ChangeEvent<HTMLInputElement>,
    index: number
  ) {
    if (!!getValues(`columns.${index}.id`) || !event.target.value) return;
    setValue(`columns.${index}.id`, "");
    setValue(`columns.${index}.title`, event.target.value);
  }

  function handleOnKeyDown(
    event: KeyboardEvent<HTMLInputElement>,
    index: number
  ) {
    if (
      event.key === "Enter" &&
      getValues(`columns.${index}.title`).length > 0
    ) {
      handleAddNewBoardColumn();
    }
  }

  useEffect(() => {
    reset();
  }, [isSubmitSuccessful, board, reset]);

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
                        onChange={(event) =>
                          handleColumnTitleChange(event, index)
                        }
                      />
                      <Tooltip
                        aria-label="A tooltip"
                        label={
                          action === DYNAMIC_CHAKRA_MODAL_ACTION.EDIT &&
                          getValues(`columns.${index}.id`)
                            ? "If you delete this column, all related tasks will be deleted"
                            : undefined
                        }
                      >
                        <Center
                          cursor="pointer"
                          onClick={() =>
                            handleDeleteBoardColumn({
                              index,
                              columnIdToBeDeleted: getValues(
                                `columns.${index}.id`
                              ),
                            })
                          }
                        >
                          <CrossIcon />
                        </Center>
                      </Tooltip>
                    </Flex>
                  );
                })}
              </Flex>
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
