import React, { useState } from "react";
import {
  Box,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Input,
  Textarea,
  useDisclosure,
  useToast,
  FormControl, // 추가
  FormLabel, // 추가
  FormErrorMessage, // 추가
} from "@chakra-ui/react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiForCreateChallengeRef } from "../../apis/challenge_api";

interface FormData {
  url: string;
  description: string;
}

interface IProps {
  challengeId: any;
}

const ModalButtonForCreateChallengeRef: React.FC<IProps> = ({
  challengeId,
}) => {
  const toast = useToast();
  const queryClient = useQueryClient();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormData>();

  // mutationForCreateChallengeRef
  const mutationForCreateSuggestionForBoard = useMutation(
    apiForCreateChallengeRef,
    {
      onMutate: () => {
        console.log("mutation starting");
      },
      onSuccess: (data) => {
        console.log("data : ", data);
        queryClient.refetchQueries(["apiForGetChallengeRefsList"]);

        toast({
          title: "challenge register 성공",
          description: data.message,
          status: "success",
          duration: 1800,
          isClosable: true,
        });

        onClose();
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
    }
  );

  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log("challengeId : ", challengeId);
    console.log("Submitted Data:", data);
    mutationForCreateSuggestionForBoard.mutate({
      challengeId,
      urlText: data.url,
      descriptionText: data.description,
    });
  };

  return (
    <>
      <Box display={"flex"} justifyContent={"flex-end"}>
        <Button
          size="sm"
          variant="outline"
          borderColor="blue"
          _hover={{ bgColor: "blue.50" }}
          onClick={onOpen}
        >
          Create Challenge Ref
        </Button>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose} size="5xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>ModalForCreateChallengeRef</ModalHeader>
          <ModalCloseButton />

          <form onSubmit={handleSubmit(onSubmit)}>
            <ModalBody>
              <FormControl mb={4}>
                {" "}
                {/* 추가: FormControl로 감싸고 간격 추가 */}
                <FormLabel>URL</FormLabel>
                <Input
                  {...register("url", { required: true })}
                  placeholder="URL"
                />
                <FormErrorMessage>
                  {errors.url && "URL is required"}
                </FormErrorMessage>
              </FormControl>

              <FormControl mb={4}>
                {" "}
                {/* 추가: FormControl로 감싸고 간격 추가 */}
                <FormLabel>Description</FormLabel>
                <Textarea
                  {...register("description", { required: true })}
                  placeholder="Description"
                />
                <FormErrorMessage>
                  {errors.description && "Description is required"}
                </FormErrorMessage>
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button type="submit" size="sm">
                Submit
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalButtonForCreateChallengeRef;
