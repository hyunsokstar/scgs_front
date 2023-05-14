import {
  Box,
  Button,
  ChakraProvider,
  extendTheme,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Textarea,
  ThemeConfig,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
import React from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiForCreateRelatedShortcut } from "../../apis/api_for_shortcut";
import { formTypeForCreateRelatedShortcut } from "../../types/type_for_shortcut";

const theme = extendTheme({
  config: {
    initialColorMode: "light",
    useSystemColorMode: false,
  },
  components: {
    Modal: {
      baseStyle: {
        dialog: {
          maxW: "6xl",
        },
      },
    },
  },
}) as ThemeConfig;

interface ModalButtonProps {
  buttonText: string;
  shortcutId: number;
}

// interface FormInputs {
//   shortcut_text: string;
//   description: string;
// }

const ModalButtonForCreateRelatedShortcut: React.FC<ModalButtonProps> = ({
  shortcutId,
  buttonText,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { handleSubmit, register, watch } =
    useForm<formTypeForCreateRelatedShortcut>();

  const toast = useToast();
  const queryClient = useQueryClient();

  //   mutationsForCreateRelatedShortcut
  const mutationsForCreateRelatedShortcut = useMutation(
    apiForCreateRelatedShortcut,
    {
      onMutate: () => {
        console.log("mutation starting");
      },
      onSuccess: (data) => {
        console.log("data : ", data);

        toast({
          title: "related shortcut create Success",
          status: "success",
        });
        queryClient.refetchQueries(["getRelatedShortCutList"]);
        onClose();
      },
      onError: (error: any) => {
        console.log("error.response : ", error.response);
        console.log("mutation has an error", error.response.data);
      },
    }
  );

  const handleCreateRelatedShortcut = (
    data: formTypeForCreateRelatedShortcut
  ) => {
    // Logic to handle creating related shortcut
    console.log("Creating related shortcut...");
    console.log("shortcutId: ", shortcutId);

    console.log("Shortcut shortcut_content:", data.shortcut_content);
    console.log("Description:", data.description);

    mutationsForCreateRelatedShortcut.mutate({
      shortcutId,
      shortcut_content: watch("shortcut_content"),
      description: watch("description"),
    });
    // onClose();
  };

  return (
    <ChakraProvider theme={theme}>
      <Box display="flex" justifyContent="flex-end">
        <Button
          variant="outline"
          onClick={onOpen}
          _hover={{ bg: "pastelColor" }}
        >
          {buttonText}
        </Button>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose} size="6xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Box display="flex" justifyContent="space-between">
              Create Related Shortcut
              <ModalCloseButton
                colorScheme="blue"
                _hover={{ bg: "blue.100" }}
              />
            </Box>
          </ModalHeader>
          <ModalBody>
            <form onSubmit={handleSubmit(handleCreateRelatedShortcut)}>
              <Textarea
                placeholder="Enter shortcut content..."
                resize="vertical"
                h="200px"
                bg="pastelColor"
                focusBorderColor="pastelColor"
                {...register("shortcut_content")}
              />
              <Input
                placeholder="Enter description..."
                mt={4}
                bg="pastelColor"
                focusBorderColor="pastelColor"
                {...register("description")}
              />
              <Button type="submit" colorScheme="blue" mt={4}>
                Submit
              </Button>
            </form>
          </ModalBody>
          <ModalFooter>
            <Button
              variant="outline"
              mr={3}
              onClick={onClose}
              _hover={{ bg: "red.100" }}
            >
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </ChakraProvider>
  );
};

export default ModalButtonForCreateRelatedShortcut;
