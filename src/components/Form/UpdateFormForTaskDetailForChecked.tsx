import React, { useState, ChangeEvent } from "react";
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  IconButton,
  Textarea,
  HStack,
  Radio,
  RadioGroup,
  Select,
  useToast,
  Table,
  Text,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"; // 임포트 위치 최상단
import { apiForCreateTaskUrlForTask } from "../../apis/project_progress_api";
import InputListForTaskUrlsForTask from "../List/InputListForTaskUrlsForTask";
import { AddIcon } from "@chakra-ui/icons";
import InputListForTaskUrlsForTaskDetailListForChecked from "../Input/InputListForTaskUrlsForTaskDetailListForChecked";
import ModalButtonForUpdateTaskStatusForImageSlide from "../modal/ModalButtonForUpdateTaskStatusForImageSlide";

interface IUserNamesForCreate {
  pk: number;
  username: string;
}

interface updateFormForTaskDetailForCheckedProps {
  pk: any;
  writer: string;
  task_manager: string;
  task: string;
  task_description: string;
  importance: number;
  dataForUserNames: IUserNamesForCreate[];
  taskUrls: any;
  current_status: string;
  in_progress: boolean;
  is_testing: boolean;
  task_completed: boolean;
  due_date_formatted: string;
  time_left_to_due_date: string | null;
}

// 1122
const UpdateFormForTaskDetailForChecked: React.FC<
  updateFormForTaskDetailForCheckedProps
> = ({
  pk,
  writer,
  task,
  task_description,
  importance,
  dataForUserNames,
  task_manager,
  taskUrls,
  current_status,
  in_progress,
  is_testing,
  task_completed,
  due_date_formatted,
  time_left_to_due_date,
}) => {
  const toast = useToast();
  const queryClient = useQueryClient();
  const [selectedManager, setSelectedManager] = useState(task_manager);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<{
    pk: number;
    task: string;
    task_manager: string;
    writer: string;
    task_description: string;
    importance: number;
  }>();

  const onSubmit = (data: {
    pk: number;
    task: string;
    writer: string;
    task_description: string;
    importance: number;
  }) => {
    // 폼 데이터 처리 로직 작성
    console.log("selectedManager : ", selectedManager);
    console.log(data);
  };

  const mutationForCreateTaskUrlForTask = useMutation(
    apiForCreateTaskUrlForTask,
    {
      onMutate: () => {
        console.log("mutation starting");
      },
      onSuccess: (data) => {
        console.log("data : ", data);

        toast({
          title: "Task URL 추가",
          description: "Task URL을 추가하였습니다.",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
        queryClient.refetchQueries(["getOneProjectTask"]);
      },
      onError: (error: any) => {
        console.log("error.response : ", error.response);
        console.log("mutation has an error", error.response.data);
      },
    }
  );

  const handleAddTaskUrl = () => {
    mutationForCreateTaskUrlForTask.mutate(pk);
  };

  // 2244
  return (
    <Box as="form" onSubmit={handleSubmit(onSubmit)}>
      <Text bg={"yellow.100"}>Update Form For Task Detail For Checked</Text>
      <Box
        display={"flex"}
        flexDirection={"column"}
        p={2}
        gap={5}
        // border={"5px solid red"}
        height={"727px"}
        overflowY={"scroll"}
      >
        <FormControl display="none">
          <FormLabel>pk</FormLabel>
          <Input
            value={pk}
            {...register("pk", { required: "PK is required" })}
          />
          <FormErrorMessage>{errors.pk?.message}</FormErrorMessage>
        </FormControl>

        <Box display={"flex"} justifyContent={"space-between"} pr={2}>
          <FormControl isInvalid={!!errors.writer}>
            <FormLabel>Instructor</FormLabel>
            <Input
              defaultValue={writer}
              {...register("writer", { required: "Writer is required" })}
            />
            <FormErrorMessage>{errors.writer?.message}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.writer}>
            <FormLabel>Task Manager:{task_manager}</FormLabel>
            <Select
              m={2}
              defaultValue={task_manager}
              onChange={(e) => setSelectedManager(e.target.value)}
            >
              {dataForUserNames &&
                dataForUserNames?.map((user) => (
                  <option key={user.pk} value={user.username}>
                    {user.username}
                  </option>
                ))}
            </Select>
            <FormErrorMessage>{errors.task_manager?.message}</FormErrorMessage>
          </FormControl>
        </Box>

        <FormControl isInvalid={!!errors.task}>
          <FormLabel>Task</FormLabel>
          <Textarea
            defaultValue={task}
            {...register("task", { required: "Task is required" })}
          />
          <FormErrorMessage>{errors.task?.message}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!errors.task_description}>
          <FormLabel>Task Description</FormLabel>
          <Textarea
            defaultValue={task_description}
            {...register("task_description", {
              required: "task_description is required",
            })}
          />
          <FormErrorMessage>
            {errors.task_description?.message}
          </FormErrorMessage>
        </FormControl>

        <FormControl id="task" border="0px solid green" width={"100%"} my={2}>
          <Box
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <FormLabel>Task(main) Urls for checked</FormLabel>
            <Box>
              <IconButton
                icon={<AddIcon />}
                size={"xs"}
                aria-label="Add Task Url"
                colorScheme="teal"
                variant="outline"
                onClick={() => {
                  if (window.confirm("Task URL을 추가하시겠습니까?")) {
                    handleAddTaskUrl();
                  }
                }}
              />
            </Box>
          </Box>

          <InputListForTaskUrlsForTaskDetailListForChecked
            taskUrlsForList={taskUrls}
          />
        </FormControl>

        <FormControl id="importance" isRequired>
          <FormLabel>Importance</FormLabel>
          <RadioGroup defaultValue={importance.toString()}>
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
          <Box display={"flex"} gap={2}>
            <FormLabel>Task Progress : </FormLabel>
            <ModalButtonForUpdateTaskStatusForImageSlide
              modal_text={"update status for task for checked"}
              pk={pk}
              current_status={current_status}
              in_progress={in_progress}
              is_testing={is_testing}
              task_completed={task_completed}
            />
          </Box>
        </FormControl>

        <FormControl>
          <Box display={"flex"} gap={2}>
            {/* <FormLabel> 마감 / 남은 시간 </FormLabel> */}
            <Table size="xs">
              <Thead>
                <Tr>
                  <Th>Due Date</Th>
                  <Th>Time Left</Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td>{due_date_formatted}</Td>
                  <Td>{time_left_to_due_date}</Td>
                </Tr>
              </Tbody>
            </Table>
          </Box>
        </FormControl>

        <Button mt={4} colorScheme="teal" type="submit">
          Update Task Detail
        </Button>
      </Box>
    </Box>
  );
};

export default UpdateFormForTaskDetailForChecked;
