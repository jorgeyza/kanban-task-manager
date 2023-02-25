import {
  Box,
  Checkbox,
  CheckboxGroup,
  Flex,
  Heading,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Select,
  Text,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import { useAtom } from "jotai";

import { VerticalEllipsisIcon } from "~/assets";
import { selectedBoardIdAtom } from "~/pages/_app";
import { api, type RouterOutputs } from "~/utils/api";

import type { ChakraModalProps } from "~/types";

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

  const taskModalDisclosureProps = getDisclosureProps();

  const [selectedBoardId] = useAtom(selectedBoardIdAtom);

  const { data: selectedBoard } = api.board.getOne.useQuery({
    id: selectedBoardId,
  });

  return (
    <Modal isOpen={isOpen} onClose={onClose} {...taskModalDisclosureProps}>
      <ModalOverlay />
      <ModalContent rowGap={6} p={8} bgColor={taskBackgroundColor}>
        <ModalHeader p={0}>
          <Flex justify="space-between">
            <Heading as="h4" variant="modal-title">
              {task?.title}
            </Heading>
            <Box flexShrink={0} cursor="pointer">
              <VerticalEllipsisIcon />
            </Box>
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
  );
};

export default TaskModal;
