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
              <Input
                {...register("url", { required: true })}
                placeholder="URL"
              />
              {errors.url && <span>URL is required</span>}

              <Textarea
                {...register("description", { required: true })}
                placeholder="Description"
              />
              {errors.description && <span>Description is required</span>}
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
