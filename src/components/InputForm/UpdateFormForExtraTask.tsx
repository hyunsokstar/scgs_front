import {
  Box,
  Select,
  Button,
  Input,
  Textarea,
  FormControl,
  FormLabel,
  useToast,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import {
  IExtraTaskDetailData,
  IFormTypeForExtraTask,
} from "../../types/project_progress/project_progress_type";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getUserNamesForCreate } from "../../apis/user_api";
import { apiForUpdateExtraTask } from "../../apis/project_progress_api";
import TaskUrlsListUsingInputForUpdate from "../TaskUrlsListUsingInputForUpdate";

interface IUserNamesForCreate {
  pk: number;
  username: any;
}

interface IProps {
  extraTaskDetail: IExtraTaskDetailData;
}

const UpdateFormForExtraTask: React.FC<IProps> = ({ extraTaskDetail }) => {
  const { pk, task_manager, task, task_urls, task_description, task_status } =
    extraTaskDetail;

  const toast = useToast();

  const { register, handleSubmit } = useForm<IFormTypeForExtraTask>();

  const { isLoading: isLoadingForUserNamesData, data: userNamesData } =
    useQuery<IUserNamesForCreate[]>(["user_names"], getUserNamesForCreate);

  const mutationForUpdateExtraTask = useMutation(apiForUpdateExtraTask, {
    onMutate: () => {
      console.log("mutation starting");
    },
    onSuccess: (data) => {
      console.log("success : ", data);
      toast({
        title: "update extra task success!",
        status: "success",
      });
    },
    onError: (error) => {
      console.log("mutation has an error");
    },
  });

  const onSubmit = (data: IFormTypeForExtraTask) => {
    console.log("form data : ", data);

    mutationForUpdateExtraTask.mutate({
      pk,
      task: data.task,
      task_description: data.task_description,
      task_manager:
        data.task_manager === "" ? task_manager.pk : data.task_manager,
      task_status: data.task_status,
    });
  };

  return (
    <Box bg="green.100" p={4} borderRadius="md">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box display="flex" flexDirection="column" gap={4}>
          <Input type="hidden" {...register("pk")} value={pk} />
          <FormControl>
            <FormLabel>담당자</FormLabel>
            <Select
              {...register("task_manager")}
              placeholder={task_manager.username}
              borderColor="gray.400"
            >
              {userNamesData?.map((user) => (
                <option key={user.pk} value={user.pk}>
                  {user.username}
                </option>
              ))}
            </Select>
          </FormControl>
          <FormControl>
            <FormLabel>task</FormLabel>
            <Input
              {...register("task")}
              defaultValue={task}
              borderColor="gray.400"
            />
          </FormControl>

          <FormControl>
            <FormLabel>Task Description</FormLabel>
            <Textarea
              {...register("task_description")}
              defaultValue={task_description}
              borderColor="gray.400"
            />
          </FormControl>

          <TaskUrlsListUsingInputForUpdate
            titleText={"test urls for extra task detail info"}
            extraTaskPk={pk}
            task_urls={task_urls}
          />
          <FormControl>
            <FormLabel>task_status</FormLabel>
            <Select
              defaultValue={task_status}
              placeholder="Select an option"
              borderColor="gray.400"
              {...register("task_status")}
            >
              <option value="ready">대기중 ⚪</option>
              <option value="in_progress">진행중 🟡</option>
              <option value="testing">테스팅 🟠</option>
              <option value="completed">완료됨 🔵</option>
            </Select>
          </FormControl>
          <Button type="submit">Update</Button>
        </Box>
      </form>
    </Box>
  );
};

export default UpdateFormForExtraTask;
