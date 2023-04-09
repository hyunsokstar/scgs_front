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
import { insertToApiDocuApi } from "../../apis/api_docu_api";
interface IProps {
  refetch_for_api_docu: () => void;
}

const ModalButtonForInsertToApiDocu = ({ refetch_for_api_docu }: IProps) => {
  const toast = useToast();
  const queryClient = useQueryClient();

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

  const mutationForInserApiDocu = useMutation(insertToApiDocuApi, {
    onMutate: () => {
      console.log("mutation starting");
    },
    onSuccess: (data) => {
      console.log("data : ", data);
      refetch_for_api_docu();
      //   queryClient.refetchQueries(["get_api_docu_list"]);
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
    mutationForInserApiDocu.mutate({
      url: data.url,
      description: data.description,
      classification: data.classification,
    });
    // onClose();
    // setSubmitting(false);
  };

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
            Add to API Documentation
            <ModalCloseButton border={"1px solid green"} /> {/* 추가 */}
          </ModalHeader>
          <ModalBody>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Flex flexDirection={"column"} gap={2} width="100%">
                <Box width="100%">
                  <Input
                    type="url"
                    placeholder="Enter URL"
                    borderColor={errors?.url ? errorColor : borderColor}
                    {...register("url", {
                      required: true,
                      pattern: {
                        value: /^(http|https):\/\/[^ "]+$/,
                        message: "Invalid URL",
                      },
                    })}
                  />
                  {errors?.url && (
                    <span style={{ color: errorColor }}>
                      {"url is invalid"}
                    </span>
                  )}
                </Box>

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
