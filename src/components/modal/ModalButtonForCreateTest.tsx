import { useState } from "react";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Box,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Select,
  Switch,
  HStack,
  VStack,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { insertTestForTask } from "../../apis/project_progress_api";
import { FormTypeForCreateTest } from "../../types/project_progress/project_progress_type";

interface IProps {
  buttonText: string;
  taskPk: number | string | undefined;
}

function ModalButtonForCreateTest({ buttonText, taskPk }: IProps) {
  const [isOpen, setIsOpen] = useState(false);
  const queryClient = useQueryClient();
  const toast = useToast();
  // console.log("taskPk : ", taskPk);

  const { loginUser, isLoggedIn } = useSelector(
    (state: RootState) => state.loginInfo
  );
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormTypeForCreateTest>({
    defaultValues: {
      test_passed: false,
    },
  });

  const handleOpen = () => {
    if (!isLoggedIn) {
      alert("테스트는 로그인 유저만 등록 할수 있습니다.");
      return;
    }
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const createTestForTask = useMutation(insertTestForTask, {
    onMutate: () => {
      console.log("mutation starting");
    },
    onSuccess: (data) => {
      console.log("data : ", data);

      toast({
        title: "welcome back!",
        status: "success",
      });
      //   requery getOneProjectTask
      queryClient.refetchQueries(["getOneProjectTask"]);
      setIsOpen(false);
    },
    onError: (error: any) => {
      console.log("error.response : ", error.response);
      //   console.log("mutation has an error", error.response.data);
    },
  });

  const onSubmit = ({
    test_description,
    test_method,
    test_passed,
  }: FormTypeForCreateTest) => {
    // console.log("taskPk : ", taskPk);
    console.log("test_description :: ", test_description);
    console.log("test_method :: ", test_method);
    console.log("test_passed :: ", test_passed);
    createTestForTask.mutate({
      taskPk,
      test_description,
      test_method,
      test_passed,
    });
  };

  return (
    <>
      <Button
        size="sm" // 크기를 중간 크기(md)로 설정
        colorScheme="teal" // 색상을 파스텔톤으로 설정
        _hover={{ color: "red", bg: "teal.500" }} // 호버시 어울리는 색깔로 변경
        onClick={handleOpen}
      >
        {buttonText}
      </Button>{" "}
      <Modal isOpen={isOpen} onClose={handleClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>테스트 추가 for {taskPk}</ModalHeader>
          <ModalBody>
            <form onSubmit={handleSubmit(onSubmit)}>
              <VStack spacing={6}>
                <FormControl isRequired>
                  <FormLabel>Test Description</FormLabel>
                  <Input
                    {...register("test_description", {
                      required: "Test description is required",
                      maxLength: {
                        value: 30,
                        message: "Description must be 30 characters or less",
                      },
                    })}
                  />
                  <FormErrorMessage>
                    {errors.test_description?.message}
                  </FormErrorMessage>
                </FormControl>

                <FormControl isRequired>
                  <FormLabel>Test Method</FormLabel>
                  <Select
                    {...register("test_method", {
                      required: "Test method is required",
                    })}
                    defaultValue="browser"
                  >
                    <option value="browser">Browser</option>
                    <option value="postman">Postman</option>
                    <option value="test_code">Test Code</option>
                  </Select>
                  <FormErrorMessage>
                    {errors.test_method?.message}
                  </FormErrorMessage>
                </FormControl>

                <FormControl>
                  <HStack>
                    <Switch {...register("test_passed")} />
                    <Text>Test Passed</Text>
                  </HStack>
                </FormControl>

                <Button type="submit" colorScheme="blue">
                  Submit
                </Button>
              </VStack>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default ModalButtonForCreateTest;
