import { FC } from "react";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  useDisclosure,
  VStack,
  Box,
  Input,
  Checkbox,
  FormControl,
  FormLabel,
  RadioGroup,
  Radio,
  HStack,
  useToast,
  Select,
  FormHelperText,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { IFormTypeForProjectProgress } from "../../types/project_progress/project_progress_type";
import { useMutation, useQuery } from "@tanstack/react-query";
import { insertProjectProgressRow } from "../../apis/project_progress_api";
import { getUserNamesForCreate } from "../../apis/user_api";

interface IProps {
  projectTaskListRefatch: () => void;
  button_text: string;
}

interface IUserNamesForCreate {
  pk: number;
  username: string;
}

const ModalButtonForAddProjectTask: FC<IProps> = ({
  projectTaskListRefatch,
  button_text = "add task",
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm<IFormTypeForProjectProgress>();

  // user data 가져 오기
  const {
    isLoading,
    data: userNamesData,
    error,
  } = useQuery<IUserNamesForCreate[]>(["users_list2"], getUserNamesForCreate);

  // console.log("user names  :: ", userNamesData);

  const toast = useToast();

  function cancelButtonHandler() {
    onClose();
  }

  const createMutationForProjectProgress = useMutation(
    insertProjectProgressRow,
    {
      onMutate: () => {
        console.log("mutation starting");
      },
      onSuccess: (data) => {
        // console.log("data : ", data);
        reset();

        toast({
          title: "welcome back!",
          status: "success",
        });
        projectTaskListRefatch();
        onClose();
      },
      onError: (error: any) => {
        console.log("error.response : ", error.response);
        console.log("mutation has an error", error.response.data);
      },
    }
  );

  const onSubmit = ({
    task,
    writer,
    importance,
    task_completed,
    password,
    task_manager,
    task_classification,
  }: IFormTypeForProjectProgress) => {
    console.log("task create 체크 :: ", task_manager);

    createMutationForProjectProgress.mutate({
      task,
      writer,
      importance,
      task_completed,
      password,
      task_manager,
      task_classification,
    });
  };

  return (
    <Box>
      <Button
        onClick={onOpen}
        size={"xs"}
        colorScheme="green"
        _hover={{ bg: "green.700" }}
        _active={{ bg: "gree.800" }}
        _focus={{ boxShadow: "none" }}
        fontSize={20}
        py={5}
        px={2}
      >
        {button_text}
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Task 추가 #xptmzmcnrk </ModalHeader>
          <ModalBody>
            <form onSubmit={handleSubmit(onSubmit)}>
              <VStack spacing={1} align="stretch">
                <FormControl>
                  <FormLabel>Task</FormLabel>
                  <Input
                    placeholder="Task"
                    {...register("task", { required: true })}
                  />
                  {errors.task && <Box color="red">Task is required</Box>}
                </FormControl>

                <FormControl>
                  <FormLabel>지시자</FormLabel>
                  <Input
                    size="sm"
                    placeholder="Writer"
                    {...register("writer", { required: true })}
                  />
                  {errors.writer && <Box color="red">Writer is required</Box>}
                </FormControl>

                <FormControl>
                  <FormLabel>담당자</FormLabel>
                  <Select
                    {...register("task_manager", { required: true })}
                    placeholder="Choose a task_manager"
                  >
                    {userNamesData?.map((user) => (
                      <option key={user.pk} value={user.pk}>
                        {user.username}
                      </option>
                    ))}
                  </Select>
                  <FormHelperText>담당자 선택</FormHelperText>
                </FormControl>

                <FormControl>
                  <FormLabel>Importance</FormLabel>
                  <RadioGroup name="rating">
                    <HStack spacing="24px">
                      <Radio value="1" {...register("importance")} size="lg">
                        1
                      </Radio>
                      <Radio value="2" {...register("importance")} size="lg">
                        2
                      </Radio>
                      <Radio value="3" {...register("importance")} size="lg">
                        3
                      </Radio>
                      <Radio value="4" {...register("importance")} size="lg">
                        4
                      </Radio>
                      <Radio value="5" {...register("importance")} size="lg">
                        5
                      </Radio>
                    </HStack>
                  </RadioGroup>
                </FormControl>

                <FormControl>
                  <FormLabel>task_completed</FormLabel>
                  <Checkbox {...register("task_completed")} />
                </FormControl>

                <Select
                  placeholder="Select task classification"
                  defaultValue="crud"
                  {...register("task_classification", { required: true })}
                >
                  <option value="crud">CRUD 작업</option>
                  <option value="new-future">새로운 기능 개발</option>
                  <option value="trouble-shooting">문제 해결 작업</option>
                  <option value="ui-task">UI 작업</option>
                  <option value="refactoring">리팩토링 작업</option>
                  <option value="optimization">최적화 작업</option>
                  <option value="boiler-plate">보일러 플레이트 만들기</option>
                  <option value="test-code">테스트 코드 작성</option>
                </Select>

                <FormControl>
                  <FormLabel>Password</FormLabel>
                  <Input
                    size="sm"
                    type="text"
                    placeholder="Password"
                    {...register("password", { required: true })}
                  />
                  {errors.password && (
                    <Box color="red">Password is required</Box>
                  )}
                </FormControl>

                <Button type="submit">Submit</Button>
              </VStack>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default ModalButtonForAddProjectTask;
