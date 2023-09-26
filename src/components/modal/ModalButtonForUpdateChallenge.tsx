import React, { useState } from "react";
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
  Box,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiForUpdateChallenge } from "../../apis/challenge_api";
import Datetime from "react-datetime";

type IProps = {
  challengeId: string | number;
  title: string;
  subtitle: string;
  description: string;
  started_at: string;
  deadline: string;
};

type FormValues = {
  title: string;
  subtitle: string;
  description: string;
};

// 1122
const ModalButtonForUpdateChallenge: React.FC<IProps> = ({
  challengeId,
  title,
  subtitle,
  description,
  started_at,
  deadline,
}) => {
  const queryClient = useQueryClient();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { handleSubmit, register } = useForm<FormValues>(); // 사용할 FormValues 타입을 지정

  const [startedAtForUpdate, setStartedAtForUpdate] = useState<string>();
  const [deadlineForUpdate, setDeadlineForUpdate] = useState<string>();

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
      started_at: startedAtForUpdate,
      deadline: deadlineForUpdate,
    });
  };

  const dateFormat = "YY년 MM월 DD일 HH시 mm분";

  const isValidDate = (current: any) => {
    return current.isAfter(new Date());
  };

  const changeHandlerForStartedAt = (newDate: any) => {
    setStartedAtForUpdate(newDate);
  };

  const changeHandlerForDedaline = (newDate: any) => {
    setDeadlineForUpdate(newDate);
  };

  // 2244
  return (
    <>
      <Button onClick={onOpen} variant={"outline"} size={"sm"}>
        U
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} size={"3xl"}>
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

              <FormControl mt={"3"}>
                <FormLabel>기간</FormLabel>
                <Box display={"flex"} justifyContent={"space-between"}>
                  <Datetime
                    initialValue={started_at}
                    isValidDate={isValidDate}
                    dateFormat={dateFormat}
                    onChange={changeHandlerForStartedAt}
                  />
                  <Datetime
                    initialValue={deadline}
                    isValidDate={isValidDate}
                    dateFormat={dateFormat}
                    onChange={changeHandlerForDedaline}
                  />
                </Box>
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
