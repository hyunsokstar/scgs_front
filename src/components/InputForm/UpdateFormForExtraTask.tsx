import { Box, Avatar, Text, Select, Button, Input, Textarea } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { DetailForExtraTaskProps } from "../../types/project_progress/project_progress_type";

interface FormData {
  task?: string;
  task_url1?: string;
  task_url2?: string;
  task_status?: string;
}

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

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    // 폼 데이터 제출 처리 로직 작성하기
    console.log(data);
  };

  return (
    <Box bg="green.100" p={4} borderRadius="md">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box display="flex" flexDirection="column" gap={4}>
          <Input
            type="text"
            placeholder="Task"
            defaultValue={task}
            {...register("task")}
          />
          <Textarea
            placeholder="Task URL 1"
            defaultValue={task_url1}
            {...register("task_url1")}
          />
          <Textarea
            placeholder="Task URL 2"
            defaultValue={task_url2}
            {...register("task_url2")}
          />
          <Select
            defaultValue={task_status}
            placeholder="Select an option"
            {...register("task_status")}
          >
            <option value="ready">대기중 ⚪</option>
            <option value="in_progress">진행중 🟡</option>
            <option value="testing">테스팅 🟠</option>
            <option value="completed">완료됨 🔵</option>
          </Select>
          <Button type="submit">Submit</Button>
        </Box>
      </form>
    </Box>
  );
};

export default UpdateFormForExtraTask;
