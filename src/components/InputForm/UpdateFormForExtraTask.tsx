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
import { DetailForExtraTaskProps } from "../../types/project_progress/project_progress_type";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getUserNamesForCreate } from "../../apis/user_api";
import { apiForUpdateExtraTask } from "../../apis/project_progress_api";

interface IUserNamesForCreate {
  pk: number;
  username: any;
}

interface FormData {
  pk?: string;
  task_manager?: any;
  task?: string;
  task_url1?: string;
  task_url2?: string;
  task_status?: string;
}


// 1122
const UpdateFormForExtraTask: React.FC<DetailForExtraTaskProps> = ({
  extraTaskDetail,
}) => {
  const {
    pk,
    task_manager,
    task,
    task_url1,
    task_url2,
    task_status,
    started_at_formatted,
  } = extraTaskDetail;

  const toast = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const {
    isLoading: isLoadingForUserNamesData,
    data: userNamesData,
    error,
  } = useQuery<IUserNamesForCreate[]>(["user_names"], getUserNamesForCreate);

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
      // navigate("/estimates");
    },
    onError: (error) => {
      console.log("mutation has an error");
    },
  });

  const onSubmit = (data: FormData) => {
    console.log("form data : ", data);

    mutationForUpdateExtraTask.mutate({
      pk,
      task:data.task,
      task_manager: data.task_manager === "" ? task_manager.pk : data.task_manager,
      task_status:data.task_status,
      task_url1:data.task_url1,
      task_url2:data.task_url2,
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
            <Textarea
              {...register("task")}
              defaultValue={task}
              borderColor="gray.400"
            />
          </FormControl>
          <FormControl>
            <FormLabel>task_url1</FormLabel>
            <Textarea
              placeholder="Task URL 1"
              defaultValue={task_url1}
              {...register("task_url1")}
              borderColor="gray.400"
            />
          </FormControl>
          <FormControl>
            <FormLabel>task_url2</FormLabel>
            <Textarea
              placeholder="task_url2"
              defaultValue={task_url2}
              {...register("task_url2")}
              borderColor="gray.400"
            />
          </FormControl>

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