import React, { useState, ChangeEvent } from "react";
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Textarea,
  VStack,
  HStack,
  Radio,
  RadioGroup,
  Select,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"; // 임포트 위치 최상단

interface IUserNamesForCreate {
  pk: number;
  username: string;
}

interface UpdateFormForTaskDetailProps {
  pk: number;
  writer: string;
  task_manager: string;
  task: string;
  task_description: string;
  importance: number;
  dataForUserNames: IUserNamesForCreate[];
}

const UpdateFormForTaskDetail: React.FC<UpdateFormForTaskDetailProps> = ({
  pk,
  writer,
  task,
  task_description,
  importance,
  dataForUserNames,
  task_manager,
}) => {
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

  // const mutationForUpdateTaskDetailForCheckedList = useMutation(
  //   updateProjectApiByPk,
  //   {
  //     onMutate: () => {
  //       console.log("mutation starting");
  //     },
  //     onSuccess: (data) => {
  //       console.log("success : ", data);
  //       toast({
  //         title: "project task update success",
  //         status: "success",
  //       });
  //       taskDetailRefatch();
  //       // navigate("/estimates");
  //     },
  //     onError: (error) => {
  //       console.log("mutation has an error");
  //     },
  //   }
  // );

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

  // 2244
  return (
    <Box as="form" onSubmit={handleSubmit(onSubmit)} mt={5}>
      <Box display={"flex"} flexDirection={"column"} p={2} gap={3}>
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
              // {...register("task_manager", {
              //   required: "task_manager is required",
              // })}
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

        <Button mt={4} colorScheme="teal" type="submit">
          Update
        </Button>
      </Box>
    </Box>
  );
};

export default UpdateFormForTaskDetail;
