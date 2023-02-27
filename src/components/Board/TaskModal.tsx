import {
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
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { useAtom } from "jotai";

import { VerticalEllipsisIcon } from "~/assets";
import { selectedBoardIdAtom } from "~/pages/_app";
import { api, type RouterOutputs } from "~/utils/api";

import type { ChakraModalProps, HTMLProps } from "~/types";
import CreateOrEditTaskModal from "~/components/Header/CreateOrEditTaskModal";

type Task = RouterOutputs["task"]["getAllByColumnId"][0];
type Subtask = RouterOutputs["subtask"]["getAllByTaskId"][0];

interface Props extends ChakraModalProps {
  task: Task;
  subtasks: Subtask[];
}

const TaskModal = ({
  isOpen,
  onClose,
  getDisclosureProps,
  task,
  subtasks,
}: Props) => {
  const taskBackgroundColor = useColorModeValue("white", "darkerGray");
  const checkboxBackgroundColor = useColorModeValue(
    "lighterGray",
    "lightBlack"
  );

  const {
    isOpen: createOrEditTaskModalIsOpen,
    onClose: createOrEditTaskModalOnClose,
    getButtonProps: createOrEditTaskModalGetButtonProps,
    getDisclosureProps: createOrEditTaskModalGetDisclosureProps,
  } = useDisclosure();
  const createOrEditTaskModalButtonProps = createOrEditTaskModalGetButtonProps({
    onClick: handleEditTask,
  }) as HTMLProps;

  const taskModalDisclosureProps = getDisclosureProps();

  const [selectedBoardId] = useAtom(selectedBoardIdAtom);

  const utils = api.useContext();

  const { data: selectedBoard } = api.board.getOne.useQuery({
    id: selectedBoardId,
  });

  const deleteTask = api.task.delete.useMutation({
    onSuccess() {
      void utils.task.getAllByColumnId.invalidate({ columnId: task.columnId });
      onClose();
    },
  });

  const handleDeleteTask = () => {
    deleteTask.mutate({ id: task.id });
  };

  function handleEditTask() {
    onClose();
  }

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        {...taskModalDisclosureProps}
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
          <ModalBody flexDir="column" rowGap={6} display="flex" p={0}>
            <Text as="p" variant="basic-text">
              {task?.description}
            </Text>
            <Flex direction="column" rowGap={4}>
              <Heading as="h5" variant="modal-subtitle">
                {`Subtasks (${
                  subtasks.filter((subtask) => subtask.isDone).length
                } of ${subtasks.length})`}
              </Heading>
              <CheckboxGroup colorScheme="customPurple">
                <VStack alignItems="start" spacing={2}>
                  {subtasks.map((subtask) => (
                    <Checkbox
                      key={subtask.id}
                      w="full"
                      p={3}
                      borderRadius={4}
                      bgColor={checkboxBackgroundColor}
                      value="naruto"
                    >
                      <Text variant="modal-checkbox">{subtask.title}</Text>
                    </Checkbox>
                  ))}
                </VStack>
              </CheckboxGroup>
            </Flex>
            <Flex direction="column" rowGap={2}>
              <Heading as="h5" variant="modal-subtitle">
                Status
              </Heading>
              <Select
                fontSize="13px"
                borderColor="lightGrayAlpha25"
                iconColor="customPurple.500"
                placeholder="Select option"
              >
                {selectedBoard?.columns.map((column) => {
                  return (
                    <option key={column.id} value={column.title}>
                      {column.title}
                    </option>
                  );
                })}
              </Select>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
      <CreateOrEditTaskModal
        isOpen={createOrEditTaskModalIsOpen}
        onClose={createOrEditTaskModalOnClose}
        getDisclosureProps={createOrEditTaskModalGetDisclosureProps}
        action="EDIT"
      />
    </>
  );
};

export default TaskModal;
