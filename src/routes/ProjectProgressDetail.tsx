import React, { ReactElement, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"; // 임포트 위치 최상단
import { useNavigate, useParams } from "react-router-dom";
import { getOneProjectTask } from "../apis/user_api";
import { IOneTaskForProjectTaskType } from "../types/project_progress/project_progress_type";

import {
  Box,
  FormControl,
  FormLabel,
  RadioGroup,
  Radio,
  Button,
  Input,
  HStack,
  VStack,
  Flex,
  Text,
  useToast,
  Checkbox,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { updateProjectApiByPk } from "../apis/project_progress_api";

interface Props {}

function ProjectProgressDetail({}: Props): ReactElement {
  const { taskPk } = useParams();
  const toast = useToast();

  const { data: taskData, isLoading: isLoadingForTaskData } =
    useQuery<IOneTaskForProjectTaskType>(
      ["getOneProjectTask", taskPk, "ProjectProgressDetail"],
      getOneProjectTask
    );
  console.log("taskData : ", taskData);

  const [submitting, setSubmitting] = useState(false);
  const { register, handleSubmit, watch, reset } = useForm();

  const [started_at, set_started_at] = useState<Date>();
  const [due_date, set_due_date] = useState<Date>();

  // updateProjectApiByPk, updateProjectApiByPk
  const updateMutation = useMutation(updateProjectApiByPk, {
    onMutate: () => {
      console.log("mutation starting");
    },
    onSuccess: (data) => {
      console.log("success : ", data);
      toast({
          title: "project task update success",
          status: "success",
      });
      // navigate("/estimates");
    },
    onError: (error) => {
      console.log("mutation has an error");
    },
  });

  const onSubmit = ({ writer, task, importance, task_completed }: any) => {
    setSubmitting(true);
    console.log("watch : ", watch(), started_at, due_date);

    updateMutation.mutate({
      taskPk: taskPk,
      writer,
      task,
      importance,
      task_completed,
      started_at: started_at,
      due_date: due_date,
    });

    setSubmitting(false);
  };

  if (isLoadingForTaskData) {
    return <Box>Loading</Box>;
  }

  if (!taskData) {
    return <Box>Loading..</Box>;
  } else {
    return (
      <div>
        <Box display="flex">
          <Box flex="1" bg="#E8D1CF">
            1구역
          </Box>
          <Box flex="4" bg="#B2D8D8">
            <form onSubmit={handleSubmit(onSubmit)}>
              <VStack gap={2} w={"80%"}>
                <FormControl id="writer" isRequired>
                  <FormLabel>Writer</FormLabel>
                  <Input
                    defaultValue={taskData.writer}
                    {...register("writer")}
                    size="md"
                  />
                </FormControl>

                <FormControl id="task" isRequired>
                  <FormLabel>Task</FormLabel>
                  <Input
                    {...register("task")}
                    size="md"
                    defaultValue={taskData.task}
                  />
                </FormControl>

                <FormControl id="importance" isRequired>
                  <FormLabel>Importance</FormLabel>
                  <RadioGroup defaultValue={taskData.importance.toString()}>
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

                <FormControl id="task_completed" >
                  <FormLabel>Task Completed</FormLabel>
                  <Checkbox
                    defaultChecked={taskData.task_completed}
                    {...register("task_completed")}
                  />
                </FormControl>

                <Box display={"flex"} justifyContent={"center"} gap={5}>
                  <VStack>
                    <Text>시작</Text>
                    <Calendar
                      defaultValue={new Date(taskData.started_at)}
                      onChange={set_started_at}
                      // value={value}
                      prev2Label={null} // 년도 앞으로 버튼 없애기
                      next2Label={null} // 년도 뒤로 버튼 없애기
                      minDetail="month" // 년도 선택 금지
                      minDate={new Date(taskData.started_at)} // 현시점 이후 선택 가능 하도록 하기
                      maxDate={
                        new Date(Date.now() + 60 * 60 * 24 * 7 * 4 * 6 * 1000)
                      } // 선택 가능 범위 제한 하기 (밀리 세컨즈 단위로 계산, 현시점에서 6개월 정도)
                      selectRange={false} // 하루 선택 or 범위 선택
                    />
                  </VStack>

                  <VStack>
                    <Text>마감 날짜</Text>
                    <Calendar
                      defaultValue={new Date(taskData.due_date)}
                      onChange={set_due_date}
                      // value={value}
                      prev2Label={null} // 년도 앞으로 버튼 없애기
                      next2Label={null} // 년도 뒤로 버튼 없애기
                      minDetail="month" // 년도 선택 금지
                      minDate={new Date(taskData.started_at)} // 현시점 이후 선택 가능 하도록 하기
                      maxDate={
                        new Date(Date.now() + 60 * 60 * 24 * 7 * 4 * 6 * 1000)
                      } // 선택 가능 범위 제한 하기 (밀리 세컨즈 단위로 계산, 현시점에서 6개월 정도)
                      selectRange={false} // 하루 선택 or 범위 선택
                    />
                  </VStack>
                </Box>

                <Button
                  type="submit"
                  isLoading={submitting}
                  loadingText="Submitting..."
                  size="md"
                  mt={4}
                >
                  Submit
                </Button>
              </VStack>
            </form>
          </Box>
        </Box>
      </div>
    );
  }
}

export default ProjectProgressDetail;
