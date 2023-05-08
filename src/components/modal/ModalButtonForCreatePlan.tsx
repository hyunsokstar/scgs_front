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
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";

type FormData = {
  title: string;
  description: string;
  category: "project" | "study" | "event";
};

interface IProps {
  button_text: string;
}

const ModalButtonForCreatePlan: React.FC<IProps> = ({
  button_text,
}: IProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    console.log(data);
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
                <RadioGroup {...register("category")} defaultValue="project">
                  <Stack direction="row">
                    <Radio value="project">프로젝트</Radio>
                    <Radio value="study">공부</Radio>
                    <Radio value="event">이벤트</Radio>
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
