import {
  chakra,
  Box,
  Button,
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
  Textarea,
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  useColorModeValue,
  useDisclosure,
  Center,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useAtom } from "jotai";

import { Logo, VerticalEllipsisIconSVG } from "@/assets";
import { drawerAtom } from "@/pages/_app";

const Header = () => {
  const borderColor = useColorModeValue("lightGray", "lightGrayAlpha25");
  const backgroundColor = useColorModeValue("white", "darkerGray");
  const headingColor = useColorModeValue("black", "white");
  const logoColor = useColorModeValue("black", "white");
  const logoBorderColor = useColorModeValue("lightGray", "lightGrayAlpha25");

  const [isDrawerOpen] = useAtom(drawerAtom);

  const { isOpen, onOpen, onClose, getButtonProps, getDisclosureProps } =
    useDisclosure();
  const addNewTaskModalButtonProps = getButtonProps();
  const addNewTaskModalDisclosureProps = getDisclosureProps();

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();

  function onSubmit(values) {
    return new Promise((resolve) => {
      setTimeout(() => {
        alert(JSON.stringify(values, null, 2));
        resolve();
      }, 3000);
    });
  }

  return (
    <>
      <Flex
        as="header"
        backgroundColor={backgroundColor}
        justifyContent="space-between"
        height="97px"
        alignItems="center"
        paddingX={5}
        borderBottomColor={borderColor}
        borderBottomWidth="thin"
      >
        <Flex height="100%" columnGap={6} alignItems="center">
          {!isDrawerOpen && (
            <Center
              paddingRight={6}
              height="100%"
              paddingLeft={1}
              borderRight="1px solid"
              borderColor={logoBorderColor}
              color={logoColor}
            >
              <Logo />
            </Center>
          )}
          <Heading as="h1" size="md" color={headingColor}>
            Platform Launch
          </Heading>
        </Flex>
        <Flex alignItems="center" columnGap={6}>
          <Button
            variant="primary"
            size="lg"
            backgroundColor="customPurple.500"
            onClick={onOpen}
            {...addNewTaskModalButtonProps}
          >
            + Add New Task
          </Button>
          <Menu>
            <MenuButton as={Box} cursor="pointer">
              <VerticalEllipsisIconSVG />
            </MenuButton>
            <MenuList>
              <MenuItem>Edit Board</MenuItem>
              <MenuItem color="customRed">Delete Board</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </Flex>
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
          <ModalBody
            display="flex"
            flexDirection="column"
            rowGap={6}
            padding={0}
          >
            <chakra.form
              display="flex"
              flexDirection="column"
              rowGap={6}
              onSubmit={handleSubmit(onSubmit)}
            >
              <FormControl
                borderColor="lightGrayAlpha25"
                isInvalid={errors.title}
              >
                <FormLabel htmlFor="title" variant="modal-subtitle">
                  Title
                </FormLabel>
                <Input
                  id="title"
                  placeholder="e.g Take coffee break"
                  {...register("title", {
                    required: "This is required",
                    minLength: {
                      value: 4,
                      message: "Minimum length should be 4",
                    },
                  })}
                />
                <FormErrorMessage>
                  {errors.title && errors.title.message}
                </FormErrorMessage>
              </FormControl>
              <FormControl
                borderColor="lightGrayAlpha25"
                isInvalid={errors.description}
              >
                <FormLabel htmlFor="description" variant="modal-subtitle">
                  Description
                </FormLabel>
                <Textarea
                  id="description"
                  placeholder="It's always good to take a break. This  15 minute break will  recharge the batteries  a little."
                  {...register("description", {
                    required: "This is required",
                    minLength: {
                      value: 4,
                      message: "Minimum length should be 4",
                    },
                  })}
                />
                <FormErrorMessage>
                  {errors.description && errors.description.message}
                </FormErrorMessage>
              </FormControl>
              <FormControl
                borderColor="lightGrayAlpha25"
                isInvalid={errors.subtask}
              >
                <FormLabel htmlFor="subtask" variant="modal-subtitle">
                  Subtask
                </FormLabel>
                <Input
                  id="subtask"
                  placeholder="e.g Make coffee"
                  {...register("subtask", {
                    required: "This is required",
                    minLength: {
                      value: 4,
                      message: "Minimum length should be 4",
                    },
                  })}
                />
                <FormErrorMessage>
                  {errors.subtask && errors.subtask.message}
                </FormErrorMessage>
              </FormControl>
              <Button
                width="full"
                variant="secondary"
                isLoading={isSubmitting}
                type="submit"
              >
                Add New Subtask
              </Button>
              <FormControl isInvalid={errors.subtask}>
                <FormLabel htmlFor="subtask" variant="modal-subtitle">
                  Subtask
                </FormLabel>
                <Select
                  placeholder="Select option"
                  iconColor="customPurple.500"
                  borderColor="lightGrayAlpha25"
                  fontSize="13px"
                >
                  <option value="option1">Option 1</option>
                  <option value="option2">Option 2</option>
                  <option value="option3">Option 3</option>
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
    </>
  );
};

export default Header;
