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
// import { insertToApiDocuApi } from "../../apis/api_docu_api";

const ModalButtonForInsertToApiDocu = () => {
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

  //   const mutationForInserApiDocu = useMutation(insertToApiDocuApi, {
  //     onMutate: () => {
  //       console.log("mutation starting");
  //     },
  //     onSuccess: (data) => {
  //       console.log("data : ", data);

  //       toast({
  //         title: "welcome back!",
  //         status: "success",
  //       });
  //       //   requery getOneProjectTask
  //       queryClient.refetchQueries(["getOneProjectTask"]);
  //       //   onClose();
  //     },
  //     onError: (error: any) => {
  //       console.log("error.response : ", error.response);
  //       //   console.log("mutation has an error", error.response.data);
  //     },
  //   });

  const onSubmit = async (data: any) => {
    // setSubmitting(true);
    console.log(data); // do something with the form data
    // mutationForInserApiDocu.mutate({});
    // onClose();
    // setSubmitting(false);
  };

  return (
    <>
      {/* <Button variant="outline" onClick={onOpen}>Add to API docu</Button> */}
      <Button
        size="md"
        colorScheme="teal"
        variant="outline"
        _hover={{ borderColor: "teal.800", backgroundColor: "teal.50" }}
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
                    {...register("url", { required: true })}
                  />
                  {errors?.url && (
                    <span style={{ color: errorColor }}>
                      This field is required
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
