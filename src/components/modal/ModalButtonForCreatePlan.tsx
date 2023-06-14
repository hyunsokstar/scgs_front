import React from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Radio,
  RadioGroup,
  Stack,
  Textarea,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiForCreatePlan } from "../../apis/api_for_long_term_plan";
import { formTypeForCreatePlan } from "../../types/type_for_plan_maker";


interface IProps {
  button_text: string;
}

const ModalButtonForCreatePlan: React.FC<IProps> = ({
  button_text,
}: IProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<formTypeForCreatePlan>();

  const mutationForCreatePlan = useMutation(apiForCreatePlan, {
    onMutate: () => {
      console.log("mutation starting");
    },
    onSuccess: (data) => {
      console.log("data : ", data);

      toast({
        title: "welcome back!",
        status: "success",
      });
      queryClient.refetchQueries(["get_plan_list"]);
      reset();
      onClose();
    },
    onError: (error: any) => {
      console.log("error.response : ", error.response);
      console.log("mutation has an error", error.response.data);
    },
  });

  const onSubmit = (data: formTypeForCreatePlan) => {
    console.log(data);

    console.log("data for : formTypeForCreatePlan ", data);

    mutationForCreatePlan.mutate(data);
    onClose();
  };

  return (
    <Box>
      <Button onClick={onOpen}>{button_text}</Button>
      <Modal isOpen={isOpen} onClose={onClose} size={"5xl"}>
        <ModalOverlay />
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalContent>
            <ModalHeader borderBottom="1px solid" borderColor="gray.200">
              중장기 계획 추가
            </ModalHeader>
            <ModalCloseButton
              size="lg"
              colorScheme="pink"
              _hover={{ bg: "pink.50" }}
            />
            <ModalBody>
              <Stack spacing={4}>
                <FormControl isRequired>
                  <FormLabel>제목</FormLabel>
                  <Input {...register("title")} />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>설명</FormLabel>
                  <Textarea {...register("description")} />
                </FormControl>
                    <RadioGroup
                    defaultValue="project"
                      name="category"
                    >
                    <Stack direction="row">
                        <Radio value="project" {...register("category")}>프로젝트</Radio>
                        <Radio value="study" {...register("category")}>공부</Radio>
                        <Radio value="event" {...register("category")}>이벤트</Radio>
                    </Stack>
                    </RadioGroup>
              </Stack>
            </ModalBody>
            <ModalFooter borderTop="1px solid" borderColor="gray.200">
              <Button
                type="submit"
                colorScheme="teal"
                mr={3}
                _hover={{ bg: "teal.200" }}
              >
                저장
              </Button>
              <Button
                variant="outline"
                onClick={onClose}
                _hover={{ bg: "pink.50" }}
              >
                취소
              </Button>
            </ModalFooter>
          </ModalContent>
        </form>
      </Modal>
    </Box>
  );
};

export default ModalButtonForCreatePlan;
