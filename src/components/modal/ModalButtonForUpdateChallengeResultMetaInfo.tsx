import React from "react";
import {
  Button,
  IconButton,
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
  useToast,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { EditIcon } from "@chakra-ui/icons"; // EditIcon을 가져왔습니다.
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiForUpdateChallengeResultMetaInfo } from "../../apis/challenge_api";

type ModalButtonForUpdateChallengeResultMetaInfoProps = {
  challengeResultId: string | number;
  github_url1: string;
  github_url2: string;
  note_url: string;
};

type FormValues = {
  github_url1: string;
  github_url2: string;
  note_url: string;
};

const isValidURL = (url: string) => {
  const urlPattern = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
  return urlPattern.test(url);
};

const ModalButtonForUpdateChallengeResultMetaInfo: React.FC<
  ModalButtonForUpdateChallengeResultMetaInfoProps
> = ({ challengeResultId, github_url1, github_url2, note_url }) => {
  const queryClient = useQueryClient();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { handleSubmit, register } = useForm<FormValues>();

  // mutationForUpdateChallengeResultMetaInfo
  const mutationForUpdateChallengeResultMetaInfo = useMutation(
    apiForUpdateChallengeResultMetaInfo,
    {
      onMutate: () => {
        console.log("mutation starting");
      },
      onSuccess: (data) => {
        console.log("data : ", data);
        queryClient.refetchQueries(["apiForGetDetailForChallenge"]);
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
    }
  );

  const onSubmit = (data: FormValues) => {
    const { github_url1, github_url2, note_url } = data;

    if (!isValidURL(github_url1)) {
      toast({
        title: "오류",
        description: "Github URL 1이 유효한 URL 형식이 아닙니다.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    if (!isValidURL(github_url2)) {
      toast({
        title: "오류",
        description: "Github URL 2가 유효한 URL 형식이 아닙니다.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    if (!isValidURL(note_url)) {
      toast({
        title: "오류",
        description: "Note URL이 유효한 URL 형식이 아닙니다.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    // 유효한 URL 형식이라면 데이터 처리
    console.log("입력값:", data);

    mutationForUpdateChallengeResultMetaInfo.mutate({
      challengeResultId,
      github_url1: data.github_url1,
      github_url2: data.github_url2,
      note_url: data.note_url,
    });
  };

  return (
    <>
      <IconButton
        size="md"
        icon={<EditIcon />}
        colorScheme="orange"
        onClick={onOpen}
        aria-label={"update"}
      />
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>챌린지 결과 메타 정보 수정</ModalHeader>
          <ModalCloseButton />
          <form onSubmit={handleSubmit(onSubmit)}>
            <ModalBody>
              <FormControl>
                <FormLabel>Github URL 1</FormLabel>
                <Input
                  {...register("github_url1")}
                  defaultValue={github_url1}
                />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Github URL 2</FormLabel>
                <Input
                  {...register("github_url2")}
                  defaultValue={github_url2}
                />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Note URL</FormLabel>
                <Input {...register("note_url")} defaultValue={note_url} />
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

export default ModalButtonForUpdateChallengeResultMetaInfo;
