import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Input,
  Textarea,
  VStack,
  FormControl,
  FormErrorMessage,
  useToast
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiForCreateSurvey } from "../../apis/survey_api";

interface CreateSurveyFormData {
  title: string;
  description: string;
}

interface ModalButtonForCreateSurveyProps {}

const ModalButtonForCreateSurvey: React.FC<
  ModalButtonForCreateSurveyProps
> = ({}) => {
  const toast = useToast();
  const queryClient = useQueryClient();
  const [isOpen, setIsOpen] = useState(false);

  const onOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);

  const { register, handleSubmit, formState } = useForm<CreateSurveyFormData>();
  const { errors } = formState; // 이 부분에서 errors를 추출합니다.

  const mutationForCreateSurvey = useMutation(apiForCreateSurvey, {
    onMutate: () => {
      console.log("mutation starting");
    },
    onSuccess: (data) => {
      console.log("data : ", data);
      queryClient.refetchQueries(["apiForGetSurveyList"]);

      toast({
        title: "Create Survey Success",
        description: data.message,
        status: "success",
        duration: 1800,
        isClosable: true,
      });
    },
    onError: (error: any) => {
      console.log("error.response : ", error.response);
      console.log("mutation has an error", error.response.data);

      // 에러 메시지를 토스트로 표시
      toast({
        title: "에러 발생",
        description: error.response.data.message, // 에러 메시지를 사용
        status: "error",
        duration: 1800,
        isClosable: true,
      });
    },
  });

  const onSubmit = (data: CreateSurveyFormData) => {
    console.log("data : ", data);
    mutationForCreateSurvey.mutate({
      title: data.title,
      description: data.description,
    });
    onClose();
  };

  return (
    <>
      <Button colorScheme="blue" onClick={onOpen}>
        Create Survey
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} size="6xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create Survey</ModalHeader>
          <ModalCloseButton />
          <form onSubmit={handleSubmit(onSubmit)}>
            <ModalBody>
              <VStack spacing={4}>
                <FormControl isInvalid={!!errors.title}>
                  <Input
                    type="text"
                    name="title"
                    placeholder="Title"
                    {...register("title", { required: "Title is required" })}
                  />
                  <FormErrorMessage>
                    {errors.title && errors.title.message}
                  </FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={!!errors.description}>
                  <Textarea
                    name="description"
                    placeholder="Description"
                    {...register("description", {
                      required: "Description is required",
                    })}
                  />
                  <FormErrorMessage>
                    {errors.description && errors.description.message}
                  </FormErrorMessage>
                </FormControl>
              </VStack>
            </ModalBody>
            <ModalFooter>
              <Button
                colorScheme="blue"
                variant="outline"
                size="md"
                borderColor="blue.100"
                type="submit"
              >
                Create
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalButtonForCreateSurvey;
