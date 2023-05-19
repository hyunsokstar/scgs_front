import React from "react";
import { Box, Checkbox, Avatar, Text, Image, HStack } from "@chakra-ui/react";

type TaskManager = {
  pk: number;
  username: string;
  profile_image?: string;
};

type TaskProps = {
  id: number;
  task: string;
  task_manager: TaskManager;
  task_completed: boolean;
  current_status: string;
  is_urgent_request: boolean;
  is_task_for_cash_prize: boolean;
  due_date: string;
};

interface Props {
  task: TaskProps;
}

const RowForTaskSttusForToday: React.FC<Props> = ({ task }) => {
  return (
    <Box display={"flex"} justifyContent={"space-between"}>
      <Box display={"flex"} alignItems={"center"} gap={2}>
        <Checkbox size="lg" colorScheme="blue"></Checkbox>
        {task.task_manager ? (
          <Avatar
            size="md"
            src={task.task_manager.profile_image}
            name={task.task_manager.username}
          />
        ) : (
          <Avatar size="md" name="No manager" />
        )}
        <Text fontSize="md">{task.task}</Text>
      </Box>

      <Checkbox size="lg" colorScheme="green"></Checkbox>
    </Box>
  );
};

export default RowForTaskSttusForToday;
