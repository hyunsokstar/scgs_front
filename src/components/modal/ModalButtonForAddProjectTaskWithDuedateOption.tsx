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
  Grid,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { IFormTypeForProjectProgress } from "../../types/project_progress/project_progress_type";
import { useMutation, useQuery } from "@tanstack/react-query";
import { insertProjectProgressRow } from "../../apis/project_progress_api";
import { getUserNamesForCreate } from "../../apis/user_api";

interface IProps {
  projectTaskListRefatch: () => void;
  button_text: string;
  due_date_option: "morning_tasks" | "afternoon_tasks" | "night_tasks";
}

interface IUserNamesForCreate {
  pk: number;
  username: string;
}

const options = [
  { label: "오늘 오전", value: "this-morning" },
  { label: "오늘 오후", value: "this-evening" },
  { label: "오늘 밤", value: "this-night" },
  { label: "내일", value: "tomorrow" },
  { label: "모레", value: "day-after-tomorrow" },
  { label: "이번주", value: "this-week" },
  { label: "이번달", value: "this-month" },
];

const buttonColors = {
  morning_tasks: "black", // or "blue.200"
  afternoon_tasks: "black", // or "yellow.200"
  night_tasks: "white", // or "purple.300"
};

const hoverColors = {
  morning_tasks: "red", // or "blue.600"
  afternoon_tasks: "skyblue", // or "yellow.600"
  night_tasks: "yellow.200", // or "purple.900"
};

const hoverTextColors = {
    morning_tasks: "white", // or "blue.600"
    afternoon_tasks: "yellow", // or "yellow.600"
    night_tasks: "black", // or "purple.900"
  };

const dueDateOptionsForButton = {
    morning_tasks: options[0].value, // or "blue.600"
    afternoon_tasks: options[1].value, // or "yellow.600"
    night_tasks: options[2].value, // or "purple.900"
  };

const ModalButtonForAddProjectTaskWithDuedateOption: FC<IProps> = ({
  projectTaskListRefatch,
  button_text = "add task",
  due_date_option,
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
    due_date,
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
      due_date,
    });
  };

  return (
    <Box>
      <Button
        as="button"
        size="md"
        bg="transparent"
        border="2px"
        borderColor={buttonColors[due_date_option]}
        color={buttonColors[due_date_option]}
        borderRadius="md"
        px={4}
        py={2}
        _hover={{ bg: hoverColors[due_date_option], color: hoverTextColors[due_date_option] }}
        onClick={onOpen}
      >
        Create
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} size={"6xl"}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Task 추가 #xptmzmcnrk </ModalHeader>
          <ModalBody>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Grid templateColumns="repeat(2, 1fr)" gap={6}>
                <FormControl>
                  <FormLabel>Task</FormLabel>
                  <Input
                    _hover={{ borderColor: "green.500" }}
                    placeholder="Task"
                    {...register("task", { required: true })}
                  />
                  {errors.task && <Box color="red">Task is required</Box>}
                </FormControl>

                <FormControl>
                  <FormLabel>지시자</FormLabel>
                  <Input
                    size="sm"
                    _hover={{ borderColor: "green.500" }}
                    placeholder="Writer"
                    defaultValue={"hyun"}
                    {...register("writer", { required: true })}
                  />
                  {errors.writer && <Box color="red">Writer is required</Box>}
                </FormControl>

                <FormControl>
                  <FormLabel>담당자</FormLabel>
                  <Select
                    _hover={{ borderColor: "green.500" }}
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
                  <RadioGroup name="rating" defaultValue={"1"}>
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
                  _hover={{ borderColor: "green.500" }}
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
                  <FormLabel>마감 기한</FormLabel>
                  <Select
                    _hover={{ borderColor: "green.500" }}
                    placeholder="옵션을 선택하세요"
                    defaultValue={dueDateOptionsForButton[due_date_option]}
                    {...register("due_date")}
                  >
                    {options.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </Select>
                </FormControl>

                <Button
                  type="submit"
                  _hover={{ transform: "scale(1.02)" }}
                  _active={{ transform: "scale(0.98)" }}
                  transition="0.2s"
                >
                  Submit
                </Button>
              </Grid>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default ModalButtonForAddProjectTaskWithDuedateOption;
