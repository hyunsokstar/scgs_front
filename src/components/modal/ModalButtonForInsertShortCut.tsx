import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Textarea,
  useDisclosure,
  useColorModeValue,
  ModalCloseButton, // 추가
  useToast,
  Select,
  Box,
  VStack,
  Flex,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { AddIcon } from "@chakra-ui/icons";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import TagInput from "../Input/TagInput";
import { apiForinsertToShortcut } from "../../apis/api_for_shortcut";

// interface IProps {
// }

// 1122
const ModalButtonForInsertToApiDocu = () => {
  const toast = useToast();
  const queryClient = useQueryClient();
  const [selectedTags, setSelectedTags] = useState<string[]>();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [submitting, setSubmitting] = useState(false);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const borderColor = useColorModeValue("gray.400", "gray.500");
  const errorColor = useColorModeValue("red.500", "red.200");
  const colorScheme = useColorModeValue("blue", "purple");

  const mutationForInserShortcut = useMutation(apiForinsertToShortcut, {
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

  const onSubmit = (data: any) => {
    mutationForInserShortcut.mutate({
      description: data.description,
      classification: data.classification,
      tags: selectedTags ? selectedTags : [],
    });
    // onClose();
    // setSubmitting(false);
  };

  const handleSelectedChange = (newSelected: string[]) => {
    if (newSelected.length > 3) {
      // alert("3개 이상은 안되요")
      return;
    } else {
      setSelectedTags(newSelected);
    }
  };

  // 2244
  return (
    <>
      {/* <Button variant="outline" onClick={onOpen}>Add to API docu</Button> */}
      <Button
        size="sm"
        colorScheme="teal"
        variant="outline"
        _hover={{ borderColor: "teal.800", backgroundColor: "teal.50" }}
        m={1}
        onClick={onOpen}
      >
        <AddIcon />
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} size={"3xl"}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            Modal For Insert Shortcut
            <ModalCloseButton border={"1px solid green"} /> {/* 추가 */}
          </ModalHeader>
          <ModalBody>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Flex flexDirection={"column"} gap={2} width="100%">

                <Box width="100%">
                  <Textarea
                    placeholder="Enter description"
                    borderColor={errors?.description ? errorColor : borderColor}
                    {...register("description", { required: true })}
                  />
                  {errors?.description && (
                    <span style={{ color: errorColor }}>
                      This field is required
                    </span>
                  )}
                </Box>

                <Box width="50%">
                  <Select
                    variant="outline"
                    borderColor={borderColor}
                    colorScheme={colorScheme}
                    {...register("classification")}
                  >
                    <option value="front">Frontend</option>
                    <option value="back">Backend</option>
                  </Select>
                </Box>
                <TagInput
                  selected={selectedTags ? selectedTags : []}
                  setSelected={handleSelectedChange}
                />
              </Flex>
            </form>
          </ModalBody>

          <ModalFooter>
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button
              variant="outline"
              colorScheme="blue"
              type="submit"
              isLoading={submitting}
              onClick={handleSubmit(onSubmit)}
            >
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalButtonForInsertToApiDocu;
