import { useState } from "react";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  FormLabel,
  Input,
  Select,
  VStack,
  HStack,
  IconButton,
  Box,
  useToast,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { EditIcon } from "@chakra-ui/icons";
import TagInput from "../Input/TagInput";
import {
  Shortcut,
  TypeForUpdateFormForShortcut,
} from "../../types/type_for_shortcut";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiForUpdateShortcut2 } from "../../apis/api_for_shortcut2";

type FormData = {
  shortcut: string;
  classification: string;
  tags: string;
};

interface IProps {
  shortcutObj: Shortcut;
}

// 1122
const ModalButtonForUpdateShortCut2 = ({ shortcutObj }: IProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const toast = useToast();
  const queryClient = useQueryClient();

  const { register, handleSubmit, formState } =
    useForm<TypeForUpdateFormForShortcut>({
      mode: "onSubmit",
      reValidateMode: "onChange",
      // defaultValues: {
      //   classification: "",
      // },
    });
  const [selectedTags, setSelectedTags] = useState<string[]>();

  let tagNames: string[] = []
  if (shortcutObj.tags) {
    tagNames = shortcutObj.tags.map((tag) => {
      return tag.name;
    });
  }

  const { errors } = formState;

  const onOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);

  const mutationForUpdateShortcut = useMutation(apiForUpdateShortcut2, {
    onMutate: () => {
      console.log("mutation starting");
    },
    onSuccess: (data) => {
      console.log("data : ", data);
      queryClient.refetchQueries(["get_shortcut_list"]);

      toast({
        title: "welcome back!",
        status: "success",
      });
      onClose();
    },
    onError: (error: any) => {
      console.log("error.message : ", error.message);

      toast({
        title: "Error!",
        description: error.message || "An error occurred.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    },
  });

  const onSubmit = (data: TypeForUpdateFormForShortcut) => {
    console.log(data);
    mutationForUpdateShortcut.mutate({
      shortcutId: shortcutObj.id,
      shortcut: data.shortcut,
      description: data.description,
      classification: data.classification,
      tags: selectedTags ? selectedTags : [],
    });
    onClose();
  };

  const handleSelectedChange = (newSelected: string[]) => {
    setSelectedTags(newSelected);
  };

  // 2244
  return (
    <Box>
      <IconButton
        aria-label="수정"
        size="xs"
        variant="outline"
        colorScheme="green"
        icon={<EditIcon />}
        _hover={{ bg: "green.500", color: "white" }}
        // mr={1}
        onClick={onOpen}
      />

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update Shorcut</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing="4">
              <FormControl isInvalid={!!errors.shortcut}>
                <FormLabel htmlFor="shortcut">Shortcut</FormLabel>
                <Input
                  defaultValue={shortcutObj.shortcut}
                  id="shortcut"
                  placeholder="Shortcut"
                  {...register("shortcut", { required: true })}
                />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="classification">Classification</FormLabel>
                <Select
                  defaultValue={shortcutObj.classification}
                  placeholder="Classification"
                  {...register("classification")}
                >
                  <option value="front">Front</option>
                  <option value="back">Back</option>
                </Select>
              </FormControl>
              <FormControl isInvalid={!!errors.tags}>
                <FormLabel htmlFor="tags">Tags</FormLabel>

                <TagInput
                  selected={selectedTags?.length ? selectedTags : tagNames}
                  setSelected={handleSelectedChange}
                />
              </FormControl>
            </VStack>
          </ModalBody>
          <HStack justifyContent="flex-end" p="4">
            <Button onClick={onClose}>Cancel</Button>
            <Button
              colorScheme="blue"
              onClick={handleSubmit(onSubmit)}
              isLoading={formState.isSubmitting}
            >
              Submit
            </Button>
          </HStack>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default ModalButtonForUpdateShortCut2;
