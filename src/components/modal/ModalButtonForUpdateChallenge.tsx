import React from "react";
import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiForUpdateChallenge } from "../../apis/challenge_api";

type ModalButtonForUpdateChallengeProps = {
  challengeId: string | number;
  title: string;
  subtitle: string;
  description: string;
};

type FormValues = {
  title: string;
  subtitle: string;
  description: string;
};

const ModalButtonForUpdateChallenge: React.FC<
  ModalButtonForUpdateChallengeProps
> = ({ challengeId, title, subtitle, description }) => {
  const queryClient = useQueryClient();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { handleSubmit, register } = useForm<FormValues>(); // 사용할 FormValues 타입을 지정

  // mutationForUpdateChallengeResultMetaInfo
  const mutationForUpdateChallenge = useMutation(apiForUpdateChallenge, {
    onMutate: () => {
      console.log("mutation starting");
    },
    onSuccess: (data) => {
      console.log("data : ", data);
      queryClient.refetchQueries(["apiForGetChallengeList"]);
      toast({
        title: "Update successful for suggestion content!",
        status: "success",
      });
      onClose();
      // 추가: 업데이트 후 실행할 콜백 함수 호출
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

  const onSubmit = (data: FormValues) => {
    console.log("입력값:", data);
    mutationForUpdateChallenge.mutate({
      challengeId: challengeId,
      title: data.title,
      subtitle: data.subtitle,
      description: data.description,
    });
  };

  return (
    <>
      <Button onClick={onOpen}>모달 열기 for {challengeId}</Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>챌린지 수정</ModalHeader>
          <ModalCloseButton />
          <form onSubmit={handleSubmit(onSubmit)}>
            <ModalBody>
              <FormControl>
                <FormLabel>제목</FormLabel>
                <Input {...register("title")} defaultValue={title} />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>부제목</FormLabel>
                <Input {...register("subtitle")} defaultValue={subtitle} />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>설명</FormLabel>
                <Textarea
                  {...register("description")}
                  defaultValue={description}
                />
              </FormControl>
            </ModalBody>
            <ModalFooter>
              <Button type="submit" colorScheme="blue">
                저장
              </Button>
              <Button onClick={onClose} ml={3}>
                닫기
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalButtonForUpdateChallenge;
